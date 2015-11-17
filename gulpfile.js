/*GULP FILE*/
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
//var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
 
var isProd = false;
 
gulp.task('styles', function() {
  gulp.src('./public/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.stream());
});

// We need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon.
// Increase this delay if browser-sync won't reload for you.
var BROWSER_SYNC_RELOAD_DELAY = 500;
gulp.task('nodemon', function (cb) {
  var started = false;
  var enviroment = isProd ? 'production' : 'development';
 
  return nodemon({
    script: 'bin/www',
    ext: 'js jade json',
    env: { 'NODE_ENV': enviroment },
    // watch core server file(s) that require server restart on change
    watch: ['bin/www', 'app.js','routes/**/*', 'views/**/*']
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      reloadBrowser(BROWSER_SYNC_RELOAD_DELAY);
  });
});
function reloadBrowser(delay) {
  if(delay) {
    setTimeout(function reload() {
      browserSync.reload();
    }, delay);
  } else {
    browserSync.reload();
  }
}

gulp.task('inspect', function() {
  return gulp.src([ './lib/**/*.js','./bin/**/*.js',
                    './public/**/*.js','./routes/**/*.js',
                    './*.js'])
    .pipe(jshint());
});

//
//TEST CASES
//
//gulp.task('test', function(){
//  return gulp
//    .src('./lib/validInput.test.js')
//    .pipe(mocha());
//});
 
 
gulp.task('browser-sync', function() {
    browserSync.init(null, {
      proxy: 'http://localhost:3000',
      browser: "chrome",
      port: 8080,
    });
    gulp.watch('./public/stylesheets/**/*.scss', ['styles']).on('change', browserSync.reload);
    gulp.watch('./lib/**/*').on('change', browserSync.reload);
});
 
gulp.task('setProdEnv', function() { isProd = true; });
 
gulp.task('serve', ['nodemon', 'browser-sync']);
// set production enviroment, then serve.
gulp.task('serve-prod', ['setProdEnv','serve']);
gulp.task('default', ['serve','inspect', 'styles']);