// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
        {pattern: 'lib/**/*.js', included: false},
        {pattern: 'lib/**/*.css', included: false},
        {pattern: 'lib/**/*.eot', included: false},
        {pattern: 'lib/**/*.svg', included: false},
        {pattern: 'lib/**/*.ttf', included: false},
        {pattern: 'lib/**/*.woff', included: false},
        {pattern: 'lib/**/*.woff2', included: false},
        {pattern: 'tests-release/**/*.js', included: false},
        {pattern: 'tests-release/**/*.css', included: false},

        'tests-release/test.js'
    ],


    // list of files to exclude
    exclude: [
        'release/**/*.js',
        'tests-release/**/*.ts'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
