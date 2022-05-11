import { renderHTML } from './render';

import config from './config';

export default class Dialog {
    constructor({ editor }) {
        this.editor = editor;
        this.previewId = editor.dom.uniqueId();
    }

    open({ target } = {}) {
        const { editor, previewId } = this;
        let data = null;

        if (target) {
            const dataContent = editor.dom.getAttrib(target, 'data-content');
            if (dataContent) {
                data = JSON.parse(dataContent);
            }
        }

        editor.windowManager.open({
            title: config.text,
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'label',
                        label: '中文',
                        items: [{ type: 'input', name: 'chinese' }],
                    },
                    {
                        type: 'label',
                        label: '拼音',
                        items: [{ type: 'input', name: 'pinyin' }],
                    },
                    {
                        type: 'checkbox',
                        label: '显示田字格',
                        name: 'showTianzige',
                    },
                    {
                        type: 'label',
                        label: '',
                        items: [
                            {
                                type: 'htmlpanel',
                                html: editor.dom.createHTML('div', {
                                    id: previewId,
                                    class: 'xe-dialog-preview',
                                }),
                            },
                        ],
                    },
                ],
            },
            initialData: {
                showTianzige: data?.showTianzige ?? true,
                pinyin: data?.pinyin ?? '',
                chinese: data?.chinese ?? '',
            },
            buttons: [
                { type: 'cancel', name: 'cancel', text: '取消' },
                { type: 'submit', name: 'ok', text: '确定', primary: true },
            ],
            onChange: (dialogApi) => {
                document.getElementById(previewId).innerHTML = renderHTML({
                    editor,
                    data: dialogApi.getData(),
                });
            },
            onSubmit: (dialogApi) => {
                editor.execCommand(
                    'mceInsertContent',
                    false,
                    renderHTML({
                        editor,
                        data: dialogApi.getData(),
                    })
                );
                dialogApi.close();
            },
        });

        document.getElementById(previewId).innerHTML = renderHTML({
            editor,
            data,
        });
    }
}
