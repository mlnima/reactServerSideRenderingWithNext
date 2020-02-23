webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/Iframe/Iframe.js":
/*!***************************************************!*\
  !*** ./components/includes/Post/Iframe/Iframe.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var Iframe = function Iframe(props) {
  if (props.iframeCode) {
    return __jsx("div", {
      className: "video-player"
    }, __jsx("meta", {
      itemProp: "name",
      content: props.meta.title
    }), __jsx("meta", {
      itemProp: "description",
      content: props.meta.description
    }), __jsx("meta", {
      itemProp: "duration",
      content: props.meta.duration
    }), __jsx("meta", {
      itemProp: "thumbnailUrl",
      content: props.meta.thumbnailUrl
    }), __jsx("meta", {
      itemProp: "embedURL",
      content: props.meta.embedURL
    }), __jsx("meta", {
      itemProp: "uploadDate",
      content: props.meta.uploadDate
    }), __jsx("div", {
      className: "responsive-player"
    }, __jsx("iframe", {
      src: props.iframeCode,
      frameBorder: "0",
      width: "640",
      height: "360",
      scrolling: "no"
    })));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Iframe);

/***/ })

})
//# sourceMappingURL=post.js.d749b818c0447e3f6084.hot-update.js.map