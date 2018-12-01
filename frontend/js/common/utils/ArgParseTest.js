const assert = require('chai').assert;
const ArgParse = require("./ArgParse");

describe('ArgParseTest', () => {
  describe('parse', () => {
    it('Should parse a list of arg strings', () => {
        const target = {
            port: 3000,
            useMap: true,
            host: "0.0.0.0",
            a: false,
        }

        const argStringList = ["node", "server.js", "--port=3000", "--useMap", "--a=false", "junky", "-as9=junk", "--host=0.0.0.0"];

        assert.deepEqual(target, ArgParse.parse(argStringList));
    });
  });
});