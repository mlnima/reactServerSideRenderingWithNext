webpackHotUpdate("static\\development\\pages\\post.js",{

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
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var TagsAndCategoriesActors = function TagsAndCategoriesActors(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    data: props.data || [],
    type: props.type || 'tags'
  }),
      state = _useState[0],
      setState = _useState[1]; // useEffect(() => {
  //     setState({
  //         ...state,
  //         data: [ ...state.data, 'test' ]
  //     })
  // }, []);


  var renderData = state.data.map(function (item) {
    var path = '/' + state.type + '/' + item;
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: path,
      key: item
    }, __jsx("a", {
      className: state.type
    }, item));
  });

  if (props.data.length > 1) {
    return __jsx("div", {
      className: state.type + ' tags-categories-actors'
    }, __jsx("span", null, state.type, ":"), __jsx("div", {
      className: "content"
    }, renderData));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (TagsAndCategoriesActors);

/***/ })

})
//# sourceMappingURL=post.js.b93548dc8c13ea874819.hot-update.js.map