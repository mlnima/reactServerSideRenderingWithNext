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
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var Format = function Format(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, []);
  return __jsx("div", {
    className: "Format"
  }, __jsx("select", {
    defaultValue: "Draft",
    name: "format",
    onChange: function onChange(e) {
      return props.onChangeHandler(e);
    }
  }, __jsx("option", {
    value: "standard"
  }, "Standard"), __jsx("option", {
    value: "video"
  }, "Video")));
}; // Format.getInitialProps =  ({ req,props }) => {
//     console.log(props )
//     return {props}
// };


/* harmony default export */ __webpack_exports__["default"] = (Format);

/***/ })

})
//# sourceMappingURL=post.js.4872383913fa782ac946.hot-update.js.map