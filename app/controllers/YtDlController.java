package controllers;

import play.libs.Json;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

import java.net.URLEncoder;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class YtDlController extends Controller {
    private final String YOUTUBE_META_QUERY_TEMPLATE = "http://www.youtube.com/oembed?url=%s&format=json";
    private final String YOUTUBE_LINK_TEMPLATE =  "https://youtu.be/%s"; //"https://www.youtube.com/watch?v=%s";

    private final String USER_AGENT = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36";

    private final WSClient wsClient;

    @Inject
    public YtDlController(WSClient wsClient) {
       this.wsClient = wsClient;
    }

    public CompletionStage<Result> getVideoInfo(String vid) throws java.io.UnsupportedEncodingException {
        if (vid == null) return CompletableFuture.completedFuture(badRequest());
        String url = String.format(YOUTUBE_META_QUERY_TEMPLATE, String.format(YOUTUBE_LINK_TEMPLATE, vid));
        System.out.println(url);
        return wsClient.url(url)
                .addHeader("User-Agent", USER_AGENT)
                .addHeader("accept-encoding", "identity")
                .setFollowRedirects(true)
                .get()
                .thenApply(this::parseVideoMeta);

    }

    // TODO: Add jsoup to parse the response.
    private Result parseVideoMeta(WSResponse response) {
        return ok(Json.parse(response.getBody()));
    }
}
