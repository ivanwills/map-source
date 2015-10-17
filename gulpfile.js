/* global require */

var gulp     = require('gulp');
var gulpCopy = require('gulp-copy');
var plugins  = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('copy-lodash', function() {
    return gulp.src([
        './node_modules/lodash/index.js',
    ])
    .pipe(gulpCopy('js', { prefix: 2 }));
});
gulp.task('copy-ractive', function() {
    return gulp.src([
        './node_modules/ractive/ractive.min.js*',
    ])
    .pipe(gulpCopy('js', { prefix: 2 }));
});
gulp.task('copy-ractivef', function() {
    return gulp.src([
        './node_modules/ractive-foundation/dist/ractivef-base.js',
    ])
    .pipe(gulpCopy('js', { prefix: 3 }));
});
gulp.task('copy-hammerjs', function() {
    return gulp.src([
        './node_modules/hammerjs/hammer*',
    ])
    .pipe(gulpCopy('js', { prefix: 2 }));
});
gulp.task('copy-superagent', function() {
    return gulp.src([
        './node_modules/superagent/superagent.js',
    ])
    .pipe(gulpCopy('js', { prefix: 2 }));
});
gulp.task('copy-ractive-touch', function() {
    return gulp.src([
        './node_modules/ractive-touch/index.js',
    ])
    .pipe(gulpCopy('js', { prefix: 1 }));
});
gulp.task('copy', ['copy-lodash', 'copy-ractive', 'copy-ractivef', 'copy-hammerjs', 'copy-superagent', 'copy-ractive-touch']);

const DEV_SERVER_PORT = 7080;

gulp.task('connect', function () {
    plugins.connect.server({
        root: '.',
        livereload: true,
        port: DEV_SERVER_PORT
    });
});

gulp.task('watch', function () {
    var self = this;
    plugins.watch([
        '*.html',
        '**/*.js',
        '**/*.css'
    ], function () {
        runSequence('build', 'html', function (err) {
            self.emit('end');
        });
    });

});

gulp.task('default', function () {
    var self = this;
    runSequence('copy',  'connect', 'watch', function (err) {
        self.emit('end');
    });
});
