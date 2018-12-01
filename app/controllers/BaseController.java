package controllers;

import akka.actor.ActorRef;
import play.Environment;
import play.mvc.Controller;

import javax.inject.Inject;
import javax.inject.Named;
import java.nio.file.Path;
import java.nio.file.Paths;

abstract class BaseController extends Controller {
    private final ActorRef fileCacheActor;
    private final String fileSystemRoot;

    BaseController(ActorRef fileCacheActor, String fileSystemRoot) {
        this.fileSystemRoot = fileSystemRoot;
        this.fileCacheActor = fileCacheActor;
    }

    protected String sanitizedUserInputPath(String userInputPath) {
        Path rawPath = Paths.get(fileSystemRoot, userInputPath).normalize();
        if (rawPath.startsWith(fileSystemRoot)) {
            return rawPath.toString();
        }
        throw new RuntimeException("Cannot assess outside of file system root");
    }

    ActorRef getFileCacheActor() {
        return fileCacheActor;
    }
}
