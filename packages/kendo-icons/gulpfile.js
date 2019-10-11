const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');

sass.compiler = require('node-sass');

const sassOptions = {
    outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp.src('./scss/kendo-icons.scss')
        .pipe(sass.sync(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('lint', function () {
    return gulp.src('./scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
