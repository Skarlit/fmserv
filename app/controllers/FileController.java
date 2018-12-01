package controllers;

import akka.actor.ActorRef;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import modules.filecache.protocol.ReadDirMessage;
import play.cache.Cached;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import protos.FileCacheProtos;
import scala.compat.java8.FutureConverters;

import javax.inject.Inject;
import javax.inject.Named;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

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

    // TODO: Support range header and return 206
    public Result download(String path) {
        String sanitiedPath;
        try {
            sanitiedPath = sanitizedUserInputPath(path == null ? "" : path);
        } catch(RuntimeException e) {
            return badRequest(e.toString());
        }

        return ok(new java.io.File(sanitiedPath));
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
