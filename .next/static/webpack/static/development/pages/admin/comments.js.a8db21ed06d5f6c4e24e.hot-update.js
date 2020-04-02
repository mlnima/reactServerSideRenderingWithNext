webpackHotUpdate("static\\development\\pages\\admin\\comments.js",{

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
//# sourceMappingURL=comments.js.a8db21ed06d5f6c4e24e.hot-update.js.map