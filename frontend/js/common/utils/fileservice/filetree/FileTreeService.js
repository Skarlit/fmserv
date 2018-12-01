const AbstractFileService = require('../AbstractFileService');
const createFileTree= require('./FileTree');

class FileTreeServiceStrategy extends AbstractFileService {
    async init({root}) {
        this.fileTree = await createFileTree(root);
    }

    get tree() {
        return this.fileTree;
    }

    async listDir(reqPath) {
        const result = await fileTreeInstance.tree.getFile('/' + reqPath);
        if (result && result.isDir) {
            const files = []
            for(let k in result.children) {
                files.push(result.children[k].data);
            }
            return files;
        }
        return [];
    }
}

module.exports = FileTreeServiceStrategy;