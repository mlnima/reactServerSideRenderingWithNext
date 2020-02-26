webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/PostInfo/PostInfo.js":
/*!*******************************************************!*\
  !*** ./components/includes/Post/PostInfo/PostInfo.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../TagsAndCategoriesActors/TagsAndCategoriesActors */ "./components/includes/Post/TagsAndCategoriesActors/TagsAndCategoriesActors.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../ProgressBar/ProgressBar */ "./components/includes/ProgressBar/ProgressBar.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");







var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }








var PostInfo = function PostInfo(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])({
    likeValue: 0
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    setState(_objectSpread({}, state, {
      likeValue: Object(_variables_variables__WEBPACK_IMPORTED_MODULE_11__["likeValueCalculator"])(props.likes, props.disLikes)
    }));
    Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_12__["likeDislikeView"])(props.id, 'views');
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    console.log(props.likes, props.disLikes);
    console.log(Object(_variables_variables__WEBPACK_IMPORTED_MODULE_11__["likeValueCalculator"])(1, 1));
  }, [state]);
  return __jsx("div", {
    className: "post-info"
  }, __jsx("div", {
    className: "post-info-head"
  }, __jsx("h1", null, props.title), __jsx("div", {
    className: "like"
  }, __jsx("button", {
    onClick: function onClick() {
      return Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_12__["likeDislikeView"])(props.id, 'likes');
    }
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_9___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-up"
  })), __jsx("button", {
    onClick: function onClick() {
      return Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_12__["likeDislikeView"])(props.id, 'disLikes');
    }
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_9___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-down"
  })))), __jsx("div", {
    className: "post-info-body"
  }, __jsx("div", {
    className: "views"
  }, __jsx("span", null, props.views, " views"), __jsx(_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_10__["default"], {
    value: state.likeValue,
    percent: false
  }), __jsx("div", {
    className: "post-rate"
  }, __jsx("div", null, state.likeValue, " %"), __jsx("div", {
    className: "like-disLike-count"
  }, __jsx("span", {
    className: "like-disLike-count-items"
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_9___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-up"
  }), props.likes), __jsx("span", {
    className: "like-disLike-count-items"
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_9___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-down"
  }), props.disLikes)))), __jsx("div", {
    className: "description"
  }, props.description), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "actors",
    data: props.actors
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "tags",
    data: props.tags
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "categories",
    data: props.categories
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (PostInfo);

/***/ })

})
//# sourceMappingURL=post.js.52d5d0dfd0916956795f.hot-update.js.map