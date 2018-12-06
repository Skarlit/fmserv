const FILE_TYPE_MATCHER = {
    "VIDEO": /.*?\.(mov|avi|wmv|flv|3gp|mp4|mpg|mkv)$/i,
    "IMAGE": /.*?\.(gif|jpg|jpeg|tiff|png)$/i,
    "COMPRESS": /.*?\.(zip|7zip|gz|rar|tar)$/i,
    "AUDIO": /.*?\.(flac|mp3|wma|ogg|m4a|ape|wv|wav|aiff)$/i
};

/**
 * Take filename and stat, returns type
 * @param {String} filename
 * @param {fs.stats} fileStat
 * @returns {String}
 */
function getFileType(filename, fileStat) {

    if (fileStat.isDirectory()) {
        return "FOLDER";
    }

    for(let type in FILE_TYPE_MATCHER) {
        if (FILE_TYPE_MATCHER[type].test(filename)) {
            return type;
        }
    }

    // Text if size is < 1Mb
    if (fileStat.size / (1024) < 1024) {
        return "TEXT";
    }
    
    return "BINARY";
}

const SIZE_UNITS = ["B", "K", "M", "G", "T"];
/**
 *  Get human readable size format.
 * @param {Number} size
 * @returns {String}
 */
function getReadableSize(size) {
    let s = size;
    let unitIdx = 0;
    while (s >= 1024 && unitIdx < SIZE_UNITS.length) {
        s /= 1024;
        unitIdx += 1;
    }

    return `${Math.round(s * 10) / 10}${SIZE_UNITS[unitIdx]}`;
}


function getTimestampFromMs(ms) {
    let d = new Date(ms);
    return {
        yyyy: d.getUTCFullYear() % 2000, 
        mm: d.getUTCMonth(), 
        dd: d.getUTCDate(),
        h: d.getUTCHours(),
        m: d.getUTCMinutes()
    }
}

function encodeURIParts(s) {
    return s.split('/').filter((e) => e !== "")
        .map(part => encodeURIString(part))
        .join('/');
}

function encodeURIString(s) {
    return encodeURIComponent(s);
}

function reactRouterLinkEncodeURIString(s) {
                    // React Router decode the string before pushing it to history. So need to double encode.
                // https://stackoverflow.com/questions/48523058/encoding-uri-using-link-of-react-router-dom-not-working
    return encodeURIComponent(encodeURIComponent(s));
}

module.exports = {
    getFileType: getFileType,
    getReadableSize: getReadableSize,
    getTimestampFromMs: getTimestampFromMs,
    encodeURIParts: encodeURIParts,
    encodeURIString: encodeURIString,
    reactRouterLinkEncodeURIString: reactRouterLinkEncodeURIString
}