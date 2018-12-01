package modules.filecache.protocol;


import com.google.common.collect.ImmutableList;

public class ReadDirMessage {
    public String path;

    public ReadDirMessage(String path) {
        this.path = path;
    }
}
