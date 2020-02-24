webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/Actors/Actors.js":
false,

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
    data: props.actors
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (PostInfo);

/***/ }),

/***/ "./components/includes/Post/TagsAndCategoriesActors/TagsAndCategoriesActors.js":
/*!*************************************************************************************!*\
  !*** ./components/includes/Post/TagsAndCategoriesActors/TagsAndCategoriesActors.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var TagsAndCategoriesActors = function TagsAndCategoriesActors(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    data: props.data || [],
    type: props.type || 'tags'
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);
  var renderData = state.data.map(function (item) {
    var path = '/' + state.type + '/' + item;
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: path,
      key: item
    }, __jsx("a", null, item, "xx"));
  });

  if (props.data) {
    return __jsx("div", {
      className: state.type + ' tags-categories-actors'
    }, renderData);
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (TagsAndCategoriesActors);

/***/ })

})
//# sourceMappingURL=post.js.7ab7a879a0a7f197148a.hot-update.js.map