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

;// CONCATENATED MODULE: ./src/plugins/blanknumber/config.js
/* harmony default export */ const blanknumber_config = ({
    name: 'blanknumber',
    text: '序号填空',
    icon: 'blanknumber',
    tooltip: '序号填空',
});

;// CONCATENATED MODULE: ./src/plugins/blanknumber/render.js


/**
 * 渲染容器
 */
function renderBox({ editor, data }) {
    const elLine = editor.dom.create(
        'span',
        {
            contenteditable: false,
            class: `xe-${blanknumber_config.name}`,
            'data-name': blanknumber_config?.name,
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
function renderHTML({ editor, data }) {
    const elLine = renderBox({ editor, data });

    return editor.dom.getOuterHTML(elLine);
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/util.js


function getIndex({ editor }) {
    const el = editor.dom.create('div', null, editor.getContent);
    const targetList = el.querySelectorAll(`[data-name="${config.name}"]`);
    return targetList.length;
}

function formatContent({ editor }) {
    const bm = editor.selection.getBookmark(2, true);
    const el = editor.dom.create('div', null, editor.getContent());
    const tragetList = el.querySelectorAll(`[data-name="${blanknumber_config.name}"]`);
    const firstNumber = Number(
        JSON.parse(editor.dom.getAttrib(tragetList[0], 'data-content') || '{}')
            ?.content ?? 1
    );
    tragetList.forEach((target, index) => {
        const number = index + firstNumber;
        editor.dom.setHTML(target, number);
        editor.dom.setAttribs(target, {
            'data-content': JSON.stringify({ content: String(number) }),
        });
    });
    editor.setContent(el.innerHTML);
    editor.selection.moveToBookmark(bm);

    editor.selection.setCursorLocation(
        editor.selection.getNode().parentNode,
        editor.selection.getRng()?.endOffset
    );
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/button.js





function registerButton({ editor }) {
    function onSetup(api) {}

    function onAction() {
        editor.execCommand('mceInsertContent', false, renderHTML({ editor }));
        formatContent({ editor });
    }

    editor.ui.registry.addToggleButton(blanknumber_config.name, {
        text: blanknumber_config.text,
        icon: blanknumber_config.icon,
        tooltip: blanknumber_config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addToggleMenuItem(blanknumber_config.name, {
        text: blanknumber_config.text,
        icon: blanknumber_config.icon,
        onAction,
        onSetup,
    });
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/dialog.js



class Dialog {
    constructor({ editor }) {
        this.editor = editor;
    }

    open({ target }) {
        const { editor } = this;
        let data = null;
        if (target) {
            const dataContent = editor.dom.getAttrib(target, 'data-content');
            if (dataContent) {
                data = JSON.parse(dataContent);
            }
        }
        editor.windowManager.open({
            title: '序号',
            body: {
                type: 'panel',
                items: [{ type: 'input', name: 'content' }],
            },
            initialData: {
                content: data?.content ?? '',
            },
            buttons: [
                { type: 'cancel', name: 'cancel', text: '取消' },
                { type: 'submit', name: 'ok', text: '确定', primary: true },
            ],
            onSubmit: (dialogApi) => {
                editor.execCommand(
                    'mceInsertContent',
                    false,
                    renderHTML({ editor, data: dialogApi.getData() })
                );
                formatContent({ editor });
                dialogApi.close();
            },
        });
    }
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/event.js




function registerEvent({ editor }) {
    // 双击
    editor.on('dblclick', (e) => {
        const target = editor.dom.getParent(
            e.target,
            `[data-name="${blanknumber_config.name}"]`
        );
        const elContent = editor.dom.create('div', null, editor.getContent());
        const elFirst = elContent.querySelectorAll(
            `[data-name="${blanknumber_config.name}"]`
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

;// CONCATENATED MODULE: ./src/plugins/blanknumber/index.js





tinymce.PluginManager.add(blanknumber_config.name, function (editor) {
    registerButton({ editor });
    registerEvent({ editor });

    return {
        getMetaData: () => ({
            name: blanknumber_config.name,
        }),
    };
});

/******/ 	return __webpack_exports__;
/******/ })()
;
});