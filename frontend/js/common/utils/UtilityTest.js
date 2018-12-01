const assert = require('chai').assert;
const path = require('path');
const Utility = require("./Utility");

describe('UtilityTest', () => {
    describe('getFileType', () => {
        it('convert type correctly', () => {
            const p = [
                ["a.txt", {size: 500 * 1024, isDirectory: () => false},  "TEXT"],
                ["b.txt", {size: 500 * 1024, isDirectory: () => true},  "FOLDER"],
                ["c",     {size: 1024 * 1024, isDirectory: () => false},  "BINARY"],
                ["d.jpg", {size: 1024 * 1024, isDirectory: () => false},  "IMAGE"],
                ["f.tar", {size: 1024 * 1024, isDirectory: () => false},  "COMPRESS"],
                ["p.mp3", {size: 1024 * 1024, isDirectory: () => false},  "AUDIO"],
                ["e.mp4", {size: 1024 * 1024, isDirectory: () => false},  "VIDEO"],
            ]
            for(let i = 0; i < p.length; i++) {
                assert.equal(p[i][2], Utility.getFileType(p[i][0], p[i][1]));
            }
        });
    });
    describe('getReadableSize', () => {
        it('render size correctly', () => {
            const p = {
                "0B": 0,
                "500B": 500,
                "1K": 1024,
                "1.1K": 1120,
                "50K": 50 * 1024,
                "10M": 10 * 1024 * 1024,
                "94.4G": 94.42 * 1024 * 1024 * 1024,
            }

            for(let output in p) {
                assert.equal(output,  Utility.getReadableSize(p[output]));
            }
        })
    });
});