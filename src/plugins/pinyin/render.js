import { getChinese } from '../../utils';

import config from './config';

/**
 * 渲染分组
 * @param {object} editor
 */
export function renderGroup({ editor }) {
    const elGroup = editor.dom.create('span', {
        class: 'xe-pinyin-group',
        contenteditable: false,
        'data-name': config.name,
    });
    return elGroup;
}

/**
 * 渲染田字格
 * @param {object} editor
 * @param {string} chinese
 */
export function renderTianzige({ editor, chinese }) {
    const elWrap = editor.dom.create('span', { class: 'xe-tianzige' });
    const elText = editor.dom.create(
        'span',
        { class: 'xe-tianzige__text', 'data-placeholder': '1' },
        chinese
    );

    elWrap.append(elText);

    return elWrap;
}

/**
 * 渲染拼音
 * @param {object} editor
 * @param {string} chinese
 * @param {string} pinyin
 */
export function renderPinyin({ editor, chinese, pinyin }) {
    const elWrap = editor.dom.create('span', { class: 'xe-pinyin' });
    const elRuby = editor.dom.create('ruby');
    const elText = editor.dom.create(
        'span',
        { class: 'xe-pinyin__text', 'data-placeholder': '1' },
        chinese
    );
    const elRt = editor.dom.create('rt', null, pinyin);

    elRuby.append(elText);
    elRuby.append(elRt);
    elWrap.append(elRuby);

    return elWrap;
}

/**
 * 渲染拼音田字格
 * @param {string} chinese
 * @param {object} editor
 * @param {string} pinyin
 */
export function renderPinyinTianzige({ editor, chinese, pinyin }) {
    const elPinyin = renderPinyin({ editor, chinese, pinyin });
    const elTianzige = renderTianzige({ editor, chinese });

    const elRuby = elPinyin.querySelector('ruby');

    elRuby.firstChild.remove();
    elRuby.prepend(elTianzige);

    return elPinyin;
}

/**
 * 渲染 HTML
 * @param {object} editor
 * @param {object} data
 * @returns
 */
export function renderHTML({ editor, data }) {
    let { pinyin = '', chinese = '', showTianzige = true } = data || {};
    chinese = getChinese(chinese);
    pinyin = pinyin?.trim();
    const fragment = editor.dom.createFragment();
    const elGroup = renderGroup({ editor });
    const chineseArr = chinese ? chinese.split('') : [];
    const pinyinArr = pinyin ? pinyin.split(' ') : [];
    const chineseLen = chineseArr.length;
    const pinyinLen = pinyinArr.length;
    const list = chineseLen >= pinyinLen ? chineseArr : pinyinArr;

    if (!list.length) {
        return '';
    }

    list.forEach((_, index) => {
        const params = {
            editor,
            chinese: chineseArr[index],
            pinyin: pinyinArr[index] || '&nbsp;',
        };
        let node;

        // 判断是否显示田字格
        if (showTianzige) {
            // 显示田字格
            // 判断是否有拼音
            if (pinyinLen) {
                // 有拼音
                node = renderPinyinTianzige(params);
            } else {
                // 没有拼音
                node = renderTianzige(params);
            }
        } else {
            // 不显示田字格
            node = renderPinyin(params);
        }

        fragment.append(node);
    });

    elGroup.append(fragment);
    editor.dom.setAttribs(elGroup, {
        'data-content': JSON.stringify(data),
    });

    return editor.dom.getOuterHTML(elGroup);
}
