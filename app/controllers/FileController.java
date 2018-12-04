package controllers;

import akka.actor.ActorRef;
import akka.stream.javadsl.FileIO;
import akka.stream.javadsl.Source;
import akka.stream.javadsl.StreamConverters;
import akka.util.ByteString;
import com.google.common.collect.ImmutableMap;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import modules.filecache.protocol.ReadDirMessage;
import play.cache.Cached;
import play.http.HttpEntity;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.ResponseHeader;
import play.mvc.Result;
import protos.FileCacheProtos;
import scala.compat.java8.FutureConverters;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.*;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static akka.pattern.Patterns.ask;

public class FileController extends BaseController {
    @Inject
    public FileController(
            @Named("file-cache-actor") ActorRef fileCacheActor,
            @Named("filesystem.root") String fileSystemRoot) {
        super(fileCacheActor, fileSystemRoot);
    }

    public CompletionStage<Result> viewDir(String path) {
        String sanitiedPath;
        try {
            sanitiedPath = sanitizedUserInputPath(path == null ? "" : path);
        } catch(RuntimeException e) {
            return CompletableFuture.completedFuture(badRequest(e.toString()));
        }
        return FutureConverters
                .toJava(
                        ask(getFileCacheActor(),
                                new ReadDirMessage(sanitiedPath),
                                1000))
                .thenApply(this::handleViewDirResponse);
    }



    // TODO: Use akka for this. Fix the bug where there are 3 fail 206 request before a successful one.
    // max size allowed per read op, 15MB
    final long MAX_ALLOWED_CHUNK_SIZE = 15 * 1024 * 1024;
    final Pattern rangeMatcher = Pattern.compile("[^\\d]+(\\d+)[^\\d]+(\\d+)?");

    public Result download(String path) {
        String sanitizedPath;
        try {
            sanitizedPath = sanitizedUserInputPath(path == null ? "" : path);
        } catch(RuntimeException e) {
            return badRequest(e.toString());
        }

        if (!request().getHeaders().contains("Range")) {
            return ok(new java.io.File(sanitizedPath));
        }

        String rangeHeader =  request().getHeaders().get("Range").get();
        Matcher rangeValues = rangeMatcher.matcher(rangeHeader);
        if (!rangeValues.find()) {
            return badRequest("Missing range header");
        }

        long fileSize = new File(sanitizedPath).length();
        long start, end;
        if (rangeValues.group(1) != null) {
            start = Long.parseLong(rangeValues.group(1));
        } else {
            start = 0;
        }

        if (rangeValues.group(2) != null) {
            // -1 because byte array index starts at 0.
            end = Math.min(Long.parseLong(rangeValues.group(2)), MAX_ALLOWED_CHUNK_SIZE - 1);
        } else {
            end = Math.min(fileSize - 1, start + MAX_ALLOWED_CHUNK_SIZE - 1);
        }

        // get MIME type
        String mimeType;
        try {
            mimeType = Files.probeContentType(Paths.get(sanitizedPath));
        } catch (IOException e) {
            return badRequest("Unknown MIME type");
        }

        long contentLength = end - start + 1;
        Source<ByteString, ?> source = FileIO.fromPath(Paths.get(sanitizedPath), (int) contentLength, start);
        return new Result(
                new ResponseHeader(206, ImmutableMap.of(
                    "Accept-Ranges", "bytes",
                    "Content-Range",  String.format("bytes %d-%d/%d", start, end, fileSize),  // Without this field, it won't work
                    "Range",  String.format("bytes %d-%d/%d", start, end, fileSize) // As a fail-safe field.
                )),
                new HttpEntity.Streamed(source, Optional.of(contentLength), Optional.of(mimeType))
        );
    }

    private Result handleViewDirResponse(Object fileSetResponse)  {
        try {
            return ok(JsonFormat
                    .printer()
                    .includingDefaultValueFields()
                    .print((FileCacheProtos.FileSet)fileSetResponse));
        } catch (InvalidProtocolBufferException e) {
            return notFound();
        }
    }
}
