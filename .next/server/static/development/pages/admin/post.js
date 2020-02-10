module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DropDownWidget/DropDownWidget */ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActionOnPost.scss */ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.scss");
/* harmony import */ var _ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-fontawesome */ "react-fontawesome");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const ActionOnPost = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  const onSaveHandler = () => {
    console.log(props);

    if (contextData.editingPostData._id) {
      contextData.functions.updatePost(contextData.editingPostData);
    } else {
      contextData.functions.savePosts(contextData.editingPostData);
    }
  };

  return __jsx("div", {
    className: "ActionOnPost"
  }, __jsx("div", {
    className: "ActionOnPostItem"
  }, __jsx("button", {
    className: "saveDraftBtn"
  }, "Save Draft"), __jsx("button", {
    className: "previewBtn"
  }, "Preview")), __jsx("div", {
    className: "ActionOnPostItem"
  }, __jsx("p", null, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "key"
  }), " Status:", contextData.editingPostData.status), __jsx("select", {
    defaultValue: contextData.editingPostData.status ? contextData.editingPostData.status : 'draft'
  }, __jsx("option", {
    value: contextData.editingPostData.status
  }, contextData.editingPostData.status), __jsx("option", {
    value: "Published"
  }, "Published"), __jsx("option", {
    value: "Draft"
  }, "Draft"), __jsx("option", {
    value: "Trash"
  }, "Trash"))), __jsx("div", {
    className: "ActionOnPostItem"
  }, __jsx("button", {
    className: "SaveBtn",
    onClick: () => onSaveHandler()
  }, "Save")));
};

ActionOnPost.getInitialProps = async ({
  query
}) => {
  return {
    query
  };
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5___default()(ActionOnPost));

/***/ }),

/***/ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.scss":
/*!********************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js":
/*!**********************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DropDownWidget_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropDownWidget.scss */ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.scss");
/* harmony import */ var _DropDownWidget_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DropDownWidget_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fontawesome */ "react-fontawesome");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const DropDownWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    open: true,
    icon: 'sort-up'
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    state.open ? setState(_objectSpread({}, state, {
      icon: 'sort-up'
    })) : setState(_objectSpread({}, state, {
      icon: 'sort-down'
    }));
  }, [state.open]);

  const openCloseHandler = () => {
    state.open ? setState(_objectSpread({}, state, {
      open: false
    })) : setState(_objectSpread({}, state, {
      open: true
    }));
  };

  const RenderTheComponent = () => {
    if (state.open) {
      return __jsx(props.component, props);
    } else return null;
  };

  return __jsx("div", {
    className: "DropDownWidget"
  }, __jsx("div", {
    className: "DropDownWidgetHead"
  }, __jsx("p", {
    className: "DropDownWidgetHeadTitle"
  }, props.title), __jsx("button", {
    className: "DropDownWidgetHeadOpenCloseBtn",
    onClick: () => openCloseHandler()
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "fontawesomeMedium",
    name: state.icon
  }))), __jsx("div", {
    className: "DropDownWidgetComponent"
  }, __jsx(RenderTheComponent, null)));
};

/* harmony default export */ __webpack_exports__["default"] = (DropDownWidget);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.scss":
/*!************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/Format/Format.js":
/*!******************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/Format/Format.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _Format_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Format.scss */ "./components/adminIncludes/PostComponents/Format/Format.scss");
/* harmony import */ var _Format_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Format_scss__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Format = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  return __jsx("div", {
    className: "Format"
  }, __jsx("select", {
    defaultValue: contextData.editingPostData.postType ? contextData.editingPostData.postType : 'standard',
    name: "format",
    onChange: e => props.onChangeHandler(e)
  }, __jsx("option", {
    value: "standard"
  }, "Standard"), __jsx("option", {
    value: "video"
  }, "Video")));
};

