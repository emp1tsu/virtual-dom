/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.ts");

class App {
    constructor(params) {
        this.el = typeof params.el === 'string'
            ? document.querySelector(params.el)
            : params.el;
        this.view = params.view;
        this.state = params.state;
        this.actions = this.dispatchAction(params.actions);
        this.resolveNode();
    }
    /**
     * ActionにStateを渡し、新しい仮想DOMを作る
     */
    dispatchAction(actions) {
        const dispatched = {};
        for (let key in actions) {
            const action = actions[key];
            dispatched[key] = (state, ...data) => {
                const ret = action(state, ...data);
                this.resolveNode();
                return ret;
            };
        }
        return dispatched;
    }
    /**
     * 仮想DOMを再構築する
     */
    resolveNode() {
        this.newNode = this.view(this.state, this.actions);
        this.scheduleRender();
    }
    /**
     * レンダリングのスケジューリングを行う
     * （連続でActionが実行されたときに、などもDOMツリーを書き換えないため）
     */
    scheduleRender() {
        if (!this.skipRender) {
            this.skipRender = true;
            setTimeout(this.render.bind(this));
        }
    }
    /**
     * 描画処理
     */
    render() {
        if (this.oldNode) {
            Object(_view__WEBPACK_IMPORTED_MODULE_0__["updateElement"])(this.el, this.oldNode, this.newNode);
        }
        else {
            this.el.appendChild(Object(_view__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.newNode));
        }
        this.oldNode = this.newNode;
        this.skipRender = false;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/app.ts");


const state = {
    tasks: ['洗濯', '掃除'],
    form: {
        input: '',
        hasError: false
    }
};
const actions = {
    validate: (state, input) => {
        if (!input || input.length < 3 || input.length > 20) {
            state.form.hasError = true;
        }
        else {
            state.form.hasError = false;
        }
        return !state.form.hasError;
    },
    addTask: (state, title) => {
        state.tasks.push(title);
        state.form.input = '';
    },
    removeTask: (state, index) => {
        state.tasks.splice(index, 1);
    }
};
const view = (state, actions) => {
    return Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', { style: 'padding: 20px;' }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])('h1', { class: 'title' }, 'TODOアプリ'), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', { class: 'field' }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])('label', { class: 'label' }, 'タスクタイトル'), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])('input', {
        type: 'text',
        class: 'input',
        style: 'width: 20px;',
        value: state.form.input,
        oninput: (evt) => {
            const target = evt.target;
            state.form.input = target.value;
            actions.validate(state, state.form.input);
        }
    }), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        type: "button",
        class: "button is-primary",
        style: "margin-left: 10px;",
        onclick: () => {
            if (actions.validate(state, state.form.input)) {
                actions.addTask(state, state.form.input);
            }
        }
    }, "create"), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        class: "notification",
        style: `display: ${state.form.hasError ? "display" : "none"}`
    }, "3〜20文字で入力してください")), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("ul", { class: "panel" }, ...state.tasks.map((task, i) => {
        return Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("li", { class: "panel-block" }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
            type: "button",
            class: "delete",
            style: "margin-right: 10px;",
            onclick: () => actions.removeTask(state, i)
        }, "remove"), task);
    })));
};
new _app__WEBPACK_IMPORTED_MODULE_1__["App"]({ el: '#app', state, view, actions });


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! exports provided: h, createElement, updateElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateElement", function() { return updateElement; });
function isVNode(node) {
    return typeof node !== 'string' && typeof node !== 'number';
}
/**
 * 仮想DOMを生成
 */
function h(nodeName, attributes, ...children) {
    return {
        nodeName,
        attributes,
        children
    };
}
/**
 * リアルDOMを生成
 */
function createElement(node) {
    if (!isVNode(node)) {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.nodeName);
    setAttributes(el, node.attributes);
    node.children.forEach(child => el.appendChild(createElement(child)));
    return el;
}
/**
 * targetに属性をセット
 */
