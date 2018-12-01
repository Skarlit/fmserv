const {Record} = require('immutable');
const Utility = require('../../common/utils/Utility');

const ATTRS = {
    "path": [],
    "name": "",
    "isDirectory": false,
    "size": 0,
    "createdDate": 0,
    "modifiedDate": "",
}

class File extends Record(ATTRS) {
    getReadableTimestamp() {
        const {yyyy, mm, dd, h, m} = Utility.getTimestampFromMs(this.ctimeMs);
        return `${yyyy}/${mm}/${dd} (${h}:${m})`;
    }
    getName() {
        return this.name.replace(this.ext, "");
    }
    getReadableSize() {
        return this.isDir ? "" : Utility.getReadableSize(this.sizeB);
    }

    getExt() {
        return this.isDir ? "" : this.ext.replace(".", "");
    }

    getUrl() {
        return this.url;
    }

    getType() {
        return this.type;
    }

    getIsDir() {
        return this.isDir;
    }

    compareTo(recordB, strategy) {
        if (!strategy) {
            // compare default
            return defaultComparator(this, recordB);
        } else {
            // TODO:Implement more strategies
            return defaultComparator(this, recordB);
        }
    }
}

function defaultComparator(recordA, recordB) {
    if (recordA.getIsDir() && !recordB.getIsDir()) return -1;
    if (!recordA.getIsDir() && recordB.getIsDir()) return 1;
    if (recordA.getIsDir() && recordB.getIsDir()) {
        return -1 * recordA.getName().localeCompare(recordB.getName()); // DESC name
    }
    return recordB.get("ctimeMs") - recordA.get("ctimeMs"); // DESC date
}

module.exports = File;