webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DropDownWidget/DropDownWidget */ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActionOnPost.scss */ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.scss");
/* harmony import */ var _ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ActionOnPost_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var ActionOnPost = function ActionOnPost(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);

  var onSaveHandler = function onSaveHandler() {
    contextData.functions.savePosts(contextData.editingPostData);
  };

  return __jsx("div", {
    className: "ActionOnPost"
  }, __jsx("div", {
    className: "ActionOnPostItem dropDownWidgetItem"
  }, __jsx("button", {
    className: "saveDraftBtn"
  }, "Save Draft"), __jsx("button", {
    className: "previewBtn"
  }, "Preview")), __jsx("div", {
    className: "ActionOnPostItem dropDownWidgetItem"
  }, __jsx("p", null, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "fontawesomeMedium",
    name: "key"
  }), " Status:", contextData.editingPostData.status), __jsx("select", {
    defaultValue: "Draft"
  }, __jsx("option", {
    value: "Published"
  }, "Published"), __jsx("option", {
    value: "Draft"
  }, "Draft"), __jsx("option", {
    value: "Trash"
  }, "Trash"))), __jsx("div", {
    className: "ActionOnPostItem dropDownWidgetItem"
  }, __jsx("button", {
    className: "SaveBtn",
    onClick: function onClick() {
      return onSaveHandler();
    }
  }, "Save")));
};

/* harmony default export */ __webpack_exports__["default"] = (ActionOnPost);

/***/ })

})
//# sourceMappingURL=post.js.6ad2b18277605b1c7a0d.hot-update.js.map