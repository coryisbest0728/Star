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
var runSequence = require('run-sequence');
var requirejsOptimize = require('gulp-requirejs-optimize');

var fs = require('fs');
var path = require('path');
var findFiles = require('list-files');
var md5 = require('md5');

var config = {
    src: './src/',
    srcTS: './src/**/*.ts',
    tests: './src/tests/',
    testsTS: './src/tests/**/*.ts',
    lib: './lib/',
    libTS: './lib/typings/**/*.d.ts',
    dest: './release/',
    destJS: './release/**/*.js',
    testsDest: './tests-release/',
    testsDestJS: './tests-release/**/*.js'
};

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.srcTS)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var tsResult = gulp.src([config.srcTS, config.libTS, '!' + config.testsTS])
        .pipe(sourcemaps.init())
        .pipe(tsc(projectConfig));
    tsResult.dts.pipe(gulp.dest(config.dest));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

/**
 * Compile tests TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-tests-ts', function () {
    var tsResult = gulp.src([config.srcTS, config.libTS])
        .pipe(tsc(projectTestConfig));
    tsResult.dts.pipe(gulp.dest(config.testsDest));
    return tsResult.js
        .pipe(gulp.dest(config.testsDest));
});

/**
 * optimize requirejs for the release
 */
gulp.task('requirejs-optimize-release', function () {
    return gulp.src(config.destJS)
        .pipe(requirejsOptimize({
            baseUrl: config.dest,
            optimize: 'none'
        }))
        .pipe(gulp.dest(config.dest));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-release', function (cb) {
    return del(config.dest, cb);
});

gulp.task('clean-tests', function (cb) {
    return del([path.normalize(config.testsDest + '/*.js'), '!' + path.normalize(config.testsDest + '/test.js')], cb);
});

/**
 * The task for releasing the project
 */
gulp.task('release', function (cb) {
    runSequence('ts-lint', 'clean-release', 'compile-ts', 'requirejs-optimize-release', cb);
});

/**
 * The task for executing tests of the project
 */
gulp.task('tests', function (cb) {
    runSequence('ts-lint', 'clean-tests', 'compile-tests-ts', cb);
});
