var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    cp = require('child_process');

gulp.task('styles', function() {
  return gulp.src('_sass/site.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions', '>1%'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('_js/*.js')
    .pipe(concat('site.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js'], {read: false})
    .pipe(clean());
});


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync.init(null, {
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

/**
 * Compile things then watch for changes
 */
gulp.task('watch', function() {
  // Watch .sass files
  gulp.watch('_sass/*.scss', ['styles', 'jekyll-rebuild']);
  // Watch .js files
  gulp.watch('_js/*.js', ['scripts', 'jekyll-rebuild']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/*.md'], ['jekyll-rebuild']);
});

/**
 * What happens when you run 'gulp'
 */
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'browser-sync', 'watch');
});

gulp.task('only-build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'jekyll-build');
});


