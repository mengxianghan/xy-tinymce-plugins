import { addDelimiter } from './util';
import { useOptions } from './options';

import config from './config';

export function renderBox({ editor, data }) {
    const { delimiter } = useOptions({ editor });
    const el = editor.dom.create(
        'span',
        {
            contenteditable: false,
            'data-name': config.name,
            'data-content': JSON.stringify(data),
            class: 'xe-formula',
        },
        addDelimiter({ content: data?.content, delimiter })
    );
    return el;
}

/**
 * 渲染 HTML
 * @returns
 */
export function renderHTML({ editor, data }) {
    return editor.dom.getOuterHTML(renderBox({ editor, data }));
}
