class FileNode {
    constructor(file) {
        this.data = file;
        this.children = file.isDir ? {} : null;
    }

    get name () {
        return this.data.name;
    }

    get isDir() {
        return this.data.isDir;
    }

    addChild(child) {
        if (this.isDir)
          this.children[child.name] = child;
    }

    async getFile(path, pathIdx) {
        // out of range
        if (pathIdx >= path.length) return null;
        
        // name match
        if (path[pathIdx] === this.name) {
            // last name match, return itself
            if (pathIdx === path.length - 1) {
                return this;
            } else {
                // go deeper into the path.
                const nextPathIdx = pathIdx + 1;
                const targetChildNode = this.children[path[nextPathIdx]];
                if (targetChildNode) {
                    return await targetChildNode.getFile(path, nextPathIdx);
                }
            }
        } 

        return null; 
    }
}

module.exports = FileNode;