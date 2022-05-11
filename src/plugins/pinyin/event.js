import config from './config';

import Dialog from './dialog';

export function registerEvent({ editor }) {
    // 双击
    editor.on('dblclick', (e) => {
        const target = editor.dom.getParent(
            e.target,
            `[data-name="${config.name}"]`
        );
        if (target) {
            new Dialog({ editor }).open({ target });
        }
    });
}
