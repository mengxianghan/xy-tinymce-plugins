const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const { NODE_ENV, VUE_APP_PUBLIC_PATH, VUE_APP_OUTPUT_DIR } = process.env;
const isProd = NODE_ENV !== 'development';

module.exports = {
    publicPath: VUE_APP_PUBLIC_PATH,
    outputDir: VUE_APP_OUTPUT_DIR,
    assetsDir: 'static',
    runtimeCompiler: true,
    productionSourceMap: !isProd, // 生产环境是否生成 sourceMap 文件
    pages: {
        formula: {
            entry: 'src/views/formula/main.js',
            title: '公式',
            chunks: ['chunk-vendors', 'chunk-common', 'formula'],
        },
    },
    devServer: {
        port: 9900,
    },
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                filename: '[path][base].gz',
                threshold: 10240,
                deleteOriginalAssets: false,
            }),
        ],
        performance: {
            hints: false,
        },
    },
    chainWebpack: (config) => {
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
            .tap((options) => ({
                ...options,
                limit: 1024 * 5, // 压缩图片
            }));
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import '${path.resolve(
                        __dirname,
                        'src/styles/vars.less'
                    )}'; @import '${path.resolve(
                        __dirname,
                        'src/styles/util.less'
                    )}'`,
                },
                javascriptEnabled: true,
            },
        },
    },
};