Format.getInitialProps = ({
  req
}) => {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Format);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/Format/Format.scss":
/*!********************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/Format/Format.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.js":
/*!******************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fontawesome */ "react-fontawesome");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PostCategoriesTagsActors_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostCategoriesTagsActors.scss */ "./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.scss");
/* harmony import */ var _PostCategoriesTagsActors_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_PostCategoriesTagsActors_scss__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const PostCategoriesTagsActors = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: items,
    1: setItems
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  let newItemsElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  const deleteItem = e => {
    contextData.dispatchEditingPostData(_objectSpread({}, contextData.editingPostData, {
      [props.type]: contextData.editingPostData[props.type].filter(i => {
        return i !== e.currentTarget.name;
      })
    }));
  };

  const addNewItem = () => {
    console.log(newItemsElement.current.value.includes(','));

    if (newItemsElement.current.value.includes(',')) {
      let newItems = newItemsElement.current.value.split(',');
      contextData.dispatchEditingPostData(editingPostData => _objectSpread({}, editingPostData, {
        [props.type]: [...contextData.editingPostData[props.type], ...newItems]
      }));
    } else {
      // let newItems = contextData.editingPostData[props.type].push(newItemsElement.current.value);
      //     newItems = [...contextData.editingPostData[props.type],newItemsElement.current.value];
      // console.log( contextData.editingPostData[props.type],newItems)
      contextData.dispatchEditingPostData(_objectSpread({}, contextData.editingPostData, {
        [props.type]: [...contextData.editingPostData[props.type], newItemsElement.current.value]
      }));
    }
  };

  const addedItems = contextData.editingPostData[props.type].map(item => {
    let icon = props.type === 'tags' ? 'tags' : props.type === 'actors' ? 'star' : props.type === 'categories' ? 'folder' : '';
    return __jsx("div", {
      key: item,
      className: "item"
    }, __jsx("p", null, item), __jsx("button", {
      name: item,
      onClick: e => deleteItem(e)
    }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: "fontawesomeMedium",
      name: "times"
    })));
  });
  return __jsx("div", {
    className: "PostCategoriesTagsActors"
  }, __jsx("div", {
    className: "addNewTag"
  }, __jsx("input", {
    ref: newItemsElement,
    type: "text"
  }), __jsx("button", {
    onClick: () => addNewItem()
  }, " Add")), __jsx("span", null, "Separate tags with commas"), __jsx("div", {
    className: "items"
  }, addedItems));
};

