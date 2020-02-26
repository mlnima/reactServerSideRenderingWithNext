webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/ProgressBar/ProgressBar.js":
/*!********************************************************!*\
  !*** ./components/includes/ProgressBar/ProgressBar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var ProgressBar = function ProgressBar(props) {
  var valueStyle = {
    width: props.value + '%'
  };

  if (props.value < 1) {
    return __jsx("div", {
      className: "progressParent"
    }, __jsx("div", {
      className: "progressChild",
      style: valueStyle
    }, " "));
  } else return __jsx("div", {
    className: "progressParent"
  }, __jsx("div", {
    className: "progressChild",
    style: valueStyle
  }, " ", props.percent ? '' : props.value + ' %'));
};

/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);

/***/ })

})
//# sourceMappingURL=post.js.95d5a07521b31d171017.hot-update.js.map