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

;// CONCATENATED MODULE: ./src/plugins/blanknumber/util.js


function getIndex({editor}) {
    const el = editor.dom.create('div', null, editor.getContent)
    const targetList = el.querySelectorAll(`[data-name="${config.name}"]`)
    return targetList.length
}

function formatContent({editor}) {
    const bm = editor.selection.getBookmark(2, true)
    const el = editor.dom.create('div', null, editor.getContent())
    const tragetList = el.querySelectorAll(`[data-name="${blanknumber_config.name}"]`)
    tragetList.forEach((target, index) => {
        const no = index + 1
        editor.dom.setHTML(target, no)
        editor.dom.setAttribs(target, {
            'data-content': JSON.stringify({content: no}),
        })
    })
    editor.setContent(el.innerHTML)
    editor.selection.moveToBookmark(bm)

    // editor.selection.setCursorLocation(
    //     editor.selection.getNode().parentNode,
    //     editor.selection.getRng()?.endOffset
    // );
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/render.js




/**
 * 渲染容器
 */
function renderBox({editor}) {
    const elLine = editor.dom.create(
        'span',
        {
            contenteditable: false,
            class: `xe-${blanknumber_config.name}`,
            'data-name': blanknumber_config?.name,
        },
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    )
    return elLine
}

/**
 * 渲染 HTML
 * @returns
 */
function renderHTML({editor}) {
    const elLine = renderBox({editor})

    return `&nbsp;${editor.dom.getOuterHTML(elLine)}&nbsp;`
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/button.js





function registerButton({editor}) {
    function onSetup(api) {
    }

    function onAction() {
        editor.execCommand('mceInsertContent', false, renderHTML({editor}))
        formatContent({editor})
    }

    editor.ui.registry.addToggleButton(blanknumber_config.name, {
        text: blanknumber_config.text,
        icon: blanknumber_config.icon,
        tooltip: blanknumber_config.tooltip,
        onAction,
        onSetup,
    })

    editor.ui.registry.addToggleMenuItem(blanknumber_config.name, {
        text: blanknumber_config.text,
        icon: blanknumber_config.icon,
        onAction,
        onSetup,
    })
}

;// CONCATENATED MODULE: ./src/plugins/blanknumber/index.js




tinymce.PluginManager.add(blanknumber_config.name, function (editor) {
    registerButton({editor})

    return {
        getMetaData: () => ({
            name: blanknumber_config.name,
        }),
    }
})

/******/ 	return __webpack_exports__;
/******/ })()
;
});