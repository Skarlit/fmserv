package controllers;

import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class YtDlController extends Controller {
    private final String YOUTUBE_LINK_TEMPLATE = "https://www.youtube.com/watch?v=%s";

    private final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";

    private final WSClient wsClient;

    @Inject
    public YtDlController(WSClient wsClient) {
       this.wsClient = wsClient;
    }

    public CompletionStage<Result> getVideoInfo(String vid) {
        if (vid == null) return CompletableFuture.completedFuture(badRequest());
        String url = String.format(YOUTUBE_LINK_TEMPLATE, vid);
        System.out.println(url);
        return wsClient.url(url)
                .addHeader("User-Agent", USER_AGENT)
                .get()
                .thenApply(this::parseVideoMeta);

    }

    // TODO: Add jsoup to parse the response.
    private Result parseVideoMeta(WSResponse response) {
//        response.getBody().
        return ok(response.getBody());
    }
}
