const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');
const webpackConfig = require('../src/demo/webpack.config');
const connect = require('gulp-connect');

// 清理缓存
gulp.task('clean', function () {
    return gulp
        .src('./demo', {
            read: false,
            allowEmpty: true,
        })
        .pipe(clean());
});

// 拷贝 libs
gulp.task('copyLibs', function () {
    return gulp.src('./public/libs/**').pipe(gulp.dest('./demo/libs'));
});

// 拷贝 dist
gulp.task('copyDist', function () {
    return gulp.src('./dist/**').pipe(gulp.dest('./demo/libs/tinymce'));
});

// 编译
gulp.task('buildDemo', function () {
    return gulp
        .src('./src/demo/index/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./demo'))
        .pipe(connect.reload());
});

module.exports = gulp.series('clean', 'copyLibs', 'copyDist', 'buildDemo');
