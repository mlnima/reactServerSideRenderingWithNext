webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/PostComponents/VideoEmbedCode/VideoEmbedCode.js":
/*!**********************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoEmbedCode/VideoEmbedCode.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoEmbedCode.scss */ "./components/adminIncludes/PostComponents/VideoEmbedCode/VideoEmbedCode.scss");
/* harmony import */ var _VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VideoEmbedCode_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var VideoEmbedCode = function VideoEmbedCode(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);

  if (contextData.editingPostData.format === 'video') {
    return __jsx("div", {
      className: "VideoEmbedCode VideoInformationSection"
    }, __jsx("div", {
      className: "title"
    }, __jsx("p", null, "Video Embed Code")), __jsx("div", {
      className: "editor"
    }, __jsx("textarea", {
      className: "textareaInput"
    })));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (VideoEmbedCode);

/***/ })

})
//# sourceMappingURL=post.js.ed4dd84283659dc3624b.hot-update.js.map