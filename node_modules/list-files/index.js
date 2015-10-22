"use strict";

var exec = require('child_process').exec;
var commandMaker = process.platform === 'win32' ?
    require('./make-command-win') : require('./make-command-unix');

module.exports = function(callback, argv) {
    var command = commandMaker(argv);

    exec(command,
        function(error, stdout, stderr) {
            var result = stdout.split('\n').filter(function(str) {
                return str !== "";
            });
            if (error !== null) {
                callback({
                    error: stderr
                });
                return;
            }
            callback(result);
        });
};
