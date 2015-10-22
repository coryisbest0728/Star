"use strict";

var test = require('tape');
var find = require('./');
var makeCommandUnix = require('./make-command-unix');
var makeCommandWin = require('./make-command-win');

test('should exist', function(t) {
    t.equal(typeof find, 'function');
    t.equal(typeof makeCommandUnix, 'function');
    t.equal(typeof makeCommandWin, 'function');
    t.end();
});

test('Make Commands', function(t) {
    t.test('UNIX', function(t) {
        t.test('should find all as default', function(t) {
            t.equal(makeCommandUnix(), 'find .');
            t.end();
        });
        t.test('should append specified dir', function(t) {
            t.equal(makeCommandUnix({
                dir: 'path/to/dir'
            }), 'find ./path/to/dir');
            t.end();
        });
        t.test('should append specified name (extention)', function(t) {
            t.equal(makeCommandUnix({
                name: 'js'
            }), 'find . -name "*.js"');
            t.end();
        });
        t.test('should append specified exclude path', function(t) {
            t.equal(makeCommandUnix({
                exclude: 'path/to/exclude/dir'
            }), 'find . -not -path "./path/to/exclude/dir/*"');
            t.end();
        });
        t.test('should append all arguments', function(t) {
            t.equal(makeCommandUnix({
                dir: 'path/to/dir',
                name: 'js',
                exclude: 'path/to/exclude/dir'
            }), 'find ./path/to/dir -name "*.js" -not -path "./path/to/exclude/dir/*"');
            t.end();
        });
        t.end();
    });

    t.test('Windows', function(t) {
        t.test('should find all as default', function(t) {
            t.equal(makeCommandWin(), 'dir . /b/s');
            t.end();
        });
        t.test('should append specified dir', function(t) {
            t.equal(makeCommandWin({
                dir: 'path/to/dir'
            }), 'dir .\\path\\to\\dir /b/s');
            t.end();
        });
        t.test('should append specified name (extention)', function(t) {
            t.equal(makeCommandWin({
                name: 'js'
            }), 'dir .\\*.js /b/s');
            t.end();
        });
        // t.test('should append specified exclude path', function(t) {
        //     t.equal(makeCommandWin({
        //         exclude: 'path/to/exclude/dir'
        //     }), 'dir . | findstr /v /i "\.txt$" /b/s');
        //     t.end();
        // });
        t.test('should append all arguments', function(t) {
            t.equal(makeCommandWin({
                dir: 'path/to/dir',
                name: 'js'
                // exclude: 'path/to/exclude/dir'
            }), 'dir .\\path\\to\\dir\\*.js /b/s');
            t.end();
        });
        t.end();
    });

    t.end();
});

test('should return files from current dir and sub dirs', function(t) {
    find(function(result) {
        t.equal(Array.isArray(result), true);
        [
            ".",
            "./index.js",
            "./package.json",
            "./README.md",
            "./test.js",
            "./testdir",
            "./testdir/a.js",
            "./testdir/b.js"
        ].forEach(function(match) {
            t.assert(result.indexOf(match) > -1);
        });
    });
    t.end();
});

test('should return files from specific dir', function(t) {
    find(function(result) {
        t.equal(Array.isArray(result), true);
        t.deepEqual(result, [
            "./testdir",
            "./testdir/a.js",
            "./testdir/b.js"
        ]);
    }, {
        dir: 'testdir'
    });
    t.end();
});

test('should return files matching file prefix', function(t) {
    find(function(result) {
        t.equal(Array.isArray(result), true);
        t.assert(result.indexOf("./package.json") > -1);
        t.assert(result.indexOf("./index.js") < 0);
    }, {
        name: 'json'
    });
    t.end();
});

test('should return files matching file prefix in specific dir', function(t) {
    find(function(result) {
        t.equal(Array.isArray(result), true);
        t.deepEqual(result, [
            "./testdir/a.js",
            "./testdir/b.js"
        ]);
    }, {
        dir: 'testdir',
        name: 'js'
    });
    t.end();
});

test('should pass an error if dir not found', function(t) {
    find(function(result) {
        t.equal(typeof result.error, 'string');
        //linux/mac not the same output
        result.error = result.error.replace('`', '');
        result.error = result.error.replace('\'', '');
        t.equal(result.error, 'find: ./baddir: No such file or directory\n');
    }, {
        dir: 'baddir'
    });
    t.end();
});

test('should exclude dir', function(t) {
    find(function(result) {
        t.equal(Array.isArray(result), true);
        var matches = result.filter(function(file) {
            return file.indexOf('/node_modules/') > -1;
        }).length;
        t.equal(matches, 0);
    }, {
        exclude: 'node_modules'
    });
    t.end();
});
