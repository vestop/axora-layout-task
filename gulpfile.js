/* eslint-disable linebreak-style */
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');

const config = {
  root: './src/',
  html: {
    src: 'index.html',
  },
  css: {
    watch: 'less/**/*.less',
    src: 'less/+(styles).less',
    dest: 'css',
  },
  js: {
    dev: 'js/dev/**/*.js',
    src: 'js/dev/+(common).js',
    prod: 'js/prod/',
  },
};

gulp.task('build', function(done) {
  gulp.src(config.root + config.css.src)
      .pipe(less())
      .pipe(gcmq())
      .pipe(autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false,
      }))
      .pipe(cleanCSS({
        level: 2,
      }))
      .pipe(gulp.dest(config.root + config.css.dest))
      .pipe(browserSync.reload({
        stream: true,
      }));

  done();
});

gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: config.root,
    },
  });

  done();
});

gulp.task('watch', gulp.series('browserSync', function() {
  gulp.watch(config.root + config.css.watch, gulp.parallel('build'));
  gulp.watch(config.root + config.html.src, gulp.parallel(function(done) {
    browserSync.reload();

    done();
  }));

  gulp.watch(config.root + config.js.src, gulp.parallel(function(done) {
    browserSync.reload();

    done();
  }));
}));

gulp.task('grid', function(done) {
  smartgrid('src/less', {
    container: {
      maxWidth: '965px',
    },
  });

  done();
});
