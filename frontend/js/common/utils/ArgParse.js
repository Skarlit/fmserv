/**
 * Parse arg is valid, else return empty.
 * @param {String} arg
 * @returns {Object}
 */
function maybeParseArg(arg) {
    const parsedArg = {};
    console.log(arg);
    if (/^--\w+=.*$/.test(arg)) {
        const matchGroup = arg.match(/^--(\w+)=(.*)$/);
        const key = matchGroup[1];
        const value = matchGroup[2];
        if (!isNaN(value)) {
            parsedArg[key] = parseInt(value);
        } else if (value == 'true' || value == 'false') {
            parsedArg[key] = value == 'true';
        } else {
            parsedArg[key] = value;
        }
    } else if (/^--\w+$/.test(arg)) {
        const matchGroup = arg.match(/^--(\w+)$/);
        const key = matchGroup[1];
        parsedArg[key] = true;
    }

    return parsedArg;
}


/**
 * Parse a list a string cmd arguments.
 * @param {Array<String>} argList
 * @returns {Object}
 */
function parse(argList = []) {
    return argList.reduce((acc, arg) => {
        return Object.assign(acc, maybeParseArg(arg));
    }, {});
}

module.exports = {
    parse: parse,
}