/* harmony default export */ __webpack_exports__["default"] = (PostCategoriesTagsActors);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.scss":
/*!********************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.js":
/*!**************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TitleDescription_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TitleDescription.scss */ "./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.scss");
/* harmony import */ var _TitleDescription_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TitleDescription_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const TitleDescription = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});

  const onloadHandler = e => {
    e.target.value = contextData.editingPostData[e.target.name];
  };

  return __jsx("div", {
    className: "TitleDescription"
  }, __jsx("input", {
    name: "title",
    value: contextData.editingPostData.title,
    className: "TitleDescriptionTitle",
    placeholder: "Enter The Title Here",
    onChange: e => {
      contextData.functions.setEditingPostData(e.target.name, e.target.value);
    }
  }), __jsx("textarea", {
    name: "description",
    value: contextData.editingPostData.description,
    className: "TitleDescriptionDescription",
    onChange: e => {
      contextData.functions.setEditingPostData(e.target.name, e.target.value);
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (TitleDescription);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.scss":
/*!****************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/Duration/Duration.js":
/*!***************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/Duration/Duration.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Duration = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const hour = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const minute = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const second = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  const onCalculateAndSetHandler = () => {
    // let value = (hour.current.value *3600) + (minute.current.value *60) + second.current.value;
    props.onDurationChangeHandler(hour.current.value * 3600 + minute.current.value * 60 + second.current.value);
  };

  return __jsx("div", {
    className: "Duration VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Duration")), __jsx("div", {
    className: "editor"
  }, __jsx("div", {
    className: "durationItems"
  }, __jsx("div", {
    className: "durationItem"
  }, __jsx("input", {
    ref: hour,
    name: "durationH",
    type: "number",
    min: "0",
    max: "10",
    onChange: () => onCalculateAndSetHandler()
  }), __jsx("label", null, "H")), __jsx("div", {
    className: "durationItem"
  }, __jsx("input", {
    ref: minute,
    name: "durationM",
    type: "number",
    min: "0",
    max: "60",
    onChange: () => onCalculateAndSetHandler()
  }), __jsx("label", null, "M")), __jsx("div", {
    className: "durationItem"
  }, __jsx("input", {
    ref: second,
    name: "durationS",
    type: "number",
    min: "0",
    max: "60",
    onChange: () => onCalculateAndSetHandler()
  }), __jsx("label", null, "S")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Duration);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/ImagePreview/ImagePreview.js":
/*!***********************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/ImagePreview/ImagePreview.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const ImagePreview = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  return __jsx("div", {
    className: "ImagePreview VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Image Preview")), __jsx("div", {
    className: "editor"
  }, __jsx("img", {
    src: contextData.editingPostData.mainThumbnail
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ImagePreview);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.js":
/*!*************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-switch */ "react-switch");
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_switch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _IsInSlideShow_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IsInSlideShow.scss */ "./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.scss");
/* harmony import */ var _IsInSlideShow_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_IsInSlideShow_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const IsInSlideShow = props => {
  return __jsx("div", {
    className: "IsInSlideShow VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Slide Show")), __jsx("div", {
    className: "editor "
  }, __jsx(react_switch__WEBPACK_IMPORTED_MODULE_1___default.a, {
    onChange: e => props.onChangeHandler(e),
    checked: props.isChecked
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (IsInSlideShow);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.scss":
/*!***************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/Quality/Quality.js":
/*!*************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/Quality/Quality.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const Quality = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    defaultValue: '240p'
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (contextData.editingPostData.quality) {
      setState(_objectSpread({}, state, {
        defaultValue: contextData.editingPostData.quality
      }));
    }
  }, [contextData.editingPostData.quality]);
  return __jsx("div", {
    className: "Quality VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Quality")), __jsx("div", {
    className: "editor"
  }, __jsx("div", {
    className: "option"
  }, __jsx("select", {
    name: "quality",
    value: state.defaultValue,
    onChange: e => props.onChangeHandler(e)
  }, __jsx("option", {
    value: "240p"
  }, "240p"), __jsx("option", {
    value: "360p"
  }, "360p"), __jsx("option", {
    value: "480p"
  }, "480p"), __jsx("option", {
    value: "720p"
  }, "720p"), __jsx("option", {
    value: "1080p"
  }, "1080p"), __jsx("option", {
    value: "1440p"
  }, "1440p"), __jsx("option", {
    value: "2060p"
  }, "2060p"), __jsx("option", {
    value: "4120p"
  }, "4120p")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Quality);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/RenderIframe/RenderIframe.js":
/*!***********************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/RenderIframe/RenderIframe.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const RenderIframe = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  if (contextData.editingPostData.videoEmbedCode) {
    return __jsx("div", {
      className: "VideoEmbedCode VideoInformationSection"
    }, __jsx("div", {
      className: "title"
    }, __jsx("p", null, "Video Iframe Preview")), __jsx("div", {
      className: "editor"
    }, __jsx("iframe", {
      src: contextData.editingPostData.videoEmbedCode
    })));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (RenderIframe);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/TextInput/TextInput.js":
/*!*****************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/TextInput/TextInput.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const TextInput = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  return __jsx("div", {
    className: "TextInput VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, props.name)), __jsx("div", {
    className: "editor"
  }, __jsx("input", {
    className: "TextInput",
    name: props.name,
    onBlur: e => {
      props.onChangeHandler(e);
      e.target.value = contextData.editingPostData[e.target.name];
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (TextInput);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/TextInputWithUploadBtn/TextInputWithUploadBtn.js":
/*!*******************************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/TextInputWithUploadBtn/TextInputWithUploadBtn.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const TextInputWithUploadBtn = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const element = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (element.current) {
      if (contextData.editingPostData[element.current.name]) {
        element.current.value = contextData.editingPostData[element.current.name];
      }
    }
  }, [contextData.editingPostData]);
  return __jsx("div", {
    className: "TextInputWithUploadBtn VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, props.name)), __jsx("div", {
    className: "editor"
  }, __jsx("input", {
    ref: element,
    className: "textInputWithUpload",
    name: props.name,
    onChange: e => props.onChangeHandler(e)
  }), __jsx("button", {
    className: "uploadBtn"
  }, "Upload")));
};

/* harmony default export */ __webpack_exports__["default"] = (TextInputWithUploadBtn); //     onChange={e=>{contextData.functions.setEditingPostData(e.target.name,e.target.value)}}

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.js":
/*!***************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoEmbedCode.scss */ "./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.scss");
/* harmony import */ var _VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const VideoEmbedCode = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const element = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (element.current) {
      if (contextData.editingPostData[element.current.name]) {
        element.current.value = contextData.editingPostData[element.current.name];
      }
    }
  }, [contextData.editingPostData]);
  return __jsx("div", {
    className: "VideoEmbedCode VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Video Embed Code")), __jsx("div", {
    className: "editor"
  }, __jsx("textarea", {
    ref: element,
    className: "textareaInput",
    name: props.name,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoEmbedCode);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.scss":
/*!*****************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.scss ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js":
/*!**************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _IsInSlideShow_IsInSlideShow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsInSlideShow/IsInSlideShow */ "./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.js");
/* harmony import */ var _Quality_Quality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Quality/Quality */ "./components/adminIncludes/PostComponents/VideoInformation/Quality/Quality.js");
/* harmony import */ var _VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VideoInformation.scss */ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.scss");
/* harmony import */ var _VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _VideoUrls_VideoUrls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoUrls/VideoUrls */ "./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.js");
/* harmony import */ var _VideoEmbedCode_VideoEmbedCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VideoEmbedCode/VideoEmbedCode */ "./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.js");
/* harmony import */ var _Duration_Duration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Duration/Duration */ "./components/adminIncludes/PostComponents/VideoInformation/Duration/Duration.js");
/* harmony import */ var _ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ViewsLikesDisLikes/ViewsLikesDisLikes */ "./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js");
/* harmony import */ var _TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TextInputWithUploadBtn/TextInputWithUploadBtn */ "./components/adminIncludes/PostComponents/VideoInformation/TextInputWithUploadBtn/TextInputWithUploadBtn.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _TextInput_TextInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TextInput/TextInput */ "./components/adminIncludes/PostComponents/VideoInformation/TextInput/TextInput.js");
/* harmony import */ var _RenderIframe_RenderIframe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./RenderIframe/RenderIframe */ "./components/adminIncludes/PostComponents/VideoInformation/RenderIframe/RenderIframe.js");
/* harmony import */ var _ImagePreview_ImagePreview__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ImagePreview/ImagePreview */ "./components/adminIncludes/PostComponents/VideoInformation/ImagePreview/ImagePreview.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const VideoInformation = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_9__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    inSlideShow: false
  }); // useEffect(() => {
  //     console.log(state)
  // }, [ state ]);

  const onSaveChanges = () => {
    contextData.dispatchEditingPostData(_objectSpread({}, contextData.editingPostData, {}, state));
  };

  const onchangeHandler = e => {
    setState(_objectSpread({}, state, {
      [e.target.name]: e.target.value
    }));
  };

  const onDurationChangeHandler = value => {
    setState(_objectSpread({}, state, {
      duration: value
    }));
  };

  const onIsInSlideShowChangeHandler = e => {
    setState(_objectSpread({}, state, {
      inSlideShow: e
    }));
  };

  if (contextData.editingPostData.postType === 'video') {
    return __jsx("div", {
      className: "VideoInformation"
    }, __jsx("div", {
      className: "saveBtn"
    }, __jsx("button", {
      className: "SaveVideoDataBtn",
      onClick: () => onSaveChanges()
    }, "Save Video Data")), __jsx(_IsInSlideShow_IsInSlideShow__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onChangeHandler: onIsInSlideShowChangeHandler,
      isChecked: state.inSlideShow
    }), __jsx(_Quality_Quality__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onChangeHandler: onchangeHandler
    }), __jsx(_TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_8__["default"], {
      name: "videoTrailerUrl",
      title: "Video Url",
      onChangeHandler: onchangeHandler
    }), __jsx(_VideoEmbedCode_VideoEmbedCode__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "videoEmbedCode",
      onChangeHandler: onchangeHandler
    }), __jsx(_RenderIframe_RenderIframe__WEBPACK_IMPORTED_MODULE_11__["default"], null), __jsx(_Duration_Duration__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onDurationChangeHandler: onDurationChangeHandler
    }), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
      name: 'views',
      onChangeHandler: onchangeHandler
    }), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
      name: 'likes',
      onChangeHandler: onchangeHandler
    }), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
      name: 'disLikes',
      onChangeHandler: onchangeHandler
    }), __jsx(_TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_8__["default"], {
      name: "VideoTrailerUrl",
      title: "Video Trailer Url",
      onChangeHandler: onchangeHandler
    }), __jsx(_TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_8__["default"], {
      name: "mainThumbnail",
      title: "Main thumbnail",
      onChangeHandler: onchangeHandler
    }), __jsx(_ImagePreview_ImagePreview__WEBPACK_IMPORTED_MODULE_12__["default"], null), __jsx(_TextInput_TextInput__WEBPACK_IMPORTED_MODULE_10__["default"], {
      name: "downloadLink",
      title: "Download Link",
      onChangeHandler: onchangeHandler
    }), __jsx("div", {
      className: "saveBtn"
    }, __jsx("button", {
      className: "SaveVideoDataBtn",
      onClick: () => onSaveChanges()
    }, "Save Video Data")));
  } else {
    return __jsx("h3", null, "This Post Type Does not Support this Feature ");
  }
};

