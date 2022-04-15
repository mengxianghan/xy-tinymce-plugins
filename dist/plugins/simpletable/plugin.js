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

;// CONCATENATED MODULE: ./src/plugins/simpletable/config.js
/* harmony default export */ const config = ({
    name: 'simpletable',
    text: '简易表格',
    icon: 'simpletable',
    tooltip: '简易表格',
});

;// CONCATENATED MODULE: ./src/plugins/simpletable/button.js


function registerButton({ editor }) {
    editor.ui.registry.addMenuButton(config.name, {
        text: config.text,
        tooltip: config.tooltip,
        fetch: function (callback) {
            const items = [
                {
                    type: 'fancymenuitem',
                    fancytype: 'inserttable',
                    onAction: function ({ numColumns, numRows }) {
                        editor.execCommand('mceInsertTable', false, {
                            rows: numRows,
                            columns: numColumns,
                        });
                    },
                },
            ];
            callback(items);
        },
    });
}

;// CONCATENATED MODULE: ./src/plugins/simpletable/index.js




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