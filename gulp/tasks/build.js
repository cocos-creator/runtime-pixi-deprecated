var gulp = require('gulp');
var mirror = require('gulp-mirror');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var handleErrors = require('../util/handleErrors');

function getUglifyOptions (minify, global_defs) {
    if (minify) {
        return {
            compress: {
                global_defs: global_defs
            }
        };
    }
    else {
        // http://lisperator.net/uglifyjs/compress
        var compress = {
            global_defs: global_defs,
            sequences: false,  // join consecutive statements with the “comma operator”
            properties: false,  // optimize property access: a["foo"] → a.foo
            //dead_code: true,  // discard unreachable code
            drop_debugger: false,  // discard “debugger” statements
            unsafe: false, // some unsafe optimizations (see below)
            //conditionals: true,  // optimize if-s and conditional expressions
            comparisons: false,  // optimize comparisons
            //evaluate: true,  // evaluate constant expressions
            booleans: false,  // optimize boolean expressions
            loops: false,  // optimize loops
            unused: false,  // drop unused variables/functions
            hoist_funs: false,  // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: false,  // optimize if-s followed by return/continue
            join_vars: false,  // join var declarations
            cascade: false,  // try to cascade `right` into `left` in sequences
            side_effects: false  // drop side-effect-free statements
            //warnings: true  // warn about potentially dangerous optimizations/code
        };
        // http://lisperator.net/uglifyjs/codegen
        return {
            mangle: false,
            preserveComments: 'all',
            output: {
                beautify: true,
                bracketize: true
            },
            compress: compress
        };
    }
}

function rebundle(bundler) {
    var bundle = bundler.bundle()
        .on('error', handleErrors.handler)
        .pipe(handleErrors())
        .pipe(source(paths.outFile))
        .pipe(buffer());

    var dev = sourcemaps.init({loadMaps: true})
        .pipe(uglify(getUglifyOptions(false, {
            FIRE_EDITOR: false,
            FIRE_DEBUG: true,
            FIRE_DEV: true,
            FIRE_TEST: false
        })))
        .pipe(sourcemaps.write('./', {sourceRoot: './', addComment: true}))
        .pipe(gulp.dest(paths.outDir));

    var min = rename({ suffix: '.min' });
    min.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify(getUglifyOptions(true, {
            FIRE_EDITOR: false,
            FIRE_DEBUG: false,
            FIRE_DEV: false,
            FIRE_TEST: false
        })))
        .pipe(sourcemaps.write('./', {sourceRoot: './', addComment: false}))
        .pipe(gulp.dest(paths.outDir));

    return bundle.pipe(mirror(dev, min));
}

function createBundler() {
    var options = {
        debug: true,
        detectGlobals: false,    // dont insert `process`, `global`, `__filename`, and `__dirname`
        bundleExternal: false    // dont bundle external modules
        //standalone: 'engine-framework',
        //basedir: tempScriptDir
    };
    // https://github.com/substack/node-browserify#methods
    var bundler = new browserify(paths.jsEntry, options);
    return bundler;
}

gulp.task('build', ['clean'], function () {
    return rebundle(createBundler());
});