/* harmony default export */ __webpack_exports__["default"] = (VideoInformation);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.scss":
/*!****************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.js":
/*!*****************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoUrls_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoUrls.scss */ "./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.scss");
/* harmony import */ var _VideoUrls_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VideoUrls_scss__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const VideoUrls = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  return __jsx("div", {
    className: "VideoUrls VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, "Video URL")), __jsx("div", {
    className: "editor"
  }, __jsx("input", {
    className: "textInput"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoUrls);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.scss":
/*!*******************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js":
/*!***********************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const ViewsLikesDisLikes = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  return __jsx("div", {
    className: "ViewsLikesDisLikes VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, props.name)), __jsx("div", {
    className: "editor"
  }, __jsx("input", {
    type: "number",
    name: props.name,
    className: "numberInput",
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ViewsLikesDisLikes);

/***/ }),

/***/ "./components/adminIncludes/SideBar/SideBar.js":
/*!*****************************************************!*\
  !*** ./components/adminIncludes/SideBar/SideBar.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SideBar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar.scss */ "./components/adminIncludes/SideBar/SideBar.scss");
/* harmony import */ var _SideBar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SideBar_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const SideBar = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  const generateFakeData = () => {
    // const body = {
    //     type: "Video",
    //     size: 1000,
    //     pageNo: 1,
    //     fields: ["author", "title", "imageUrl", "status", "actors", "tags", "categories"],
    //     status: "All",
    //     author: "All",
    //     keyword: ""
    // };
    axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:4200/server/posts/admin-postsForTest').then(res => {
      const posts = res.data.posts;
      posts.forEach(async post => {
        let data = {
          title: post.title.en,
          categories: post.categories,
          comments: post.comments,
          actors: post.actors,
          tags: post.tags,
          author: '5e322f0f8b2a0637dc3b6a16',
          description: post.description.en,
          disLikes: 0,
          mainThumbnail: post.imageUrl,
          videoTrailerUrl: post.imagePreviewUrl,
          videoEmbedCode: post.iframe,
          likes: 0,
          quality: post.quality,
          status: 'published',
          postType: "video",
          sourceSite: "Xhamster",
          views: 0
        }; // let dataToSave = {
        //     title:post.title.en,
        //     author:'5e322f0f8b2a0637dc3b6a16',
        //     categories:post.categories,
        //     actors:post.actors,
        //     tags:post.tags,
        //     mainThumbnail:post.imageUrl,
        //     status:post.status,
        //     type:post.type
        // };

        await contextData.functions.savePosts(data); // console.log(post. )
      });
    });
  };

  if (contextData.settings.adminPanelSideBar) {
    return __jsx("div", {
      className: "SideBar"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/posts"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Posts")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/media"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Media")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/psges"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Pages")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/comments"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Comments")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/feedback"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Feedback")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/design"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Design")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/plugins"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Plugins")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/users"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Users")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/setting"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Settings")));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (SideBar);

