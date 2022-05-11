import config from './config';

/**
 * 加载所需 js
 */
export function loadJs({ editor }) {
    const doc = editor.getDoc();
    const elHead = doc.getElementsByTagName('head')[0];
    const scriptList = Array.from(doc.getElementsByTagName('script'));
    const jsList = getOption({ editor, key: 'formula_js' });
    if (jsList && jsList.length) {
        jsList.forEach((script) => {
            const flag = scriptList.every((o) => {
                const src = o.getAttribute('src');
                return src === script;
            });
            if (flag) {
                const elScript = editor.dom.create('script', {
                    src: script,
                });
                elHead.append(elScript);
            }
        });
    }
}

/**
 * 获取配置
 */
export function getOption({ editor, key }) {
    return editor.getParam(key) ?? config[key];
}

/**
 * 是否有定界符
 */
export function hasDelimiter({ content, delimiter }) {
    if (!content) return false;
    const [start = '', end = ''] = delimiter;
    return content.startsWith(start) && content.endsWith(end);
}

/**
 * 添加定界符
 */
export function addDelimiter({ content, delimiter }) {
    const [start = '', end = ''] = delimiter;
    if (!content) return '';
    if (hasDelimiter({ content, delimiter })) {
        return content;
    } else {
        return `${start}${content}${end}`;
    }
}

/**
 * 移除定界符
 */
export function removeDelimiter({ content, delimiter }) {
    const [start = '', end = ''] = delimiter;
    if (!content) return '';
    if (hasDelimiter({ content, delimiter })) {
        return content.substring(start.length, content.length - end.length);
    } else {
        return content;
    }
}
