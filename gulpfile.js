var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass', 'sync']);

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
    // When any js file changes, reload
    gulp.watch('js/*.js').on('change', browserSync.reload);
    // When the sass changes, run the sass precompiler
    gulp.watch('style/**/*.scss', ['sass']);
});

// Precompile sass to main.css
gulp.task('sass', function() {
    return gulp.src('style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('style'))
        .pipe(browserSync.stream());
})
