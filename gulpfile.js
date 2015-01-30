'use strict';

var path = require('path');
var gulp = require('gulp');
var pkg = require('./package');
var $ = require('gulp-load-plugins')();

function version(file){
   return '/* ' + path.basename(file.path) + ' ' + pkg.version + ' */\n';
}

gulp.task('build', function () {
  return gulp.src('./src/_wrapper.js')
    .pipe($.preprocess())
    .pipe($.rename('cash.js'))
    .pipe($.size())
    .pipe($.beautify())
    .pipe($.tap(function(file, t) { file.contents = Buffer.concat([new Buffer(version(file)), file.contents]);}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function () {
  return gulp.src(['./dist/cash.js'])
    .pipe($.uglify())
    .pipe($.size())
    .pipe($.rename("cash.min.js"))
    .pipe($.tap(function(file, t) { file.contents = Buffer.concat([new Buffer(version(file)), file.contents]);}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', ['build'], function() {
  return gulp.src('./dist/cash.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('default', ['build','minify','lint']);

gulp.task('watch', function () {
    gulp.watch(['src/*.js','test/src/*.js'], ['build','minify','lint']);
});
