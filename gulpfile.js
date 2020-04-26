'use strict'

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const lineec = require('gulp-line-ending-corrector');

const filePaths = {
  html: './**/*.html',
  scss: './scss/**/*.scss',
  css: './css/**/*.css',
  js: './js/**/*.js',
  dist: '../dist'
}

function scss() {
  return src(filePaths.scss)
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false } ))
  .pipe(cleanCSS())
  .pipe(lineec())
  .pipe(sourcemaps.write('./'))
  .pipe(dest('./css'))
  .pipe(browserSync.stream());
  // done();
}

function watcher() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  watch(filePaths.scss, scss);
  watch(filePaths.js).on('change', browserSync.reload);
  watch(filePaths.html).on('change', browserSync.reload);
}

function build() {
  return src([filePaths.html, filePaths.css, filePaths.js ])
    .pipe(dest(filePaths.dist));
}

exports.scss = scss;
exports.build = build;
exports.watch = watcher;