'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src(['./src/core.js','./src/*.js'])
    .pipe($.concat("cash.js"))
    .pipe($.size())
    .pipe($.wrap('(function(){<%= contents %>}.call(typeof window !== "undefined" ? window : this));'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function () {
  return gulp.src(['./dist/cash.js'])
    .pipe($.uglify())
    .pipe($.size())
    .pipe($.rename("cash.min.js"))
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