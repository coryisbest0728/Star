"use strict";

function makeCommandWin(argv) {
    var command = 'dir .';
    if (typeof argv === 'undefined') {
        argv = {};
    }
    if (typeof argv.dir === 'string') {
        command += '/' + argv.dir;
    }
    if (typeof argv.name === 'string') {
        command += '/*.' + argv.name;
    }
    if (typeof argv.exclude === 'string') {
        console.log('exclude is not yet supported for windows');
    }
    command = command.replace(/\//g, '\\');
    command += ' /b/s';
    return command;
}

module.exports = makeCommandWin;
