import '../styles/index.less';

const env = require('/env');

tinymce.init({
    selector: '#basic',
    language: 'zh_CN',
    height: 500,
    menubar: false,
    plugins: [
        'code',
        'underwavy',
        'underlineplus',
        'underdoubleline',
        'underpoint',
        'table',
        'simpletable',
        'autoresize',
        'pinyin',
        'formula',
        'blank',
        'blanknumber',
        'blankbracket',
    ],
    toolbar:
        'code underwavy underlineplus underdoubleline underpoint simpletable pinyin formula blank blanknumber blankbracket',
    content_css: [
        `${env.APP_PUBLIC_PATH}/libs/tinymce/static/styles/index.min.css`,
    ],
    icons: 'xe',
    branding: false,
    inline: false,
    verify_html: false,
    formula_js: [
        `${env.APP_PUBLIC_PATH}/libs/tinymce/static/js/mathjax.config.min.js`,
        `${env.APP_PUBLIC_PATH}/libs/mathjax-3.2.0/es5/tex-svg-full.js`,
    ],
    setup: (editor) => {
        editor.on('init', () => {
            window.MathJax && window.MathJax.typeset();
        });
    },
});
