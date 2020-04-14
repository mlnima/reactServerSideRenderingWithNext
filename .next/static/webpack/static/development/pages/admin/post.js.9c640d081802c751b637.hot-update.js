webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.js":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-switch */ "./node_modules/react-switch/index.js");
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_switch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ImagePreview_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ImagePreview.scss */ "./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.scss");
/* harmony import */ var _ImagePreview_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ImagePreview_scss__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var ImagePreview = function ImagePreview(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    open: false
  }),
      state = _useState[0],
      setState = _useState[1];

  if (props.postData.mainThumbnail) {
    if (state.open) {
      return __jsx("div", {
        className: "ImagePreview VideoInformationSection"
      }, __jsx("p", null, "Image Preview"), __jsx(react_switch__WEBPACK_IMPORTED_MODULE_2___default.a, {
        onChange: function onChange() {
          return state.open ? setState(_objectSpread({}, state, {
            open: false
          })) : setState(_objectSpread({}, state, {
            open: true
          }));
        },
        checked: state.open ? true : false
      }), __jsx("div", {
        className: "title"
      }), __jsx("div", {
        className: "editor"
      }, __jsx("img", {
        src: props.postData.mainThumbnail
      })));
    } else return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("p", null, "Image Preview"), __jsx(react_switch__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onChange: function onChange() {
        return state.open ? setState(_objectSpread({}, state, {
          open: false
        })) : setState(_objectSpread({}, state, {
          open: true
        }));
      },
      checked: props.isChecked
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (ImagePreview);

/***/ })

})
//# sourceMappingURL=post.js.9c640d081802c751b637.hot-update.js.map