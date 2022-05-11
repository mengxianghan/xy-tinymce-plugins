import { renderHTML } from './render';
import { formatContent } from './util';

export default class Dialog {
    constructor({ editor }) {
        this.editor = editor;
    }

    open({ target }) {
        const { editor } = this;
        let data = null;
        if (target) {
            const dataContent = editor.dom.getAttrib(target, 'data-content');
            if (dataContent) {
                data = JSON.parse(dataContent);
            }
        }
        editor.windowManager.open({
            title: '序号',
            body: {
                type: 'panel',
                items: [{ type: 'input', name: 'content' }],
            },
            initialData: {
                content: data?.content ?? '',
            },
            buttons: [
                { type: 'cancel', name: 'cancel', text: '取消' },
                { type: 'submit', name: 'ok', text: '确定', primary: true },
            ],
            onSubmit: (dialogApi) => {
                editor.execCommand(
                    'mceInsertContent',
                    false,
                    renderHTML({ editor, data: dialogApi.getData() })
                );
                formatContent({ editor });
                dialogApi.close();
            },
        });
    }
}
