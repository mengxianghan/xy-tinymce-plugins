(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/plugins/pinyin/config.js
/* harmony default export */ const config = ({
    name: 'pinyin',
    text: '拼音',
    icon: 'pinyin',
    tooltip: '拼音',
});

;// CONCATENATED MODULE: ./src/utils/index.js
/**
 * 移除同类样式
 */
const removeSimilarClassNames = ({ editor, className }) => {
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
function renderPlaceholder({ editor }) {
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
const getChinese = (str) => {
    const chineseReg = new RegExp(/[\u4E00-\u9FA5\uF900-\uFA2D\u0020]+/, 'g');
    if (str !== null && str !== '') {
        return str.match(chineseReg)?.join('') ?? '';
    } else {
        return '';
    }
};

;// CONCATENATED MODULE: ./src/plugins/pinyin/render.js




/**
 * 渲染分组
 * @param {object} editor
 */
function renderGroup({ editor }) {
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
function renderTianzige({ editor, chinese }) {
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
function renderPinyin({ editor, chinese, pinyin }) {
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
function renderPinyinTianzige({ editor, chinese, pinyin }) {
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
function renderHTML({ editor, data }) {
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

;// CONCATENATED MODULE: ./src/plugins/pinyin/dialog.js




class Dialog {
    constructor({ editor }) {
        this.editor = editor;
        this.previewId = editor.dom.uniqueId();
    }

    open({ target } = {}) {
        const { editor, previewId } = this;
        let data = null;

        if (target) {
            const dataContent = editor.dom.getAttrib(target, 'data-content');
            if (dataContent) {
                data = JSON.parse(dataContent);
            }
        }

        editor.windowManager.open({
            title: config.text,
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'label',
                        label: '中文',
                        items: [{ type: 'input', name: 'chinese' }],
                    },
                    {
                        type: 'label',
                        label: '拼音',
                        items: [{ type: 'input', name: 'pinyin' }],
                    },
                    {
                        type: 'checkbox',
                        label: '显示田字格',
                        name: 'showTianzige',
                    },
                    {
                        type: 'label',
                        label: '',
                        items: [
                            {
                                type: 'htmlpanel',
                                html: editor.dom.createHTML('div', {
                                    id: previewId,
                                    class: 'xe-dialog-preview',
                                }),
                            },
                        ],
                    },
                ],
            },
            initialData: {
                showTianzige: data?.showTianzige ?? true,
                pinyin: data?.pinyin ?? '',
                chinese: data?.chinese ?? '',
            },
            buttons: [
                { type: 'cancel', name: 'cancel', text: '取消' },
                { type: 'submit', name: 'ok', text: '确定', primary: true },
            ],
            onChange: (dialogApi) => {
                document.getElementById(previewId).innerHTML = renderHTML({
                    editor,
                    data: dialogApi.getData(),
                });
            },
            onSubmit: (dialogApi) => {
                editor.execCommand(
                    'mceInsertContent',
                    false,
                    renderHTML({
                        editor,
                        data: dialogApi.getData(),
                    })
                );
                dialogApi.close();
            },
        });

        document.getElementById(previewId).innerHTML = renderHTML({
            editor,
            data,
        });
    }
}

;// CONCATENATED MODULE: ./src/plugins/pinyin/button.js




function registerButton({ editor }) {
    let dialog = null;

    function onSetup(api) {
        dialog = new Dialog({ editor });
    }

    function onAction() {
        dialog.open();
    }

    editor.ui.registry.addButton(config.name, {
        text: config.text,
        icon: config.icon,
        tooltip: config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addMenuItem(config.name, {
        text: config.text,
        icon: config.icon,
        onAction,
        onSetup,
    });
}

;// CONCATENATED MODULE: ./src/utils/event.js


function registerPlaceholderEvent({ editor }) {
    // 预处理回填内容
    editor.on('BeforeSetContent', (e) => {
        const el = editor.dom.create('div', null, e?.content ?? '');
        const targetList = el.querySelectorAll('[data-placeholder="1"]');
        // 向符合条件的容器中添加占位容器
        targetList.forEach((item) => {
            if (!item.innerHTML) {
                item.append(renderPlaceholder({ editor }));
            }
        });
        e.content = el.innerHTML;
    });

    // 预处理获取内容
    editor.on('GetContent', (e) => {
        const el = editor.dom.create('div', null, e?.content ?? '');
        const targetList = el.querySelectorAll('[data-name="placeholder"]');
        // 移除占位容器
        targetList.forEach((item) => {
            item.remove();
        });
        e.content = el.innerHTML;
    });
}

;// CONCATENATED MODULE: ./src/plugins/pinyin/event.js




function registerEvent({ editor }) {
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

;// CONCATENATED MODULE: ./src/plugins/pinyin/index.js






tinymce.PluginManager.add(config.name, function (editor) {
    registerPlaceholderEvent({ editor });
    registerButton({ editor });
    registerEvent({ editor });

    return {
        getMetaData: () => ({
            name: config.name,
        }),
    };
});

/******/ 	return __webpack_exports__;
/******/ })()
;
});