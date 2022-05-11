window.MathJax = {
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();
            MathJax.startup.promise.then(() => {});
        },
    },
    options: {
        enableMenu: false,
    },
    tex: {
        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
        ],
        macros: {
            RR: '{\\bf R}',
            bold: ['{\\bf #1}', 1],
        },
        packages: {
            '[+]': ['mhchem', 'unicode'],
        },
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]'],
        ],
    },
    loader: {
        load: ['[tex]/boldsymbol', '[tex]/mhchem', '[tex]/unicode'],
    },
};
