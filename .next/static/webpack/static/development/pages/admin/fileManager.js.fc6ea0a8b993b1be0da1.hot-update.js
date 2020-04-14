webpackHotUpdate("static\\development\\pages\\admin\\fileManager.js",{

/***/ "./components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl.js":
/*!*************************************************************************************************!*\
  !*** ./components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FileManagerControl_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileManagerControl.scss */ "./components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl.scss");
/* harmony import */ var _FileManagerControl_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FileManagerControl_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _UploadFileBtn_uploadFileBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../UploadFileBtn/uploadFileBtn */ "./components/adminIncludes/UploadFileBtn/uploadFileBtn.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;





var FileManagerControl = function FileManagerControl(props) {
  var addressBar = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    addressBar: ''
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {}, []);

  var onGoBackHandler = function onGoBackHandler(e) {
    clearClickedItemHandler(e);
    var path = props.data.path;
    var splitPath = path.split('/');
    var lastItemPlusSlash = '/' + splitPath[splitPath.length - 1];
    var newPath = path.replace(lastItemPlusSlash, '');
    props.setStateHandler('path', newPath);
  };

  var clearClickedItemHandler = function clearClickedItemHandler(e) {// contextData.setFilesData({
    //     ...contextData.filesData,
    //     clickedItems:[]
    // });
  };

  var onChaneHandler = function onChaneHandler(e) {
    setState(Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, e.target.name, e.target.value));
  };

  return __jsx("div", {
    className: "FileManagerControl"
  }, __jsx("div", {
    className: "file-Manager-control-address-bar"
  }, __jsx("button", {
    className: "backBtn",
    onClick: function onClick(e) {
      return onGoBackHandler(e);
    }
  }, "Back"), __jsx("input", {
    ref: addressBar,
    name: "addressBar",
    onChange: function onChange(e) {
      return onGoBackHandler(e);
    },
    className: "ControlFilesItem",
    onClick: function onClick(e) {
      return clearClickedItemHandler(e);
    },
    value: props.data.path
  }), __jsx("button", {
    onClick: function onClick() {
      return props.setStateHandler('path', addressBar.current.value);
    }
  }, "Go")), __jsx("div", {
    className: "file-Manager-control-quick-access"
  }, __jsx("button", {
    onClick: function onClick() {
      return props.setStateHandler('path', '.');
    }
  }, "Root"), __jsx("button", {
    onClick: function onClick() {
      return props.setStateHandler('path', './static/uploads/image');
    }
  }, "Images"), __jsx("button", {
    onClick: function onClick() {
      return props.setStateHandler('path', './static/uploads/video');
    }
  }, "Videos"), __jsx("button", {
    onClick: function onClick() {
      return props.setStateHandler('path', './static/uploads/application');
    }
  }, "Applications")));
};

/* harmony default export */ __webpack_exports__["default"] = (FileManagerControl);

/***/ })

})
//# sourceMappingURL=fileManager.js.fc6ea0a8b993b1be0da1.hot-update.js.map