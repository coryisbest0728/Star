/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

var gulp = require('gulp');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var projectConfig = tsc.createProject('./tsconfig.json');
var projectTestConfig = tsc.createProject('./tsconfig-test.json');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var sequence = require('gulp-sequence');
var requirejsOptimize = require('gulp-requirejs-optimize');
var scss = require("gulp-scss");

var fs = require('fs');
var path = require('path');
var findFiles = require('list-files');
var md5 = require('md5');

var config = {
    src: './src/',
    srcTS: './src/**/*.ts',
    tests: './tests/',
    testsTS: './tests/**/*.ts',
    lib: './lib/',
    libJS: './lib/**/*.js',
    libTS: './lib/typings/**/*.d.ts',
    dest: './release/',
    destJS: './release/**/*.js',
    testsDest: './tests-release/',
    testsDestJS: './tests-release/**/*.js',
    temp: './.temp/',
    tempTS: './.temp/**/*.ts'
};

/**
 * Lint src TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.srcTS)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * copy lib js to the release.
 */
gulp.task('copy-lib-to-release', function () {
    return gulp.src([
        path.join(config.lib, '/**/index.js'),
        path.join(config.lib, '/**/require.js'),
        path.join(config.lib, '/**/promise.min.js')
    ]).pipe(gulp.dest(path.join(config.dest, '/lib/')));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function (cb) {
    var tsResult = gulp.src([config.srcTS, config.libTS])
        .pipe(sourcemaps.init())
        .pipe(tsc(projectConfig));
    tsResult.dts.pipe(gulp.dest(config.dest));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

/**
 * Lint all TypeScript files.
 */
gulp.task('ts-lint-tests', function () {
    return gulp.src([config.srcTS, config.testsTS])
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * copy source ts and tests source ts to the temp folder.
 */
gulp.task('copy-ts-to-temp', function () {
    return gulp.src([config.srcTS, config.testsTS]).pipe(gulp.dest(config.temp));
});

gulp.task('copy-text-file', function () {
    return gulp.src([
        path.join(config.src, '/**/*.{jxml,json}'),
        path.join(config.tests, '/**/*.{jxml,json}')
    ]).pipe(gulp.dest(config.testsDest));
});

/**
 * Compile tests TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-tests-ts', function (cb) {
    gulp.src(path.join(config.tests, '/test.js')).pipe(gulp.dest(config.testsDest));
    var tsResult = gulp.src([config.tempTS, config.libTS])
        .pipe(tsc(projectTestConfig));
    tsResult.dts.pipe(gulp.dest(config.testsDest));
    return tsResult.js.pipe(gulp.dest(config.testsDest));
});

/**
 * Remove the temp folder and cache folder.
 */
gulp.task('clean-temp-cache', function () {
    return del([config.temp, './.gulp-scss-cache/', './.sass-cache/', './src/**/.sass-cache/']);
});

/**
 * optimize requirejs for the release
 */
gulp.task('requirejs-optimize-release', function () {
    return gulp.src(config.destJS)
        .pipe(requirejsOptimize({
            baseUrl: config.dest,
            optimize: 'none',
            paths: {
                'eventemitter3': './lib/eventemitter3/index',
                'es6-promise': './lib/es6-promise/promise.min',
                'moment': './lib/moment/min/moment.min',
                'text': './lib/text/text'
            },
            shim: {
                'eventemitter3': {
                    exports: 'EventEmitter'
                },
                'es6-promise': {
                    exports: 'es6-promise'
                },
                'moment': {
                    exports: 'moment'
                }
            }
        }))
        .pipe(gulp.dest(config.dest));
});

/**
 * compile scss for tests
 */
gulp.task('compile-tests-scss', function () {
    return gulp.src(path.join(config.src, '/skins/**/*.scss'))
        .pipe(scss({
            bundleExec: false
        }))
        .pipe(gulp.dest(path.join(config.testsDest, '/skins')));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-release', function () {
    return del(config.dest);
});

gulp.task('clean-tests', function () {
    return del(config.testsDest);
});

/**
 * The task for releasing the project
 */
gulp.task('release', function (cb) {
    sequence('ts-lint', 'clean-release', 'copy-lib-to-release', 'compile-ts', 'requirejs-optimize-release', cb);
});

/**
 * The task for executing tests of the project
 */
gulp.task('tests', function (cb) {
    sequence('ts-lint-tests', 'clean-tests', 'copy-ts-to-temp', ['copy-text-file', 'compile-tests-ts', 'compile-tests-scss'], 'clean-temp-cache', cb);
});
