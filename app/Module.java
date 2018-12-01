import com.google.common.base.Preconditions;
import com.google.inject.AbstractModule;
import com.google.inject.Inject;
import com.google.inject.Provides;
import com.typesafe.config.Config;
import modules.filecache.FileCacheModule;
import modules.ytdl.YtModule;
import play.Environment;

import javax.inject.Named;

public class Module extends AbstractModule {
    private final Environment environment;
    private final Config appConfig;

    public Module(
            Environment environment,
            Config appConfig) {
        Preconditions.checkNotNull(appConfig);
        Preconditions.checkNotNull(environment);
        this.appConfig = appConfig;
        this.environment = environment;
    }

    @Override
    protected void configure() {
        install(new FileCacheModule());
        install(new YtModule());
    }

    @Provides
    @Named("filesystem.root")
    public String providesFilesystemRoot() {
        return appConfig.getString("filesystem.root");
    }
}
