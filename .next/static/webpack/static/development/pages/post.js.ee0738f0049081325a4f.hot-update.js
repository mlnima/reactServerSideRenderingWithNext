webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/Actors/Actors.js":
/*!***************************************************!*\
  !*** ./components/includes/Post/Actors/Actors.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Actors = function Actors(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    data: props.data || []
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  var renderData = state.data.map(function (item) {
    var path = '/' + state.type + '/' + item;
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: path,
      key: item
    }, __jsx("a", null, item, "xx"));
  });

  if (props.actors) {
    return __jsx("div", null, "x", renderData);
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Actors);

/***/ })

})
//# sourceMappingURL=post.js.ee0738f0049081325a4f.hot-update.js.map