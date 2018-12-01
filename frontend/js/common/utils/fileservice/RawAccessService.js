const path = require('path');
const AbstractFileService = require('./AbstractFileService');
const FileIO = require("../FileIO");
const Utility = require('../Utility');

class RawAccessService extends AbstractFileService {
    constructor() {
        super();
        console.log('Using Raw access service...');
    }

    async init({root, protocol, hostname, port}) {
        this.root = root;
        this.domain = `${protocol}://${hostname}:${port}`
        console.log(`domain: ${this.domain}`);
    }

    async listDir(reqPath) {
        console.log(this.root + ',' + reqPath);
        const maybeDirPath = path.resolve(this.root, reqPath);
        const maybeDirStat  = await FileIO.getStat(maybeDirPath);
     
        if (maybeDirStat.isDirectory()) {
            const dirPath = maybeDirPath;
            const files = await FileIO.readdir(dirPath);
            const fileObjs = [];
            const encodedReqPath = Utility.encodeURIParts(reqPath);

            for(let i = 0; i < files.length; i++) {
                const stat = await FileIO.getStat(path.resolve(this.root, reqPath, files[i]));                                
                const type = Utility.getFileType(files[i], stat);
                const url = (stat.isDirectory() ? "" : this.domain) + "/" +
                    (stat.isDirectory() ? 'browse/' : 'file/') +
                    (encodedReqPath === "" ? "" : encodedReqPath + "/") +
                    encodeURIComponent(files[i]);
                fileObjs.push({
                    "ext": path.extname(files[i]),
                    "type": type,
                    "name": files[i],
                    "parent": reqPath,
                    "isDir": stat.isDirectory(),
                    "sizeB": stat.size,
                    "ctimeMs": stat.ctimeMs,
                    "url": url,
                    "mtimeMs": stat.mtimeMs
                });               
            }
            return fileObjs;
        } else {
            return [];
        }
    }
}

module.exports = RawAccessService;