package modules.common;

import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import protos.FileCacheProtos;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;

@Singleton
public class FileService {
    private final String fileSystemRoot;

    @Inject
    public FileService(@Named("filesystem.root") String fileSystemRoot) {
        Preconditions.checkNotNull(fileSystemRoot);
        this.fileSystemRoot = fileSystemRoot;
    }

    public FileCacheProtos.FileSet listFiles(String systemAbsPath) {
        File[] files = new File(systemAbsPath).listFiles();
        FileCacheProtos.FileSet.Builder fileSet = FileCacheProtos.FileSet.newBuilder();
        if (files != null) {
            for (File f : files) {
                FileCacheProtos.File.Builder fileBuilder = FileCacheProtos.File.newBuilder();
                fileBuilder
                        .setName(f.getName())
                        .setIsDirectory(f.isDirectory())
                        .addAllPath(getRelativeFilePathSegments(f));
                try {
                   BasicFileAttributes attrs = Files.readAttributes(f.toPath(), BasicFileAttributes.class);
                   fileBuilder.setCreatedDate(attrs.creationTime().toMillis());
                   fileBuilder.setModifiedDate(attrs.lastModifiedTime().toMillis());
                   fileBuilder.setSize(attrs.size());
                } catch (IOException e) {
                    // skip reading the attributes.
                }

                fileSet.addFile(fileBuilder.build());
            }
        }
        return fileSet.build();
    }

    public String getRelativeFilePath(File file) {
        String absPath = file.getAbsolutePath();
        if (absPath.startsWith(fileSystemRoot)) {
            return absPath.substring(fileSystemRoot.length());
        }
        throw new RuntimeException("Cannot get relative file path for file outside of file system root");
    }

    public ImmutableList<String> getRelativeFilePathSegments(File file) {
        String absPath = file.getAbsolutePath();
        if (absPath.startsWith(fileSystemRoot)) {
            Path p = Paths.get(absPath.substring(fileSystemRoot.length()));
            ImmutableList.Builder<String> pathSegments = ImmutableList.builder();
            for (int i = 0; i < p.getNameCount(); i++) {
                pathSegments.add(p.getName(0).toString());
            }
            return pathSegments.build();
        }
        throw new RuntimeException("Cannot get relative file path for file outside of file system root");
    }
}
