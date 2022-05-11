const lessAutoprefix = require('less-plugin-autoprefix')

exports.autoprefix = new lessAutoprefix({
    browsers: [
        'last 2 Safari versions',
        'iOS 14.0',
        'last 2 Chrome versions',
        'Firefox ESR',
    ],
    grid: 'no-autoplace',
})
