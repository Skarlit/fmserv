package controllers;

import akka.actor.ActorRef;
import org.springframework.cache.annotation.Cacheable;
import play.Environment;
import play.mvc.*;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.concurrent.CompletableFuture;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class ViewController extends BaseController {
    private Environment env;

    @Inject
    public ViewController(
            Environment env,
            @Named("file-cache-actor") ActorRef fileCacheActor,
            @Named("filesystem.root") String fileSystemRoot) {
        super(fileCacheActor, fileSystemRoot);
        this.env = env;
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    @Cacheable(key = "index")
    public Result index(String path) {
        return ok(views.html.index.render("SFS", env.isDev(), path));
    }

}
