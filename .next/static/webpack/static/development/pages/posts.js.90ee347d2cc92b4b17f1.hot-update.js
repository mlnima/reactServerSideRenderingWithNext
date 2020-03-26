webpackHotUpdate("static\\development\\pages\\posts.js",{

/***/ "./components/includes/PaginationComponent/PaginationComponent.js":
/*!************************************************************************!*\
  !*** ./components/includes/PaginationComponent/PaginationComponent.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/set */ "./node_modules/@babel/runtime-corejs2/core-js/set.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;



var PaginationComponent = function PaginationComponent(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    pages: []
  }),
      state = _useState[0],
      setState = _useState[1];

  var numberGen = function numberGen(current) {
    var numArr = [];

    if (current === 1) {
      for (var i = 1; i <= 7; i++) {
        numArr.push(i);
      }
    }

    if (current === 2) {
      numArr.push(1);

      for (var _i = 2; _i <= 7; _i++) {
        numArr.push(_i);
      }
    }

    if (current === 3) {
      numArr.push(1);
      numArr.push(2);

      for (var _i2 = 3; _i2 <= 7; _i2++) {
        numArr.push(_i2);
      }
    }

    if (current > 3) {
      var min = current - 3;
      var max = current + 3;

      for (var _i3 = current; _i3 <= max; _i3++) {
        numArr.push(_i3);
      }

      for (var _i4 = current; _i4 >= min; _i4--) {
        numArr.push(_i4);
      }
    }

    if (current > 3) {
      numArr.push(1);
    }

    if (Math.ceil(props.totalCount / props.size)) {
      numArr.push(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(props.maxPage) - 1);
    }

    numArr = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(new _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_0___default.a(numArr));
    numArr = numArr.sort(function (x, y) {
      return x - y;
    });
    return numArr;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (!props.currentPage) {
      var pageNo = 1;
      setState({
        pages: numberGen(pageNo)
      });
    } else {
      setState({
        pages: numberGen(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(props.currentPage))
      });
    }
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    console.log(props);
    console.log(state);
  }, [props]);
  var pageNumbersGenerator = state.pages.map(function (num) {
    //
    // if (num > 0 && num <= (Math.ceil(props.totalCount / props.size) - 1)) {
    //     let numInBtn = num.toString();
    //
    //
    // }
    return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: "http://localhost:3000/posts"
    }, __jsx("a", null, " ", num, " "), " "));
  });

  if (props.isActive) {
    return __jsx("div", null);
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (PaginationComponent);

/***/ })

})
//# sourceMappingURL=posts.js.90ee347d2cc92b4b17f1.hot-update.js.map