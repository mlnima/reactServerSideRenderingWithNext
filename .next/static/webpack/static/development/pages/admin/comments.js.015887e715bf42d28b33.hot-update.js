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
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");

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
    Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__["updateComment"])({
      _id: props.data._id,
      update: commentData
    }).then(function () {
      Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__["getComments"])(props.commentData);
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

/* harmony default export */ __webpack_exports__["default"] = (AdminCommentItem);

/***/ }),

/***/ "./pages/admin/comments/index.js":
/*!***************************************!*\
  !*** ./pages/admin/comments/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var _components_adminIncludes_commentsPageComponents_AdminRenderComments_AdminRenderComments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminRenderComments */ "./components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminRenderComments.js");
/* harmony import */ var _components_adminIncludes_commentsPageComponents_AdminCommentsControl_AdminCommentsControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/adminIncludes/commentsPageComponents/AdminCommentsControl/AdminCommentsControl */ "./components/adminIncludes/commentsPageComponents/AdminCommentsControl/AdminCommentsControl.js");
/* harmony import */ var _components_includes_PaginationComponent_PaginationComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/includes/PaginationComponent/PaginationComponent */ "./components/includes/PaginationComponent/PaginationComponent.js");
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;








var comments = function comments(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  return __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, __jsx("div", null, __jsx(_components_adminIncludes_commentsPageComponents_AdminCommentsControl_AdminCommentsControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    queryData: props.query || props.router.query,
    pathnameData: props.pathname || props.router.pathname
  }), __jsx(_components_includes_PaginationComponent_PaginationComponent__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isActive: true,
    currentPage: props.getCommentsData.pageNo,
    totalCount: props.totalComments,
    size: props.getCommentsData.size,
    maxPage: Math.ceil(parseInt(props.totalComments) / parseInt(props.getCommentsData.size)),
    queryData: props.query || props.router.query,
    pathnameData: props.pathname || props.router.pathname
  }), __jsx(_components_adminIncludes_commentsPageComponents_AdminRenderComments_AdminRenderComments__WEBPACK_IMPORTED_MODULE_4__["default"], props)));
};

comments.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, comments, getCommentsData, commentsData;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          getCommentsData = {
            size: parseInt(query.size) || 30,
            pageNo: parseInt(query.page) || 1,
            keyword: query.keyword || '',
            sort: query.sort || 'latest',
            status: query.status || 'all'
          };
          _context.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_3__["getComments"])(getCommentsData));

        case 4:
          commentsData = _context.sent;
          comments = commentsData.data;
          return _context.abrupt("return", {
            query: query,
            pathname: pathname,
            comments: comments.comments,
            totalComments: comments.count,
            getCommentsData: getCommentsData
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (comments);

/***/ })

})
//# sourceMappingURL=comments.js.015887e715bf42d28b33.hot-update.js.map