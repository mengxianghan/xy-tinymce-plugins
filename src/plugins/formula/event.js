import { loadJs, addDelimiter } from './util';
import { useOptions } from './options';

import config from './config';

import Dialog from './dialog';

export function registerEvent({ editor }) {
    // 初始化
    editor.on('init', (e) => {
        loadJs({ editor });
    });

    // 设置内容
    editor.on('SetContent', (e) => {
        const doc = editor.getDoc();
        if (doc.defaultView.MathJax) {
            doc.defaultView.MathJax.startup.getComponents();
            doc.defaultView.MathJax.typeset();
        }
    });

    // 获取内容
    editor.on('GetContent', (e) => {
        const { delimiter } = useOptions({ editor });
        const el = editor.dom.create('div', null, e.content);
        const targetList = el.querySelectorAll(`[data-name="${config.name}"]`);
        targetList.forEach((target) => {
            const dataContent = JSON.parse(
                editor.dom.getAttrib(target, 'data-content') || '{}'
            );
            editor.dom.setHTML(
                target,
                addDelimiter({
                    content: dataContent?.content,
                    delimiter,
                })
            );
        });
        e.content = el.innerHTML;
    });

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
