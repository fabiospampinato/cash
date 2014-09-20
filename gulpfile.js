'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
    gulp.src(['./src/core.js','./src/*.js'])
      .pipe($.concat("cash.js"))
      .pipe($.wrap('(function(){<%= contents %>}.call(typeof window !== "undefined" ? window : this));'))
      .pipe(gulp.dest('./dist/'))
      .pipe($.size())
});

gulp.task('minify', function () {
    gulp.src(['./dist/cash.js'])
      .pipe($.uglify())
      .pipe($.rename("cash.min.js"))
      .pipe(gulp.dest('./dist/'))
      .pipe($.size());
});

gulp.task('lint', function() {
  gulp.src('./dist/cash.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('default', ['build','lint','minify']);

gulp.task('watch', ['connect'], function () {
    gulp.watch(['src/*.js'], ['build','lint','minify']);
});