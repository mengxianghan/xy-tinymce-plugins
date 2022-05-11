const gulp = require('gulp')
const shell = require('gulp-shell')

// 编译 pages
gulp.task('buildPages', function () {
    return gulp.src('./src/pages')
               .pipe(shell('npm run build:pages'))
})

// 拷贝 pages
gulp.task('copyPages', function () {
    return gulp.src('./src/pages/dist/**')
               .pipe(gulp.dest('./dist/pages'))
})

module.exports = gulp.series('buildPages', 'copyPages')
