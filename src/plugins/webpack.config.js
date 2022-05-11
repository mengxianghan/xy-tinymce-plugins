const { resolve } = require('path');
const fs = require('fs');

const files = fs.readdirSync(resolve(__dirname), 'utf-8');
const entrys = {};

files.forEach((name) => {
    // 排除的文件
    if (!/\.(js)$/.test(name)) {
        entrys[name] = resolve(__dirname, `./${name}/index.js`);
    }
});

module.exports = {
    mode: process.env.NODE_ENV,
    entry: entrys,
    output: {
        filename: '[name]/plugin.js',
        path: resolve(__dirname, 'dist'),
        library: {
            type: 'umd',
        },
    },
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
};
