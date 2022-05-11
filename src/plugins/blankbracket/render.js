import config from './config';

/**
 * 渲染容器
 */
export function renderBox({ editor }) {
    const elLine = editor.dom.create(
        'span',
        {
            class: `xe-${config.name}`,
            'data-name': config?.name,
        },
        '(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)'
    );
    return elLine;
}

/**
 * 渲染 HTML
 * @returns
 */
export function renderHTML({ editor }) {
    const elBox = renderBox({ editor });

    return `&nbsp;${editor.dom.getOuterHTML(elBox)}&nbsp;`;
}
