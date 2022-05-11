import config from './config';

export function registerButton({ editor }) {
    editor.ui.registry.addMenuButton(config.name, {
        text: config.text,
        tooltip: config.tooltip,
        fetch: function (callback) {
            const items = [
                {
                    type: 'fancymenuitem',
                    fancytype: 'inserttable',
                    onAction: function ({ numColumns, numRows }) {
                        editor.execCommand('mceInsertTable', false, {
                            rows: numRows,
                            columns: numColumns,
                        });
                    },
                },
            ];
            callback(items);
        },
    });
}
