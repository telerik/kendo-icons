const gulp = require('gulp');
const sass = require('gulp-sass');

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
