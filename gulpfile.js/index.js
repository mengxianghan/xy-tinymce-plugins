const gulp = require('gulp')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const common = require('./common')
const plugins = require('./plugins')
const icons = require('./icons')
const demo = require('./demo')
const pages = require('./pages')

// 清理缓存
gulp.task('clean', function () {
    return gulp.src('./dist', {
                   read: false,
                   allowEmpty: true,
               })
               .pipe(clean())
})

// 监听
gulp.task('monitor', function (done) {
    connect.server(
        {
            root: './demo',
            port: 9000,
            livereload: true,
        },
        function () {
            this.server.on('close', done)
        },
    )

    gulp.watch(['./src/**/*', '!./src/pages/**'])
        .on('change', gulp.series('clean', 'build-demo'))
})

gulp.task('build-demo', gulp.series(common, icons, plugins, demo))
gulp.task('build', gulp.series('clean', pages, 'build-demo'))
gulp.task('watch', gulp.series('clean', 'build-demo', 'monitor'))
