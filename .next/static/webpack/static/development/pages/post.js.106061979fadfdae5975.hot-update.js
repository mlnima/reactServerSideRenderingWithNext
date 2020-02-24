webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/PostInfo/PostInfo.js":
/*!*******************************************************!*\
  !*** ./components/includes/Post/PostInfo/PostInfo.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TagsAndCategoriesActors/TagsAndCategoriesActors */ "./components/includes/Post/TagsAndCategoriesActors/TagsAndCategoriesActors.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Actors_Actors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Actors/Actors */ "./components/includes/Post/Actors/Actors.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var PostInfo = function PostInfo(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);
  return __jsx("div", {
    className: "post-info"
  }, __jsx("h1", null, props.title), __jsx("div", {
    className: "like"
  }, __jsx("button", null, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-up"
  })), __jsx("button", null, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-down"
  }))), __jsx("div", {
    className: "views"
  }), __jsx("div", {
    className: "description"
  }, props.description), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "tags",
    data: props.tags
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "categories",
    data: props.categories
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "actors",
    data: props.categories
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (PostInfo);

/***/ })

})
//# sourceMappingURL=post.js.106061979fadfdae5975.hot-update.js.map