const fs = require('fs');
const path = require('path');

/**
 * Return a list of file names under the path
 * @param {String} path
 * @returns {Array<String>}
 */
function readdir (path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    })
    .catch(reason => {
        throw reason;
    });
}

/**
 *
 * Return the 
 * @param {String} path2file
 * @returns {fs.stats}
 */
function getStat (path2file) {
    return new Promise((resolve, reject) => {
        fs.lstat(path2file, (err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    })
    .catch(reason => {
        throw reason;
    });
}

/**
 * Return function that takes a relative path string
 * @param {String} root
 * @returns {Function}
 */
function pathResolver(root) {
    return (relativePath) => {
        return path.resolve(root, relativePath);
    }
}

module.exports = {
    readdir: readdir,
    getStat: getStat,
    pathResolver: pathResolver,
}