webpackHotUpdate("static\\development\\pages\\admin\\posts.js",{

/***/ "./pages/admin/posts/index.js":
/*!************************************!*\
  !*** ./pages/admin/posts/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;





var Index = function Index(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_4__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    pageNo: 1,
    limit: 30
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    contextData.functions.getPosts(state.limit, state.pageNo).then(function (res) {
      contextData.dispatchAdminPosts(function (previousPosts) {
        return [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(previousPosts), Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(res.data.posts));
      });
    });
  }, [state]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    console.log(contextData.adminPosts);
  }, [contextData.adminPosts]);
  var renderPost = contextData.adminPosts.map(function (post) {
    return __jsx("p", {
      key: post.title
    }, post.title);
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, __jsx("div", {
    className: "Posts"
  }, renderPost)));
};

Index.getInitialProps = function (_ref) {
  var req = _ref.req;
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(Index));

/***/ })

})
//# sourceMappingURL=posts.js.b6c192ea7c224c2b4a61.hot-update.js.map