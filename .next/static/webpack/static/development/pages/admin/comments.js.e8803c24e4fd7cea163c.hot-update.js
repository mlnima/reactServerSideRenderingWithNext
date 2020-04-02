webpackHotUpdate("static\\development\\pages\\admin\\comments.js",{

/***/ "./components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminCommentItem/AdminCommentItem.js":
/*!******************************************************************************************************************!*\
  !*** ./components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminCommentItem/AdminCommentItem.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AdminCommentItem_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdminCommentItem.scss */ "./components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminCommentItem/AdminCommentItem.scss");
/* harmony import */ var _AdminCommentItem_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_AdminCommentItem_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var AdminCommentItem = function AdminCommentItem(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    hovered: false,
    checked: false,
    changed: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      commentData = _useState2[0],
      setCommentData = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setCommentData(props.data);
  }, [props.data]);

  var onChangeHandler = function onChangeHandler(e) {
    setCommentData(_objectSpread({}, commentData, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, e.target.name, e.target.value)));
  };

  var onSaveHandler = function onSaveHandler() {
    Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_5__["updateComment"])({
      _id: props.data._id,
      update: commentData
    }).then(function () {
      props.router.reload();
    });
  };

  return __jsx("div", {
    key: props.data._id,
    className: "adminCommentsItem",
    onMouseOver: function onMouseOver() {
      return setState(_objectSpread({}, state, {
        hovered: true
      }));
    },
    onMouseOut: function onMouseOut() {
      return setState(_objectSpread({}, state, {
        hovered: false
      }));
    }
  }, __jsx("div", {
    className: "adminCommentsItemHead"
  }, __jsx("input", {
    type: "checkbox",
    checked: state.checked,
    onChange: function onChange() {
      return state.checked ? setState(_objectSpread({}, state, {
        checked: false
      })) : setState(_objectSpread({}, state, {
        checked: true
      }));
    }
  }), __jsx("p", null, props.data.author)), __jsx("div", {
    className: "adminCommentsItemBody"
  }, __jsx("p", null, props.data.postedDate), __jsx("p", null, props.data.body), __jsx("div", {
    className: "commentControl"
  }, __jsx("select", {
    name: "status",
    value: commentData.status,
    onChange: function onChange(e) {
      return onChangeHandler(e);
    }
  }, __jsx("option", {
    value: "approved"
  }, "Approved"), __jsx("option", {
    value: "trash"
  }, "Trash"), __jsx("option", {
    value: "pending"
  }, "Pending")), __jsx("button", {
    onClick: function onClick() {
      return onSaveHandler();
    }
  }, "Save Changes"))));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4___default()(AdminCommentItem));

/***/ })

})
//# sourceMappingURL=comments.js.e8803c24e4fd7cea163c.hot-update.js.map