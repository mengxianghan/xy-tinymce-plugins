const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

// 拷贝 icon
gulp.task('copyIcon', function () {
    return gulp.src('./src/icons/**/*.js')
               .pipe(gulp.dest('./dist/icons'))
})

// 压缩 js
gulp.task('minifyJs', function () {
    return gulp
        .src(['./dist/icons/**/*.js', '!**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/icons'))
})

module.exports = gulp.series('copyIcon', 'minifyJs')
