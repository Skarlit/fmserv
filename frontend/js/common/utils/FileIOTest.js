const assert = require('chai').assert;
const path = require('path');
const FileIO = require("./FileIO");

describe('FileIOTest', () => {
    describe('readdir', () => {
        it('Should read dir with promise', (done) => {
            FileIO.readdir("test_dir")
                .then(files => {
                    assert.include(files, "test.txt");
                    assert.include(files, "nested_folder");
                    done();
                });
        });
    });
    describe('relativePath', () => {
        it('should resolve path', () => {
            const pathString = FileIO.pathResolver('.')('test_dir');
            assert.equal(path.resolve('test_dir'), pathString);
        })
    })
    describe('getStat', () => {
        it('Should get stat of file with promise', (done) => {
            FileIO.getStat("test_dir/test.txt")
                .then(stat => {
                    assert.isFalse(stat.isDirectory());
                    done(); 
                });
        });
    });
});