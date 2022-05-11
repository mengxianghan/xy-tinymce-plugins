const {autoprefix} = require('./util')

const gulp = require('gulp')
const webpack = require('webpack-stream')
const webpackConfig = require('../src/plugins/webpack.config')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const base64 = require('gulp-base64')
const replace = require('gulp-string-replace')

// 编译 less
gulp.task('buildLess', function () {
    return gulp
        .src('./src/styles/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(
            base64({
                maxImageSize: 5 * 1024,
            }),
        )
        .pipe(
            less({
                math: 'always',
                relativeUrls: true,
                plugins: [autoprefix],
            }),
        )
        .pipe(replace(new RegExp(/\.\.\/assets\//, 'g'), '../images/'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/static/styles'))
})

// 压缩 css
gulp.task('minifyCss', function () {
    return gulp
        .src(['./dist/static/styles/*.css', '!**/*.min.css'])
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({rebase: false}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/static/styles'))
})

// 拷贝图片
gulp.task('copyImg', function () {
    return gulp
        .src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/static/images/'))
})

// 拷贝静态文件
gulp.task('copyPublic', function () {
    return gulp
        .src(['./public/libs/**/*', '!./public/libs/tinymce/**'])
        .pipe(gulp.dest('./dist/static/libs'))
})

// 编译自定义插件
gulp.task('buildPlugins', function () {
    return gulp
        .src('./src/plugins/**/index.js')
        .pipe(sourcemaps.init())
        .pipe(webpack(webpackConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/plugins'))
})

// 压缩 js
gulp.task('minifyJs', function () {
    return gulp
        .src(['./dist/plugins/**/*.js', '!**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/plugins'))
})

module.exports = gulp.series(
    'buildPlugins',
    'minifyJs',
    'buildLess',
    'minifyCss',
    'copyImg',
    'copyPublic'
)
