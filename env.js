const env = {
    development: {
        APP_PUBLIC_PATH: 'http://localhost:9000',
    },
    production: {
        APP_PUBLIC_PATH: 'https://mengxianghan.github.io/xy-tinymce-plugins/demo',
    },
};

module.exports = env[process.env.NODE_ENV];
