webpackHotUpdate("static\\development\\pages\\admin\\settings\\widgets.js",{

/***/ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js":
/*!******************************************************************************************!*\
  !*** ./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var AddWidgetWithPositionMenu = function AddWidgetWithPositionMenu(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    open: false
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {}, []);

  var onOpenHandler = function onOpenHandler() {
    state.open ? setState(_objectSpread({}, state, {
      open: false
    })) : setState(_objectSpread({}, state, {
      open: true
    }));
  };

  if (state.open) {
    return __jsx("div", {
      className: "AddWidgetWithPositionMenu"
    }, __jsx("button", {
      onClick: function onClick() {
        return onOpenHandler();
      }
    }, props.type), __jsx("div", {
      className: "AddWidgetWithPositionMenuPositions"
    }, __jsx("button", null, "Home Page"), __jsx("button", null, "Home Page Sidebar"), __jsx("button", null, "Post Page Sidebar"), __jsx("button", null, "Posts Page Sidebar"), __jsx("button", null, "Tags Page Sidebar"), __jsx("button", null, "Categories Page Sidebar"), __jsx("button", null, "Actors Page Sidebar"), __jsx("button", null, "Footer")));
  } else {
    return __jsx("div", {
      className: "AddWidgetWithPositionMenu"
    }, __jsx("button", null, props.type));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (AddWidgetWithPositionMenu);

/***/ })

})
//# sourceMappingURL=widgets.js.ec46097803fc76e533bb.hot-update.js.map