webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js":
/*!**************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _IsInSlideShow_IsInSlideShow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsInSlideShow/IsInSlideShow */ "./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.js");
/* harmony import */ var _Quality_Quality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Quality/Quality */ "./components/adminIncludes/PostComponents/VideoInformation/Quality/Quality.js");
/* harmony import */ var _VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VideoInformation.scss */ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.scss");
/* harmony import */ var _VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_VideoInformation_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _VideoUrls_VideoUrls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoUrls/VideoUrls */ "./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.js");
/* harmony import */ var _VideoEmbedCode_VideoEmbedCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VideoEmbedCode/VideoEmbedCode */ "./components/adminIncludes/PostComponents/VideoEmbedCode/VideoEmbedCode.js");
/* harmony import */ var _Duration_Duration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Duration/Duration */ "./components/adminIncludes/PostComponents/VideoInformation/Duration/Duration.js");
/* harmony import */ var _ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ViewsLikesDisLikes/ViewsLikesDisLikes */ "./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









var VideoInformation = function VideoInformation(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);
  return __jsx("div", {
    className: "VideoInformation"
  }, __jsx(_IsInSlideShow_IsInSlideShow__WEBPACK_IMPORTED_MODULE_1__["default"], null), __jsx(_Quality_Quality__WEBPACK_IMPORTED_MODULE_2__["default"], null), __jsx(_VideoUrls_VideoUrls__WEBPACK_IMPORTED_MODULE_4__["default"], null), __jsx(_VideoEmbedCode_VideoEmbedCode__WEBPACK_IMPORTED_MODULE_5__["default"], null), __jsx(_Duration_Duration__WEBPACK_IMPORTED_MODULE_6__["default"], null), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: 'Views'
  }), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: 'Likes'
  }), __jsx(_ViewsLikesDisLikes_ViewsLikesDisLikes__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: 'DisLikes'
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoInformation);

/***/ }),

/***/ "./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js":
/*!***********************************************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var ViewsLikesDisLikes = function ViewsLikesDisLikes(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);
  return __jsx("div", {
    className: "ViewsLikesDisLikes VideoInformationSection"
  }, __jsx("div", {
    className: "title"
  }, __jsx("p", null, props.name)), __jsx("div", {
    className: "editor"
  }, __jsx("input", {
    type: "number",
    className: "numberInput"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ViewsLikesDisLikes);

/***/ })

})
//# sourceMappingURL=post.js.e5171f346d4551a4cffc.hot-update.js.map