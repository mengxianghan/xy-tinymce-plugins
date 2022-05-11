const gulp = require('gulp')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

gulp.task('buildJs', function () {
    return gulp
        .src(['./src/config/mathjax.config.js', '!**/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/static/js'))
})

module.exports = gulp.series('buildJs')
