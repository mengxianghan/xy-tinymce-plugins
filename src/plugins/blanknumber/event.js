import config from './config';

import Dialog from './dialog';

export function registerEvent({ editor }) {
    // 双击
    editor.on('dblclick', (e) => {
        const target = editor.dom.getParent(
            e.target,
            `[data-name="${config.name}"]`
        );
        const elContent = editor.dom.create('div', null, editor.getContent());
        const elFirst = elContent.querySelectorAll(
            `[data-name="${config.name}"]`
        )[0];

        // 判断是否第一个
        if (
            editor.dom.getAttrib(target, 'data-content') ===
            editor.dom.getAttrib(elFirst, 'data-content')
        ) {
            new Dialog({ editor }).open({ target });
        }
    });
}
