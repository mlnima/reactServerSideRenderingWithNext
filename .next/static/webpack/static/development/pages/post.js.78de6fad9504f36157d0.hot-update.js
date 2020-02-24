webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/DownloadLink/DownloadLink.js":
/*!***************************************************************!*\
  !*** ./components/includes/Post/DownloadLink/DownloadLink.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var DownloadLink = function DownloadLink(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);

  if (props.downloadLink) {
    return __jsx("div", {
      id: "download-url"
    }, __jsx("a", {
      href: props.downloadLink,
      target: "_blank",
      className: "download-link"
    }, "Download"));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (DownloadLink);

/***/ })

})
//# sourceMappingURL=post.js.78de6fad9504f36157d0.hot-update.js.map