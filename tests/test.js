/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

var testClassFiles = [];
for (var file in window.__karma__.files) {
    if (/Test\.js$/.test(file)) {
        testClassFiles.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/tests-release',

    paths: {
        'eventemitter3': '../lib/eventemitter3/index'
    },

    shim: {
        'eventemitter3': {
            exports: 'EventEmitter'
        }
    },

    map: {
        '*': {
            'css': '../lib/require-css/css.min'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: testClassFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

require(['css!../lib/bootstrap/dist/css/bootstrap.min.css', 'css!../lib/bootstrap/dist/css/bootstrap-theme.min.css']);