function setAttributes(target, attrs) {
    for (let attr in attrs) {
        if (isEventAttr(attr)) {
            const eventName = attr.slice(2);
            target.addEventListener(eventName, attrs[attr]);
        }
        else {
            target.setAttribute(attr, attrs[attr]);
        }
    }
}
function isEventAttr(attr) {
    return /^on/.test(attr);
}
var ChangedType;
(function (ChangedType) {
    /** 差分なし */
    ChangedType[ChangedType["None"] = 0] = "None";
    /** Nodeの型が違う */
    ChangedType[ChangedType["Type"] = 1] = "Type";
    /** テキストノードが違う */
    ChangedType[ChangedType["Text"] = 2] = "Text";
    /** タグ名が違う */
    ChangedType[ChangedType["Node"] = 3] = "Node";
    /** inputのvalueが違う */
    ChangedType[ChangedType["Value"] = 4] = "Value";
    /** 属性が違う */
    ChangedType[ChangedType["Attr"] = 5] = "Attr";
})(ChangedType || (ChangedType = {}));
/**
 * 2つの仮想DOMの差分を検知する
 */
function hasChanged(a, b) {
    // different type
    if (typeof a !== typeof b)
        return ChangedType.Type;
    // different string
    if (!isVNode(a) && a !== b)
        return ChangedType.Text;
    if (isVNode(a) && isVNode(b)) {
        // different node
        if (a.nodeName !== b.nodeName)
            return ChangedType.Node;
        // different value
        if (a.attributes.value !== b.attributes.value)
            return ChangedType.Value;
        // different attribute
        if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes))
            return ChangedType.Attr;
    }
    return ChangedType.None;
}
/**
 * 差分を検知し、リアルDOMに反映する
 */
function updateElement(parent, oldNode, newNode, index = 0) {
    // oldNodeがない場合はnewNodeを描画
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
    }
    const target = parent.childNodes[index];
    // newNodeがない場合はそのノードを削除
    if (!newNode) {
        parent.removeChild(target);
        return;
    }
    // oldNode, newNodeどちらもある場合は差分検知し、パッチ処理を行う
    const changeType = hasChanged(oldNode, newNode);
    switch (changeType) {
        case ChangedType.Type:
        case ChangedType.Text:
        case ChangedType.Node:
            parent.replaceChild(createElement(newNode), target);
            return;
        case ChangedType.Value:
            updateValue(target, newNode.attributes.value);
            return;
        case ChangedType.Attr:
            updateAttributes(target, oldNode.attributes, newNode.attributes);
            return;
    }
    // 再帰的にupdateElementを呼び出し、childrenの更新処理を行う
    if (isVNode(oldNode) && isVNode(newNode)) {
        for (let i = 0; i < newNode.children.length || oldNode.children.length; i++) {
            updateElement(target, oldNode.children[i], newNode.children[i], i);
        }
    }
}
/**
 * 属性を更新する
 * NodeをReplaceする必要はない
 */
