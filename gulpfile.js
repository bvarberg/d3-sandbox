var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass', 'bundle', 'sync']);

// Serve the project directory,
//      watch for html, js, sass changes,
//      reload the browser with browser-sync
gulp.task('sync', function() {
  browserSync.init({
    // Just to be explicit...
    server: '../d3-sandbox'
  });

  // When any html page in the root director changes, reload
  gulp.watch('./*.html').on('change', browserSync.reload);
  // When any js file changes, transpile, bundle, and reload
  gulp.watch('js/*.js', ['bundle']);
  // When the sass changes, run the sass precompiler
  gulp.watch('style/**/*.scss', ['sass']);
});

// Precompile sass to main.css
gulp.task('sass', function() {
  return gulp.src('style/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', gutil.log.bind(gutil, 'Sass Error'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

// Bundle JS (and transpile from ES6 to ES5)
gulp.task('bundle', function() {
  var bundle = browserify({
    entries: './js/bundle.js',
    debug: true
  });

  return bundle.transform(babelify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('js/bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true })) // load map from browserify file
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
