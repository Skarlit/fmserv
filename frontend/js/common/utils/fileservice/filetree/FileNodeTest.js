const assert = require('chai').assert;
const FileNode = require('./FileNode');

describe('FileNode', () => {
    it('Should not have children if file is not directory', () => {
        const fileNode = new FileNode({isDir: false});
        assert.isNull(fileNode.children);
    });
    it('Should have children if file is directory', () => {
        const fileNode = new FileNode({isDir: true});
        assert.isObject(fileNode.children);
    });
    
    it('Add child should be noop for non directory file', () => {
        const fileNode = new FileNode({isDir: false});
        assert.doesNotThrow(() => {
            fileNode.addChild({name: 'a', isDir: true});
        });
    })

    it('Should add child for directory', () => {
        const fileNode = new FileNode({isDir: true});
        assert.deepEqual({}, fileNode.children);
        const childFile = {name: 'test.txt', isDir: true};
        fileNode.addChild(childFile);
        assert.strictEqual(childFile, fileNode.children['test.txt']);
    });
});