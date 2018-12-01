package modules.filecache;

import com.google.inject.AbstractModule;
import play.libs.akka.AkkaGuiceSupport;

public class FileCacheModule extends AbstractModule implements AkkaGuiceSupport {
    @Override
    protected void configure() {
        bindActor(FileCacheActor.class, "file-cache-actor");
    }
}