/***/ }),

/***/ "./components/adminIncludes/SideBar/SideBar.scss":
/*!*******************************************************!*\
  !*** ./components/adminIncludes/SideBar/SideBar.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.js":
/*!****************************************************************************!*\
  !*** ./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AdminActionMenu_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminActionMenu.scss */ "./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.scss");
/* harmony import */ var _AdminActionMenu_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_AdminActionMenu_scss__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AdminActionMenu = props => {
  if (props.active) {
    return __jsx("div", {
      className: "AdminActionMenu"
    }, __jsx("button", {
      className: "AdminActionMenuItem"
    }, " My Profile"), __jsx("button", {
      className: "AdminActionMenuItem"
    }, " Edit My Profile"), __jsx("button", {
      className: "AdminActionMenuItem"
    }, " Log Out"));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (AdminActionMenu);

/***/ }),

/***/ "./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.scss":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/TopBar/AdminTopBar.js":
/*!********************************************************!*\
  !*** ./components/adminIncludes/TopBar/AdminTopBar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AdminTopBar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminTopBar.scss */ "./components/adminIncludes/TopBar/AdminTopBar.scss");
/* harmony import */ var _AdminTopBar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_AdminTopBar_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-fontawesome */ "react-fontawesome");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AdminActionMenu_AdminActionMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AdminActionMenu/AdminActionMenu */ "./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.js");
/* harmony import */ var _NewItemMenu_NewItemMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewItemMenu/NewItemMenu */ "./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // import { setSprCache } from "next/dist/next-server/server/spr-cache";

const AdminTopBar = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const {
    0: state,
    1: dispatchState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    AdminActionMenu: false,
    NewItemMenu: false
  });

  const AdminSideBarOpenCloseHandler = () => {
    contextData.settings.adminPanelSideBar ? contextData.dispatchSettings(settings => _objectSpread({}, settings, {
      adminPanelSideBar: false
    })) : contextData.dispatchSettings(settings => _objectSpread({}, settings, {
      adminPanelSideBar: true
    }));
  };

  const goToHomePage = () => {
    props.router.push('/');
    console.log(props.router);
  };

  const newAction = () => {
    props.router.push('/admin/post');
  };

  const adminActionHandler = () => {
    state.AdminActionMenu ? dispatchState(_objectSpread({}, state, {
      AdminActionMenu: false
    })) : dispatchState(_objectSpread({}, state, {
      AdminActionMenu: true
    }));
  };

  const newItemMenuHandler = () => {
    state.NewItemMenu ? dispatchState(_objectSpread({}, state, {
      NewItemMenu: false
    })) : dispatchState(_objectSpread({}, state, {
      NewItemMenu: true
    }));
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "adminTopBar"
  }, __jsx("div", {
    className: "adminTopBarControl"
  }, __jsx("button", {
    className: "adminSideBarMobileBtn adminTopBarItem",
    onClick: () => AdminSideBarOpenCloseHandler()
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "bars"
  })), __jsx("button", {
    className: "adminGoToHomePageBtn adminTopBarItem",
    onClick: () => goToHomePage()
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "home"
  })), __jsx("button", {
    className: "adminNewActionBtn adminTopBarItem",
    onClick: () => newItemMenuHandler()
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "plus"
  })), __jsx(_NewItemMenu_NewItemMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    active: state.NewItemMenu
  })), __jsx("button", {
    className: "adminActionBtn adminTopBarItem",
    onClick: () => adminActionHandler()
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "user"
  })), __jsx(_AdminActionMenu_AdminActionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: state.AdminActionMenu
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(AdminTopBar));

/***/ }),

