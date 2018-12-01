const NULL = require('./NULL');

// Abstract class
class Generic {
    constructor(allowedKeys = []) {
        this.allowedKeys = new Set(allowedKeys);
        allowedKeys.forEach((allowedKey) => {
            this[allowedKey] = NULL;
        });
    }

    set(key, value) {
        this.checkKey_(key);
        this[key] = value != null ? value : NULL;
        return this;
    }
    
    get(key) {
        this.checkKey_(key);
        return this[key];
    }

    checkKey_(key) {
        if (!this.allowedKeys.has(key)) throw `Unknown key "${key}"`
    }

    toObject() {
        const plainObj = {};
        this.allowedKeys.forEach(key => {
            plainObj[key] =  typeof this[key] === "object" ? this[key].toObject() : this[key]
        });
        return plainObj;
    }

    fromJson(json) {
        this.allowedKeys.forEach(key => {
            if (json[key] != null)
                this.set(key, json[key]);
        });
        return this;
    }
}

module.exports = Generic;