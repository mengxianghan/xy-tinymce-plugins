/**
 * 移除同类样式
 */
export const removeSimilarClassNames = ({ editor, className }) => {
    const similarClassNames = [
        'xe-underline',
        'xe-underwavy',
        'xe-underdoubleline',
    ];
    // 判断是否存在样式
    const node = editor.selection.getNode();
    similarClassNames.forEach((name) => {
        // 排除当前
        if (name !== className) {
            if (node.classList.contains(name)) {
                node.classList.remove(name);
            }
        }
    });
    editor.selection.getNode();
};

/**
 * 渲染占位符
 * @param {object} editor
 */
export function renderPlaceholder({ editor }) {
    const elPlaceholder = editor.dom.create(
        'span',
        { hidden: 'hidden', 'data-name': 'placeholder' },
        'placeholder'
    );
    return elPlaceholder;
}

/**
 * 获取中文
 * @param {string} str
 * @returns {String}
 */
export const getChinese = (str) => {
    const chineseReg = new RegExp(/[\u4E00-\u9FA5\uF900-\uFA2D\u0020]+/, 'g');
    if (str !== null && str !== '') {
        return str.match(chineseReg)?.join('') ?? '';
    } else {
        return '';
    }
};