/***/ "./components/adminIncludes/TopBar/AdminTopBar.scss":
/*!**********************************************************!*\
  !*** ./components/adminIncludes/TopBar/AdminTopBar.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.js":
/*!********************************************************************!*\
  !*** ./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NewItemMenu_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewItemMenu.scss */ "./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.scss");
/* harmony import */ var _NewItemMenu_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NewItemMenu_scss__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const NewItemMenu = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  if (props.active) {
    return __jsx("div", {
      className: "NewItemMenu"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: "/admin/post?new=1"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "New Post")));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (NewItemMenu);

/***/ }),

/***/ "./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.scss":
/*!**********************************************************************!*\
  !*** ./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/Loading/Loading.js":
/*!************************************************!*\
  !*** ./components/includes/Loading/Loading.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loading_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loading.scss */ "./components/includes/Loading/Loading.scss");
/* harmony import */ var _Loading_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Loading_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const Loading = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  const onStopLoadingHandler = () => {
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: false
    }));
  };

  if (contextData.state.loading) {
    return __jsx("div", {
      className: "Loading"
    }, __jsx("div", {
      className: "lds-ring"
    }, __jsx("div", null), __jsx("div", null), __jsx("div", null), __jsx("div", null)), __jsx("button", {
      className: "stopLoading fas fa-times",
      onClick: () => onStopLoadingHandler()
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./components/includes/Loading/Loading.scss":
/*!**************************************************!*\
  !*** ./components/includes/Loading/Loading.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/layouts/AdminLayout.js":
/*!*******************************************!*\
  !*** ./components/layouts/AdminLayout.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AdminLayout_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdminLayout.scss */ "./components/layouts/AdminLayout.scss");
/* harmony import */ var _AdminLayout_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_AdminLayout_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/styles.scss */ "./styles/styles.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _adminIncludes_TopBar_AdminTopBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../adminIncludes/TopBar/AdminTopBar */ "./components/adminIncludes/TopBar/AdminTopBar.js");
/* harmony import */ var _adminIncludes_SideBar_SideBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../adminIncludes/SideBar/SideBar */ "./components/adminIncludes/SideBar/SideBar.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../includes/Loading/Loading */ "./components/includes/Loading/Loading.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const Panel = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);
  const container = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const Admin = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: state,
    1: dispatchState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (window.innerWidth > 768) {
      contextData.dispatchSettings(settings => _objectSpread({}, settings, {
        adminPanelSideBar: true
      }));
    }
  }, []); // useEffect(()=>{
  //     if (contextData.userData.role !=='administrator' && props.router.pathname.includes('/admin')){
  //         props.router.push('/')
  //     }
  // },[ props.router]);

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, __jsx("title", null, "Website Title"), __jsx("meta", {
    name: "theme-color",
    content: "#000000"
  }), __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), __jsx("meta", {
    charSet: "utf-8"
  }), __jsx("link", {
    href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    rel: "stylesheet"
  }), __jsx("meta", {
    name: "description",
    content: "description of the site"
  }), __jsx("meta", {
    name: "keywords",
    content: "key,word,for,SEO"
  }), "/*", __jsx("meta", {
    property: "og:title",
    content: "The Rock"
  }), __jsx("meta", {
    property: "og:type",
    content: "video.movie"
  }), __jsx("meta", {
    property: "og:url",
    content: "http://www.imdb.com/title/tt0117500/"
  }), __jsx("meta", {
    property: "og:image",
    content: "http://ia.media-imdb.com/images/rock.jpg"
  }), "https://ogp.me/ */"), __jsx("div", {
    ref: container,
    className: "container"
  }, __jsx(_adminIncludes_TopBar_AdminTopBar__WEBPACK_IMPORTED_MODULE_4__["default"], null), __jsx(_adminIncludes_SideBar_SideBar__WEBPACK_IMPORTED_MODULE_5__["default"], null), __jsx("div", {
    ref: Admin,
    className: "Admin"
  }, props.children), __jsx(_includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_8__["default"], null)));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(Panel));

/***/ }),

/***/ "./components/layouts/AdminLayout.scss":
/*!*********************************************!*\
  !*** ./components/layouts/AdminLayout.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./context/AppContext.js":
/*!*******************************!*\
  !*** ./context/AppContext.js ***!
  \*******************************/
/*! exports provided: AppContext, AppProviderWithRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return AppContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppProviderWithRouter", function() { return AppProviderWithRouter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jwt-decode */ "jwt-decode");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const AppContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();