function updateAttributes(target, oldAttrs, newAttrs) {
    // remove attrs
    for (let attr in oldAttrs) {
        if (!isEventAttr(attr)) {
            target.removeAttribute(attr);
        }
    }
    // set attrs
    for (let attr in newAttrs) {
        if (!isEventAttr(attr)) {
            target.setAttribute(attr, newAttrs[attr]);
        }
    }
}
function updateValue(target, newValue) {
    target.value = newValue;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7QUFBa0U7QUFhM0QsTUFBTSxHQUFHO0lBU2QsWUFBWSxNQUFzQztRQUNoRCxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRO1lBQ3JDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBRWIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSTtRQUN2QixJQUFJLENB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RUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xGO0tBQ0Y7QUFDSCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFtQixFQUFFLFFBQW9CLEVBQUUsUUFBb0I7SUFDdkYsZUFBZTtJQUNmLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7U0FDN0I7S0FDRjtJQUNELFlBQVk7SUFDWixLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRTtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQVcsQ0FBQztTQUNwRDtLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE1BQXdCLEVBQUUsUUFBZ0I7SUFDN0QsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRO0FBQ3pCLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8vIGFjdGlvbuOBp3N0b3Jl44GM5pu05paw44GV44KM44Gf44KJdmlld+OBruabtOaWsOWHpueQhuOCkuWun+ihjOOBmeOCi1xuaW1wb3J0IHsgQWN0aW9uVHJlZSB9IGZyb20gJy4vYWN0aW9uJ1xuaW1wb3J0IHsgVmlldywgVk5vZGUsIGNyZWF0ZUVsZW1lbnQsIHVwZGF0ZUVsZW1lbnQgfSBmcm9tICcuL3ZpZXcnXG5cbmludGVyZmFjZSBBcHBDb25zdHJ1Y3RvcjxTdGF0ZSwgQWN0aW9ucz4ge1xuICAvKiog6Kaq44OO44O844OJICovXG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZ1xuICAvKiogVmlld+OBruWumue+qSAqL1xuICB2aWV3OiBWaWV3PFN0YXRlLCBBY3Rpb25UcmVlPFN0YXRlPj5cbiAgLyoqIOeKtuaFi+euoeeQhiAqL1xuICBzdGF0ZTogU3RhdGVcbiAgLyoqIEFjdGlvbuOBruWumue+qSAqL1xuICBhY3Rpb25zOiBBY3Rpb25UcmVlPFN0YXRlPlxufVxuXG5leHBvcnQgY2xhc3MgQXBwPFN0YXRlLCBBY3Rpb25zPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWw6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlldzogVmlldzxTdGF0ZSwgQWN0aW9uVHJlZTxTdGF0ZT4+XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGU6IFN0YXRlXG4gIHByaXZhdGUgcmVhZG9ubHkgYWN0aW9uczogQWN0aW9uVHJlZTxTdGF0ZT5cbiAgcHJpdmF0ZSBvbGROb2RlOiBWTm9kZVxuICBwcml2YXRlIG5ld05vZGU6IFZOb2RlXG4gIHByaXZhdGUgc2tpcFJlbmRlcjogYm9vbGVhblxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQXBwQ29uc3RydWN0b3I8U3RhdGUsIEFjdGlvbnM+KSB7XG4gICAgdGhpcy5lbCA9IHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKVxuICAgICAgOiBwYXJhbXMuZWxcblxuICAgIHRoaXMudmlldyA9IHBhcmFtcy52aWV3XG4gICAgdGhpcy5zdGF0ZSA9IHBhcmFtcy5zdGF0ZVxuICAgIHRoaXMuYWN0aW9ucyA9IHRoaXMuZGlzcGF0Y2hBY3Rpb24ocGFyYW1zLmFjdGlvbnMpXG4gICAgdGhpcy5yZXNvbHZlTm9kZSgpXG4gIH1cblxuICAvKipcbiAgICogQWN0aW9u44GrU3RhdGXjgpLmuKHjgZfjgIHmlrDjgZfjgYTku67mg7NET03jgpLkvZzjgotcbiAgICovXG4gIHByaXZhdGUgZGlzcGF0Y2hBY3Rpb24oYWN0aW9uczogQWN0aW9uVHJlZTxTdGF0ZT4pIHtcbiAgICBjb25zdCBkaXNwYXRjaGVkID0ge30gYXMgQWN0aW9uVHJlZTxTdGF0ZT5cbiAgICBmb3IgKGxldCBrZXkgaW4gYWN0aW9ucykge1xuICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1trZXldXG4gICAgICBkaXNwYXRjaGVkW2tleV0gPSAoc3RhdGU6IFN0YXRlLCAuLi5kYXRhOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYWN0aW9uKHN0YXRlLCAuLi5kYXRhKVxuICAgICAgICB0aGlzLnJlc29sdmVOb2RlKClcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpc3BhdGNoZWRcbiAgfVxuXG4gIC8qKlxuICAgKiDku67mg7NET03jgpLlho3mp4vnr4njgZnjgotcbiAgICovXG4gIHByaXZhdGUgcmVzb2x2ZU5vZGUoKSB7XG4gICAgdGhpcy5uZXdOb2RlID0gdGhpcy52aWV3KHRoaXMuc3RhdGUsIHRoaXMuYWN0aW9ucylcbiAgICB0aGlzLnNjaGVkdWxlUmVuZGVyKClcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6zjg7Pjg4Djg6rjg7PjgrDjga7jgrnjgrHjgrjjg6Xjg7zjg6rjg7PjgrDjgpLooYzjgYZcbiAgICog77yI6YCj57aa44GnQWN0aW9u44GM5a6f6KGM44GV44KM44Gf44Go44GN44Gr44CB44Gq44Gp44KCRE9N44OE44Oq44O844KS5pu444GN5o+b44GI44Gq44GE44Gf44KB77yJXG4gICAqL1xuICBwcml2YXRlIHNjaGVkdWxlUmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5za2lwUmVuZGVyKSB7XG4gICAgICB0aGlzLnNraXBSZW5kZXIgPSB0cnVlXG4gICAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcykpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOaPj+eUu+WHpueQhlxuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2xkTm9kZSkge1xuICAgICAgdXBkYXRlRWxlbWVudCh0aGlzLmVsLCB0aGlzLm9sZE5vZGUsIHRoaXMubmV3Tm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubmV3Tm9kZSkpXG4gICAgfVxuXG4gICAgdGhpcy5vbGROb2RlID0gdGhpcy5uZXdOb2RlXG4gICAgdGhpcy5za2lwUmVuZGVyID0gZmFsc2VcbiAgfVxufSIsImltcG9ydCB7IFZpZXcsIGggfSBmcm9tICcuL3ZpZXcnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL2FwcCdcbmltcG9ydCB7IEFjdGlvblRyZWUgfSBmcm9tICcuL2FjdGlvbidcblxudHlwZSBTdGF0ZSA9IHR5cGVvZiBzdGF0ZVxudHlwZSBBY3Rpb25zID0gdHlwZW9mIGFjdGlvbnNcblxuY29uc3Qgc3RhdGUgPSB7XG4gIHRhc2tzOiBbJ+a0l+a/rycsICfmjoPpmaQnXSxcbiAgZm9ybToge1xuICAgIGlucHV0OiAnJyxcbiAgICBoYXNFcnJvcjogZmFsc2VcbiAgfVxufVxuXG5jb25zdCBhY3Rpb25zOiBBY3Rpb25UcmVlPFN0YXRlPiA9IHtcbiAgdmFsaWRhdGU6IChzdGF0ZSwgaW5wdXQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoIDwgMyB8fCBpbnB1dC5sZW5ndGggPiAyMCkge1xuICAgICAgc3RhdGUuZm9ybS5oYXNFcnJvciA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuZm9ybS5oYXNFcnJvciA9IGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuICFzdGF0ZS5mb3JtLmhhc0Vycm9yXG4gIH0sXG4gIGFkZFRhc2s6IChzdGF0ZSwgdGl0bGU6IHN0cmluZykgPT4ge1xuICAgIHN0YXRlLnRhc2tzLnB1c2godGl0bGUpXG4gICAgc3RhdGUuZm9ybS5pbnB1dCA9ICcnXG4gIH0sXG4gIHJlbW92ZVRhc2s6IChzdGF0ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIHN0YXRlLnRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgfVxufVxuXG5jb25zdCB2aWV3OiBWaWV3PFN0YXRlLCBBY3Rpb25zPiA9IChzdGF0ZSwgYWN0aW9ucykgPT4ge1xuICByZXR1cm4gaCAoXG4gICAgJ2RpdicsXG4gICAgeyBzdHlsZTogJ3BhZGRpbmc6IDIwcHg7J30sXG4gICAgaCgnaDEnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdUT0RP44Ki44OX44OqJyksXG4gICAgaChcbiAgICAgICdkaXYnLFxuICAgICAgeyBjbGFzczogJ2ZpZWxkJyB9LFxuICAgICAgaCgnbGFiZWwnLCB7IGNsYXNzOiAnbGFiZWwnfSwgJ+OCv+OCueOCr+OCv+OCpOODiOODqycpLFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgY2xhc3M6ICdpbnB1dCcsXG4gICAgICAgIHN0eWxlOiAnd2lkdGg6IDIwcHg7JyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLmZvcm0uaW5wdXQsXG4gICAgICAgIG9uaW5wdXQ6IChldnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgICAgc3RhdGUuZm9ybS5pbnB1dCA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICBhY3Rpb25zLnZhbGlkYXRlKHN0YXRlLCBzdGF0ZS5mb3JtLmlucHV0KVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGgoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgIGNsYXNzOiBcImJ1dHRvbiBpcy1wcmltYXJ5XCIsXG4gICAgICAgICAgc3R5bGU6IFwibWFyZ2luLWxlZnQ6IDEwcHg7XCIsXG4gICAgICAgICAgb25jbGljazogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFjdGlvbnMudmFsaWRhdGUoc3RhdGUsIHN0YXRlLmZvcm0uaW5wdXQpKSB7XG4gICAgICAgICAgICAgIGFjdGlvbnMuYWRkVGFzayhzdGF0ZSwgc3RhdGUuZm9ybS5pbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNyZWF0ZVwiXG4gICAgICApLFxuICAgICAgaChcbiAgICAgICAgXCJwXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICBzdHlsZTogYGRpc3BsYXk6ICR7c3RhdGUuZm9ybS5oYXNFcnJvciA/IFwiZGlzcGxheVwiIDogXCJub25lXCJ9YFxuICAgICAgICB9LFxuICAgICAgICBcIjPjgJwyMOaWh+Wtl+OBp+WFpeWKm+OBl+OBpuOBj+OBoOOBleOBhFwiXG4gICAgICApXG4gICAgKSxcbiAgICBoKFxuICAgICAgXCJ1bFwiLFxuICAgICAgeyBjbGFzczogXCJwYW5lbFwiIH0sXG4gICAgICAuLi5zdGF0ZS50YXNrcy5tYXAoKHRhc2ssIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoXG4gICAgICAgICAgXCJsaVwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwicGFuZWwtYmxvY2tcIiB9LFxuICAgICAgICAgIGgoXG4gICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICBjbGFzczogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgc3R5bGU6IFwibWFyZ2luLXJpZ2h0OiAxMHB4O1wiLFxuICAgICAgICAgICAgICBvbmNsaWNrOiAoKSA9PiBhY3Rpb25zLnJlbW92ZVRhc2soc3RhdGUsIGkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIlxuICAgICAgICAgICksXG4gICAgICAgICAgdGFza1xuICAgICAgICApO1xuICAgICAgfSlcbiAgICApXG4gIClcbn1cblxubmV3IEFwcDxTdGF0ZSwgQWN0aW9ucz4oe2VsOiAnI2FwcCcsIHN0YXRlLCB2aWV3LCBhY3Rpb25zfSkiLCJ0eXBlIE5vZGVUeXBlID0gVk5vZGUgfCBzdHJpbmcgfCBudW1iZXJcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgRnVuY3Rpb24gfVxuXG4vKipcbiAqIOS7ruaDs0RPTVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZOb2RlIHtcbiAgbm9kZU5hbWU6IGtleW9mIEVsZW1lbnRUYWdOYW1lTWFwXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXNcbiAgY2hpbGRyZW46IE5vZGVUeXBlW11cbn1cblxuZnVuY3Rpb24gaXNWTm9kZShub2RlOiBOb2RlVHlwZSk6IG5vZGUgaXMgVk5vZGUge1xuICByZXR1cm4gdHlwZW9mIG5vZGUgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBub2RlICE9PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIOS7ruaDs0RPTeOCkueUn+aIkFxuICovXG5leHBvcnQgZnVuY3Rpb24gaChcbiAgbm9kZU5hbWU6IGtleW9mIEVsZW1lbnRUYWdOYW1lTWFwLFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzLFxuICAuLi5jaGlsZHJlbjogTm9kZVR5cGVbXVxuKTogVk5vZGUge1xuICByZXR1cm4ge1xuICAgIG5vZGVOYW1lLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgY2hpbGRyZW5cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXc8U3RhdGUsIEFjdGlvbnM+IHtcbiAgKHN0YXRlOiBTdGF0ZSwgYWN0aW9uczogQWN0aW9ucyk6IFZOb2RlXG59XG5cbi8qKlxuICog44Oq44Ki44OrRE9N44KS55Sf5oiQXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGU6IE5vZGVUeXBlKTogSFRNTEVsZW1lbnQgfCBUZXh0IHtcbiAgaWYgKCFpc1ZOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5ub2RlTmFtZSlcbiAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKVxuICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChjaGlsZCkpKVxuICBcbiAgcmV0dXJuIGVsO1xufVxuXG4vKiogXG4gKiB0YXJnZXTjgavlsZ7mgKfjgpLjgrvjg4Pjg4hcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQ6IEhUTUxFbGVtZW50LCBhdHRyczogQXR0cmlidXRlcyk6IHZvaWQge1xuICBmb3IgKGxldCBhdHRyIGluIGF0dHJzKSB7XG4gICAgaWYgKGlzRXZlbnRBdHRyKGF0dHIpKSB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLnNsaWNlKDIpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGF0dHJzW2F0dHJdIGFzIEV2ZW50TGlzdGVuZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0gYXMgc3RyaW5nKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0V2ZW50QXR0cihhdHRyOiBzdHJpbmcpOiBCb29sZWFuIHtcbiAgcmV0dXJuIC9eb24vLnRlc3QoYXR0cilcbn1cblxuZW51bSBDaGFuZ2VkVHlwZSB7XG4gIC8qKiDlt67liIbjgarjgZcgKi9cbiAgTm9uZSxcbiAgLyoqIE5vZGXjga7lnovjgYzpgZXjgYYgKi9cbiAgVHlwZSxcbiAgLyoqIOODhuOCreOCueODiOODjuODvOODieOBjOmBleOBhiAqL1xuICBUZXh0LFxuICAvKiog44K/44Kw5ZCN44GM6YGV44GGICovXG4gIE5vZGUsXG4gIC8qKiBpbnB1dOOBrnZhbHVl44GM6YGV44GGICovXG4gIFZhbHVlLFxuICAvKiog5bGe5oCn44GM6YGV44GGICovXG4gIEF0dHJcbn1cblxuLyoqXG4gKiAy44Gk44Gu5Luu5oOzRE9N44Gu5beu5YiG44KS5qSc55+l44GZ44KLXG4gKi9cbmZ1bmN0aW9uIGhhc0NoYW5nZWQoYTogTm9kZVR5cGUsIGI6IE5vZGVUeXBlKTogQ2hhbmdlZFR5cGUge1xuICAvLyBkaWZmZXJlbnQgdHlwZVxuICBpZiAodHlwZW9mIGEgIT09IHR5cGVvZiBiKSByZXR1cm4gQ2hhbmdlZFR5cGUuVHlwZVxuXG4gIC8vIGRpZmZlcmVudCBzdHJpbmdcbiAgaWYgKCFpc1ZOb2RlKGEpICYmIGEgIT09IGIpIHJldHVybiBDaGFuZ2VkVHlwZS5UZXh0XG5cbiAgaWYgKGlzVk5vZGUoYSkgJiYgaXNWTm9kZShiKSkge1xuICAgIC8vIGRpZmZlcmVudCBub2RlXG4gICAgaWYgKGEubm9kZU5hbWUgIT09IGIubm9kZU5hbWUpIHJldHVybiBDaGFuZ2VkVHlwZS5Ob2RlXG5cbiAgICAvLyBkaWZmZXJlbnQgdmFsdWVcbiAgICBpZiAoYS5hdHRyaWJ1dGVzLnZhbHVlICE9PSBiLmF0dHJpYnV0ZXMudmFsdWUpIHJldHVybiBDaGFuZ2VkVHlwZS5WYWx1ZVxuXG4gICAgLy8gZGlmZmVyZW50IGF0dHJpYnV0ZVxuICAgIGlmIChKU09OLnN0cmluZ2lmeShhLmF0dHJpYnV0ZXMpICE9PSBKU09OLnN0cmluZ2lmeShiLmF0dHJpYnV0ZXMpKSByZXR1cm4gQ2hhbmdlZFR5cGUuQXR0clxuICB9XG5cbiAgcmV0dXJuIENoYW5nZWRUeXBlLk5vbmVcbn1cblxuLyoqXG4gKiDlt67liIbjgpLmpJznn6XjgZfjgIHjg6rjgqLjg6tET03jgavlj43mmKDjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQocGFyZW50OiBIVE1MRWxlbWVudCwgb2xkTm9kZTogTm9kZVR5cGUsIG5ld05vZGU6IE5vZGVUeXBlLCBpbmRleCA9IDApOiB2b2lkIHtcbiAgLy8gb2xkTm9kZeOBjOOBquOBhOWgtOWQiOOBr25ld05vZGXjgpLmj4/nlLtcbiAgaWYgKCFvbGROb2RlKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSkpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF1cblxuICAvLyBuZXdOb2Rl44GM44Gq44GE5aC05ZCI44Gv44Gd44Gu44OO44O844OJ44KS5YmK6ZmkXG4gIGlmICghbmV3Tm9kZSkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0YXJnZXQpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBvbGROb2RlLCBuZXdOb2Rl44Gp44Gh44KJ44KC44GC44KL5aC05ZCI44Gv5beu5YiG5qSc55+l44GX44CB44OR44OD44OB5Yem55CG44KS6KGM44GGXG4gIGNvbnN0IGNoYW5nZVR5cGUgPSBoYXNDaGFuZ2VkKG9sZE5vZGUsIG5ld05vZGUpXG4gIHN3aXRjaCAoY2hhbmdlVHlwZSkge1xuICAgIGNhc2UgQ2hhbmdlZFR5cGUuVHlwZTpcbiAgICBjYXNlIENoYW5nZWRUeXBlLlRleHQ6XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5Ob2RlOlxuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChjcmVhdGVFbGVtZW50KG5ld05vZGUpLCB0YXJnZXQpXG4gICAgICByZXR1cm5cbiAgICBjYXNlIENoYW5nZWRUeXBlLlZhbHVlOlxuICAgICAgdXBkYXRlVmFsdWUodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQsIChuZXdOb2RlIGFzIFZOb2RlKS5hdHRyaWJ1dGVzLnZhbHVlIGFzIHN0cmluZyk7XG4gICAgICByZXR1cm5cbiAgICBjYXNlIENoYW5nZWRUeXBlLkF0dHI6XG4gICAgICB1cGRhdGVBdHRyaWJ1dGVzKFxuICAgICAgICB0YXJnZXQgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgIChvbGROb2RlIGFzIFZOb2RlKS5hdHRyaWJ1dGVzLFxuICAgICAgICAobmV3Tm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlcylcbiAgICAgIHJldHVyblxuICB9XG5cbiAgLy8g5YaN5biw55qE44GrdXBkYXRlRWxlbWVudOOCkuWRvOOBs+WHuuOBl+OAgWNoaWxkcmVu44Gu5pu05paw5Yem55CG44KS6KGM44GGXG4gIGlmIChpc1ZOb2RlKG9sZE5vZGUpICYmIGlzVk5vZGUobmV3Tm9kZSkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoIHx8IG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHVwZGF0ZUVsZW1lbnQodGFyZ2V0IGFzIEhUTUxFbGVtZW50LCBvbGROb2RlLmNoaWxkcmVuW2ldLCBuZXdOb2RlLmNoaWxkcmVuW2ldLCBpKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIOWxnuaAp+OCkuabtOaWsOOBmeOCi1xuICogTm9kZeOCklJlcGxhY2XjgZnjgovlv4XopoHjga/jgarjgYRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlcyh0YXJnZXQ6IEhUTUxFbGVtZW50LCBvbGRBdHRyczogQXR0cmlidXRlcywgbmV3QXR0cnM6IEF0dHJpYnV0ZXMpOiB2b2lkIHtcbiAgLy8gcmVtb3ZlIGF0dHJzXG4gIGZvciAobGV0IGF0dHIgaW4gb2xkQXR0cnMpIHtcbiAgICBpZiAoIWlzRXZlbnRBdHRyKGF0dHIpKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHIpXG4gICAgfVxuICB9XG4gIC8vIHNldCBhdHRyc1xuICBmb3IgKGxldCBhdHRyIGluIG5ld0F0dHJzKSB7XG4gICAgaWYgKCFpc0V2ZW50QXR0cihhdHRyKSkge1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdBdHRyc1thdHRyXSBhcyBzdHJpbmcpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZhbHVlKHRhcmdldDogSFRNTElucHV0RWxlbWVudCwgbmV3VmFsdWU6IHN0cmluZykge1xuICB0YXJnZXQudmFsdWUgPSBuZXdWYWx1ZVxufSJdLCJzb3VyY2VSb290IjoiIn0=