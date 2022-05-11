import config from './config';

/**
 * 渲染容器
 */
export function renderBox({ editor, data }) {
    const elLine = editor.dom.create(
        'span',
        {
            contenteditable: false,
            class: `xe-${config.name}`,
            'data-name': config?.name,
        },
        data?.content ?? '&nbsp;'
    );
    if (data) {
        editor.dom.setAttrib(elLine, 'data-content', JSON.stringify(data));
    }
    return elLine;
}

/**
 * 渲染 HTML
 * @returns
 */
export function renderHTML({ editor, data }) {
    const elLine = renderBox({ editor, data });

    return editor.dom.getOuterHTML(elLine);
}