const AppProvider = props => {
  const {
    0: state,
    1: dispatchState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    loading: false
  });
  const {
    0: settings,
    1: dispatchSettings
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    adminPanelSideBar: false,
    test: false
  });
  const {
    0: userData,
    1: dispatchUserData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: editingPostData,
    1: dispatchEditingPostData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    categories: [],
    actors: [],
    tags: [],
    title: '',
    author: '',
    description: '',
    disLikes: 0,
    mainThumbnail: '',
    videoTrailerUrl: '',
    videoEmbedCode: '',
    likes: 0,
    quality: '',
    status: '',
    postType: '',
    sourceSite: '',
    views: 0
  });
  const {
    0: adminPosts,
    1: dispatchAdminPosts
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: adminPostsData,
    1: dispatchAdminPostsData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pageNo: 1,
    size: 30,
    totalPosts: 0,
    postType: 'all',
    keyword: '',
    status: 'all',
    author: 'all',
    fields: ['author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories'],
    checkedPosts: []
  });
  const {
    0: functions,
    1: dispatchFunctions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    getAndSetUserInfo: async () => {
      if (localStorage.wt) {
        await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/users/getUserInfo', {
          token: localStorage.wt
        }).then(res => {
          dispatchUserData(_objectSpread({}, userData, {}, res.data.userData));
        }).catch(err => {
          console.log(err);
        });
      }
    },
    logOutUser: () => {
      localStorage.removeItem('wt');
      dispatchUserData({});
      props.router.push('/');
    },
    goToAdminPanel: () => {
      props.router.push('/admin');
    },
    goToHomePage: () => {// props.router.push('/')
    },
    savePosts: async data => {
      const body = {
        postData: data,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/createNewPost', body);
    },
    updatePost: async data => {
      const body = {
        postData: data,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/updatePost', body);
    },
    getPosts: async data => {
      const body = _objectSpread({}, data, {
        token: localStorage.wt
      });

      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts', body);
    },
    getPost: async _id => {
      const body = {
        _id,
        token: localStorage.wt
      };
      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/post', body);
    },
    setEditingPostData: (name, value) => {
      dispatchEditingPostData(editingPostData => _objectSpread({}, editingPostData, {
        [name]: value
      }));
    },
    bulkActionPost: (ids, status) => {
      dispatchState(_objectSpread({}, state, {
        loading: true
      }));
      const body = {
        ids,
        status,
        token: localStorage.wt
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/postsBulkAction', body).then(() => {
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      }).catch(() => {
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      });
    },
    deletePost: id => {
      const body = {
        _id: id,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/deletePost', body);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    functions.getAndSetUserInfo();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(editingPostData);
  }, [editingPostData]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(props);

    if (props.router.pathname === '/admin/posts') {
      functions.getPosts(adminPostsData).then(res => {
        dispatchAdminPosts(res.data.posts);
        dispatchAdminPostsData(_objectSpread({}, adminPostsData, {
          totalPosts: parseInt(res.data.totalCount)
        }));
      });
    }
  }, [adminPostsData.pageNo, adminPostsData.size, adminPostsData.postType, adminPostsData.keyword, adminPostsData.status, adminPostsData.fields]);
  return __jsx("div", null, __jsx(AppContext.Provider, {
    value: {
      state,
      dispatchState,
      settings,
      dispatchSettings,
      userData,
      dispatchUserData,
      functions,
      editingPostData,
      dispatchEditingPostData,
      adminPosts,
      dispatchAdminPosts,
      adminPostsData,
      dispatchAdminPostsData
    }
  }, props.children));
};

AppProvider.getInitialProps = ctx => {
  return {
    ctx
  };
};

const AppProviderWithRouter = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(AppProvider);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "core-js/library/fn/symbol");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/weak-map.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/weak-map.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/weak-map */ "core-js/library/fn/weak-map");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getOwnPropertyDescriptor = __webpack_require__(/*! ../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js");

var _WeakMap = __webpack_require__(/*! ../core-js/weak-map */ "./node_modules/@babel/runtime-corejs2/core-js/weak-map.js");

