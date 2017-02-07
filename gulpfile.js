'use strict';

const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const runSequence   = require('run-sequence');
const babel         = require('gulp-babel');
const uglifycss     = require('gulp-uglifycss');

gulp.task('serve', (callback) => runSequence(['sass', 'babel'], 'browser-init', 'watch', callback));

gulp.task('browser-init', () => {
    browserSync.init({
        server: {baseDir: './src'}
    });
});

gulp.task('browser-reload', [], (callback) => {
    browserSync.reload();
    callback();
});

gulp.task('watch', () => {
    // pre-compiled css & javascript
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/babel/*.js', ['babel']);

    // file that need to watch
    gulp.watch('src/*.html', ['browser-reload']);
    gulp.watch('src/js/*.js', ['browser-reload']);
    gulp.watch('src/css/*.css', ['browser-reload']);
});

gulp.task('sass', () => {
    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({"maxLineLen": 1024, "uglyComments": true}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('babel', () => {
    gulp.src('src/babel/*.js')
        .pipe(babel())
        .pipe(gulp.dest('src/js'));
});
