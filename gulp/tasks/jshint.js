var gulp = require('gulp');
var cache = require('gulp-cached');
var jshint = require('gulp-jshint');
var reporter = require('jshint-stylish');

var handleErrors = require('../util/handleErrors');

gulp.task('jshint', function () {
    return gulp.src(paths.scripts)
        .pipe(handleErrors())
        .pipe(cache('jshint', { optimizeMemory: true }))
        .pipe(jshint({
            multistr: true,
            smarttabs: false,
            loopfunc: true
        }))
        .pipe(jshint.reporter(reporter));
});
