const assert = require('chai').assert;
const path = require('path');
const createFileTree = require('./FileTree');

describe('FileTree', () => {
    it('Should be able to build tree correctly', async () => {
        const fileTree = await createFileTree('./test_dir');
        assert.equal('', fileTree.rootNode.name);
        
        let fileNode = null;
        let folderNode = null;
        for(let childKey in fileTree.rootNode.children) {
            if (childKey === 'test.txt') {
                fileNode = fileTree.rootNode.children[childKey];
            }
            if (childKey === 'nested_folder') {
                folderNode = fileTree.rootNode.children[childKey];
            }
        }

        assert.isNotNull(fileNode);
        assert.isFalse(fileNode.isDir);
        assert.isDefined(folderNode);
        assert.isTrue(folderNode.isDir);

        let nestedUnicodeFile = null;
        for (let ck in folderNode) {
            if (ck === '説明.txt') {
                nestedUnicodeFile = folderNode.children[ck];
                break;
            }
        }

       assert.isDefined(nestedUnicodeFile);
    });

    it('It can search files', async () => {
        const fileTree = await createFileTree('./test_dir');


        const dir = await fileTree.getFile('/');
        assert.strictEqual(dir, fileTree.rootNode, 'should find root folder');

        const emptyPath = await fileTree.getFile('');
        assert.strictEqual(emptyPath, fileTree.rootNode);

        const file = await fileTree.getFile('/test2.txt');
        assert.equal('test2.txt', file.name, 'should find file at first level');

        const nestedDir = await fileTree.getFile('/nested_folder');
        assert.equal('nested_folder', nestedDir.name, 'should find nested folder')
        assert.isTrue(nestedDir.isDir);

        const nestedFile = await fileTree.getFile('/nested_folder/説明.txt');
        assert.equal('説明.txt', nestedFile.name, 'should find file below first level');

        const nonexistingFile = await fileTree.getFile('/t');
        assert.isNull(nonexistingFile);

        const doubleslashes = await fileTree.getFile('//test2.txt/');
        assert.strictEqual(file, doubleslashes);
    });
});