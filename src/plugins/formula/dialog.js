import { renderHTML } from './render';
import { useOptions } from './options';

import config from './config';

export default class Dialog {
    constructor({ editor }) {
        this.editor = editor;
        this.opts = useOptions({ editor });
    }

    open({ target } = {}) {
        const { editor, opts } = this;
        const baseURL = editor?.baseURI?.source ?? './';
        let data = null;

        if (target) {
            const dataContent = editor.dom.getAttrib(target, 'data-content');
            if (dataContent) {
                data = JSON.parse(dataContent);
            }
        }

        editor.windowManager
            .openUrl({
                title: config.text,
                url:
                    'development' === process.env.NODE_ENV
                        ? 'http://localhost:9900/formula'
                        : `${baseURL}/pages/formula.html`,
                width: 1000,
                height: 648,
                buttons: [
                    { type: 'cancel', name: 'cancel', text: '取消' },
                    {
                        type: 'custom',
                        name: 'ok',
                        text: '确定',
                        primary: true,
                    },
                ],
                onMessage: (dialogApi, details) => {
                    const { mceAction } = details;
                    switch (mceAction) {
                        case 'ready':
                            dialogApi.unblock();
                            dialogApi.sendMessage(
                                {
                                    mceAction: 'init',
                                    data: {
                                        jsList: opts.js,
                                        data,
                                    },
                                },
                                '*'
                            );
                            break;
                        case 'change':
                            data = {
                                content: details?.data?.value,
                            };
                            break;
                    }
                },
                onAction: (dialogApi, details) => {
                    const { name } = details;
                    if ('ok' === name) {
                        const html = renderHTML({
                            editor,
                            data,
                        });
                        editor.execCommand('mceInsertContent', false, html);
                        dialogApi.close();
                    }
                },
            })
            .block('加载中');
    }
}
