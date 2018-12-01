const path = require('path');
const FileIO = require('../../FileIO');
const FileNode = require('./FileNode');
const Utility = require('../../Utility');

// TODO: Add hook to detect file change and update subtree.

async function buildTree_(parentNode, currentPath, parentUrl) {
    const files = await FileIO.readdir(currentPath);
    for(let i = 0; i < files.length; i++) {
        const pathToFile = path.resolve(currentPath, files[i]);
        const stat = await FileIO.getStat(pathToFile);
        const url = `${parentUrl}/${encodeURIComponent(files[i])}`;

        const fileNode = new FileNode({ 
            name: files[i],
            isDir: stat.isDirectory(),
            url: url,
            parent: '',
            isDir: stat.isDirectory(),
            sizeB: stat.size,
            ctimeMs: stat.ctimeMs,
            mtimeMs: stat.mtimeMs,
            ext: path.extname(files[i]),
            type: Utility.getFileType(files[i], stat),
        });
        parentNode.addChild(fileNode);

        if (fileNode.isDir) {
            await buildTree_(fileNode, pathToFile, url);
        }
    }
}

async function createFileTree(pathToRootDir) {
    const stat = await FileIO.getStat(path.resolve(pathToRootDir));
    const url = `/${stat.isDirectory() ? 'browse' : 'file'}`
    const rootNode = new FileNode({
        name: '',
        url: url,
        isDir: stat.isDirectory()
    });
    await buildTree_(rootNode, pathToRootDir, url);

    return new FileTree(rootNode);
}

class FileTree {
    constructor(rootNode) {
        this.rootNode = rootNode;
    }

    async getFile(url) {
        if (url === '/') return this.rootNode;

        const path = url.replace(/\/$/, '').split(/\/+/);
        return await this.rootNode.getFile(path, 0);
    }
}

module.exports = createFileTree;