var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var rimraf        = require('rimraf');
var styledown     = require('gulp-styledown');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var webpackConfig = require('./webpack.config.js');

var path = {
  assets: 'assets/',
  build: 'build/'
}

gulp.task('cleanBuild', function (cb) {
  rimraf(path.build, cb);
});

gulp.task('copyIndex', function () {
  return gulp.src(path.assets + 'index.html')
    .pipe(gulp.dest(path.build))
    .pipe(reload({stream:true}));
});

gulp.task('webpack', function (cb) {
  return gulp.src('')
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest(''))
    .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    port: 3000,
    server: {
      baseDir: path.build
    }
  });
});

gulp.task('serve', ['cleanBuild', 'copyIndex', 'webpack', 'browserSync'], function() {
  gulp.watch(path.assets+'**/*.(js|jsx)', ['webpack']);
  gulp.watch(path.assets + 'index.html', ['copyIndex']);
});