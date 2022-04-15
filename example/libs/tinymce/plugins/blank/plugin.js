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

;// CONCATENATED MODULE: ./src/plugins/blank/config.js
/* harmony default export */ const config = ({
    name: 'blank',
    text: '填空',
    icon: 'blank',
    tooltip: '填空',
});

;// CONCATENATED MODULE: ./src/plugins/blank/render.js


/**
 * 渲染容器
 */
function renderBox({ editor }) {
    const elLine = editor.dom.create(
        'span',
        {
            class: `xe-${config.name}`,
            'data-name': config?.name,
        },
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    );
    return elLine;
}

/**
 * 渲染 HTML
 * @returns
 */
function renderHTML({ editor }) {
    const elLine = renderBox({ editor });

    return `&nbsp;${editor.dom.getOuterHTML(elLine)}&nbsp;`;
}

;// CONCATENATED MODULE: ./src/plugins/blank/button.js




function registerButton({ editor }) {
    function onSetup(api) {}

    function onAction() {
        editor.execCommand('mceInsertContent', false, renderHTML({ editor }));
    }

    editor.ui.registry.addToggleButton(config.name, {
        text: config.text,
        icon: config.icon,
        tooltip: config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addToggleMenuItem(config.name, {
        text: config.text,
        icon: config.icon,
        onAction,
        onSetup,
    });
}

;// CONCATENATED MODULE: ./src/plugins/blank/index.js




tinymce.PluginManager.add(config.name, function (editor) {
    registerButton({ editor });

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