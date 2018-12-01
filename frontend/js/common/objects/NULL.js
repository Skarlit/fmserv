class NULL {
    get(key) {
        return this;
    }
    
    toObject() {
        return null;
    }
}

module.exports = new NULL();