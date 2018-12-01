const assert = require('chai').assert;
const path = require('path');
const Generic = require("./Generic");
const NULL = require("./NULL");

describe('Generic', () => {
    it('Should create', (done) => {
        assert.doesNotThrow(() => {
            new Generic(["a", "b", "c"]);
            new Generic();
            done();
        })
    });

    it("Should be able to chain set", () => {
        new Generic(["a", "b", "c"]).set("a", 1).set("c", 3);
    });

    it("Should be able to throw if key set doesn't exist", () => {
        assert.throw(() => {
            new Generic(["a"]).set("b")
        });
    });

    it("Should get default value which is NULL", () => {
        const g = new Generic(["a", "b"]);
        assert.equal(NULL, g.get("a"));
    });

    it("Should get value that is set", () => {
        const g = new Generic(["a", "b"]);
        g.set("a", 1);
        assert.equal(1, g.get("a"));
        g.set("a", undefined);
        g.set("b", null);
        assert.equal(NULL, g.get("a"));
        assert.equal(NULL, g.get("b"));
    });

    it("Should serialize to object", () => {
        const fakeObject = {
            toObject: () => ({
                name: "test",
                count: 123,
            })
        }
        
        const g = new Generic(["a", "b"]);
        g.set("a", fakeObject);
        g.set("b", true);
        assert.deepEqual({
            a: {
                name: "test",
                count: 123,
            },
            b: true,
        }, g.toObject());
    });

    it("Should parse from json", () => {
        const g = new Generic(["a", "b"]);
        g.fromJson({"a": 100});
        assert.equal(100, g.get("a"));
    });
});