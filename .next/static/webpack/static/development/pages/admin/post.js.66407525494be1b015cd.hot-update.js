webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/PostComponents/Format/Format.js":
/*!******************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/Format/Format.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _Format_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Format.scss */ "./components/adminIncludes/PostComponents/Format/Format.scss");
/* harmony import */ var _Format_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Format_scss__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var Format = function Format(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  return __jsx("div", {
    className: "Format"
  }, __jsx("select", {
    defaultValue: contextData.editingPostData.format,
    name: "format",
    onChange: function onChange(e) {
      return props.onChangeHandler(e);
    }
  }, __jsx("option", {
    value: "standard"
  }, "Standard"), __jsx("option", {
    value: "video"
  }, "Video")));
};

Format.getInitialProps = function (_ref) {
  var req = _ref.req;
  console.log(props);
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Format);

/***/ })

})
//# sourceMappingURL=post.js.66407525494be1b015cd.hot-update.js.map