function _getRequireWildcardCache() {
  if (typeof _WeakMap !== "function") return null;
  var cache = new _WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        _Object$defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/typeof.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _url = __webpack_require__(/*! url */ "url");

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      // @ts-ignore target exists on currentTarget
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getHref() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref
    } = this.formatUrls(this.props.href, this.props.as);
    return (0, _url.resolve)(pathname, parsedHref);
  }

  handleRef(ref) {
    var isPrefetched = prefetched[this.getHref()];

    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch() {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var href = this.getHref();

    _router.default.prefetch(href);

    prefetched[href] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch();
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router-context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function addBasePath(path) {
  // @ts-ignore variable is always a string
  const p = "";
  return path.indexOf(p) !== 0 ? p + path : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.url === this.pathname && e.state.as === this.asPath) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = (asPath, _cachedData) => {
      let pathname = url_1.parse(asPath).pathname;
      pathname = toRoute(!pathname || pathname === '/' ? '/index' : pathname);
      return  false ? undefined : fetch( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`).then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load static props`);
        }

        return res.json();
      }).then(data => {
        this.sdc[pathname] = data;
        return data;
      }).catch(err => {
        ;
        err.code = 'PAGE_LOAD_ERROR';
        throw err;
      });
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented
    // @ts-ignore backwards compatibility

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, addBasePath(as), options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      } // @ts-ignore pathname is always a string


      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result
      // @ts-ignore pathname is always a string

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, addBasePath(as), options);
        const hash = window.location.hash.substring(1);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        } // @ts-ignore pathname is always defined


        this.set(route, pathname, query, as, Object.assign(Object.assign({}, routeInfo), {
          hash
        }));

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      } // @ts-ignore method should always exist on history


      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      // @ts-ignore method should always exist on history
      window.history[method]({
        url,
        as,
        options
      }, null, as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(Component => resolve({
        Component
      }), reject);
    }).then(routeInfo => {
      const {
        Component
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => Component.__N_SSG ? this._getStaticData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(err => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR') {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(Component => {
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }));
      });
    });
  }

  set(route, pathname, query, as, data) {
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch `page` code, you may wait for the data during `page` rendering.
   * This feature only works in production!
   * @param url of prefetched `page`
   */


  prefetch(url) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      } // @ts-ignore pathname is always defined


      const route = toRoute(pathname);
      this.pageLoader.prefetch(route).then(resolve, reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const Component = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return Component;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = decodeURIComponent;
    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./pages/admin/Post/index.js":
/*!***********************************!*\
  !*** ./pages/admin/Post/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var _components_adminIncludes_PostComponents_TitleDescription_TitleDescription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription */ "./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.js");
/* harmony import */ var _components_adminIncludes_PostComponents_ActionOnPost_ActionOnPost__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost */ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js");
/* harmony import */ var _components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget */ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js");
/* harmony import */ var _post_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post.scss */ "./pages/admin/Post/post.scss");
/* harmony import */ var _post_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_post_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_adminIncludes_PostComponents_Format_Format__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/Format/Format */ "./components/adminIncludes/PostComponents/Format/Format.js");
/* harmony import */ var _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors */ "./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.js");
/* harmony import */ var _components_adminIncludes_PostComponents_VideoInformation_VideoInformation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation */ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_10__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











 // test query  http://localhost:3000/admin/post?id=123456

const Index = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);

  const onChangeHandler = e => {
    contextData.dispatchEditingPostData(_objectSpread({}, contextData.editingPostData, {
      [e.target.name]: e.target.value
    }));
  }; // useEffect(() => {
  //     console.log(contextData.editingPostData)
  // }, [ contextData.editingPostData ]);


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(props);

    if (props.query.id) {
      contextData.functions.getPost(props.query.id).then(post => {
        contextData.dispatchEditingPostData(_objectSpread({}, contextData.editingPostData, {}, post.data.post));
      });
    }
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_1__["default"], null, __jsx("div", {
    className: "Post"
  }, __jsx(_components_adminIncludes_PostComponents_TitleDescription_TitleDescription__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onChangeHandler: onChangeHandler
  }), __jsx("div", {
    className: "side"
  }, __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    component: _components_adminIncludes_PostComponents_ActionOnPost_ActionOnPost__WEBPACK_IMPORTED_MODULE_3__["default"],
    title: "action",
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    component: _components_adminIncludes_PostComponents_Format_Format__WEBPACK_IMPORTED_MODULE_7__["default"],
    title: "Format",
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isNewPost: props.query.new === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_8__["default"],
    type: "categories",
    title: "Post Category",
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isNewPost: props.query.new === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_8__["default"],
    type: "tags",
    title: "Post Tags",
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isNewPost: props.query.new === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_8__["default"],
    type: "actors",
    title: "Post Actors",
    onChangeHandler: onChangeHandler
  })), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_4__["default"], {
    component: _components_adminIncludes_PostComponents_VideoInformation_VideoInformation__WEBPACK_IMPORTED_MODULE_9__["default"],
    title: "Video Information",
    onChangeHandler: onChangeHandler
  }))));
};

Index.getInitialProps = async ({
  query
}) => {
  return {
    query
  };
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_10___default()(Index));

/***/ }),

/***/ "./pages/admin/Post/post.scss":
/*!************************************!*\
  !*** ./pages/admin/Post/post.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./styles/styles.scss":
/*!****************************!*\
  !*** ./styles/styles.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 4:
/*!*****************************************!*\
  !*** multi ./pages/admin/Post/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! G:\Dev Project\reactServerSideRenderingWithNext\pages\admin\Post\index.js */"./pages/admin/Post/index.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/symbol":
/*!********************************************!*\
  !*** external "core-js/library/fn/symbol" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),

/***/ "core-js/library/fn/symbol/iterator":
/*!*****************************************************!*\
  !*** external "core-js/library/fn/symbol/iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "core-js/library/fn/weak-map":
/*!**********************************************!*\
  !*** external "core-js/library/fn/weak-map" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/weak-map");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-fontawesome":
/*!************************************!*\
  !*** external "react-fontawesome" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-switch":
/*!*******************************!*\
  !*** external "react-switch" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-switch");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=Post.js.map