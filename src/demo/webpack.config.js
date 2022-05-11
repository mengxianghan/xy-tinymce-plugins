const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('../../env');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: resolve(__dirname, 'index/index.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'demo'),
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo',
            filename: 'index.html',
            template: './src/demo/index/index.html',
            inject: 'body',
            minify: false,
            templateParameters: {
                BASE_URL: env.APP_PUBLIC_PATH,
            },
            chunks: ['index'],
        }),
    ],
};
