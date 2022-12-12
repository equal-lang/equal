/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jsonfn/jsonfn.js":
/*!***************************************!*\
  !*** ./node_modules/jsonfn/jsonfn.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/**\n* JSONfn - javascript plugin to convert javascript objects, ( including ones with functions ) \n* to string and vise versa.\n*  \n* Version - 0.31.0\n* Copyright (c) 2012 Vadim Kiryukhin\n* vkiryukhin @ gmail.com\n* http://www.eslinstructor.net/jsonfn/\n* \n* Dual licensed under the MIT and GPL licenses:\n*   http://www.opensource.org/licenses/mit-license.php\n*   http://www.gnu.org/licenses/gpl.html\n*\n*   USAGE:\n* \n*   require('jsonfn').JSONfn.stringify(obj);\n*\trequire('jsonfn').JSONfn.parse(str);\n*\n*        @obj   -  javascript object;\n*\t\t @strfn -  String in JSON format; \n*\n*   Examples:\n*\t\t\n*   var strfn = require('jsonfn').JSONfn.stringify(obj);\n*\tvar objfn = require('jsonfn').JSONfn.parse(strfn);\n*\n*/\n\n// Create a JSON object only if it does not already exist. \nvar JSONfn;\nif (!JSONfn) {\n    JSONfn = {};\n}\n\n(function () {\n\t\n\tJSONfn.stringify = function(obj) {\n\t\treturn JSON.stringify(obj,function(key, value){\n\t\t\t\treturn (typeof value === 'function' ) ? value.toString() : value;\n\t\t\t});\n\t}\n\n\tJSONfn.parse = function(str) {\n\t\treturn JSON.parse(str,function(key, value){\n\t\t\tif(typeof value != 'string') return value;\n\t\t\treturn ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;\n\t\t});\n\t}\n}());\n\nexports.JSONfn = JSONfn;\t\n\n\n//# sourceURL=webpack://equal/./node_modules/jsonfn/jsonfn.js?");

/***/ }),

/***/ "./src/equal-paper/run-equal.js":
/*!**************************************!*\
  !*** ./src/equal-paper/run-equal.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jsonfn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonfn */ \"./node_modules/jsonfn/jsonfn.js\");\n\r\n\r\nfunction runEqual(source, verbose=false) {\r\n  console.log(equal)\r\n  // check object\r\n  if (self.equal) {\r\n    new self.equal.Equal({\r\n      source: source,\r\n      mode: (verbose ? \"VERBOSE\": \"NORMAL\")\r\n    }).run();\r\n\r\n  } else {\r\n    throw new Error(\"No interpreter object found\");\r\n  }\r\n\r\n}\r\n\r\nonmessage = (e) => {\r\n  const data = e[\"data\"];\r\n  // finish setting up object\r\n  if (data[\"equal\"]) self.equal = jsonfn__WEBPACK_IMPORTED_MODULE_0__.JSONfn.parse((data[\"equal\"]));\r\n  if (data[\"source\"]) {\r\n    runEqual(data[\"source\"], data[\"verbose\"]);\r\n  }\r\n}\n\n//# sourceURL=webpack://equal/./src/equal-paper/run-equal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/equal-paper/run-equal.js");
/******/ 	
/******/ })()
;