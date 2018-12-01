package modules.filecache;

import akka.actor.AbstractActor;
import modules.common.FileService;
import modules.filecache.protocol.ReadDirMessage;

import javax.inject.Inject;

public class FileCacheActor extends AbstractActor {
    private final FileService fileService;

    @Inject
    public FileCacheActor(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public Receive createReceive() {
        return receiveBuilder()
                .match(ReadDirMessage.class, this::maybeReadDir)
                .build();
    }

    private void maybeReadDir(ReadDirMessage readDirMessageMsg) {
        sender().tell(fileService.listFiles(readDirMessageMsg.path), self());
    }
}
