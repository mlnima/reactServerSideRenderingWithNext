webpackHotUpdate("static\\development\\pages\\page\\tags.js",{

/***/ "./pages/page/tags/index.js":
/*!**********************************!*\
  !*** ./pages/page/tags/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_includes_TagElement_TagElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/includes/TagElement/TagElement */ "./components/includes/TagElement/TagElement.js");
/* harmony import */ var _components_includes_CategoryElement_CategoryElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/includes/CategoryElement/CategoryElement */ "./components/includes/CategoryElement/CategoryElement.js");
/* harmony import */ var _components_includes_PaginationComponent_PaginationComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/includes/PaginationComponent/PaginationComponent */ "./components/includes/PaginationComponent/PaginationComponent.js");
/* harmony import */ var _components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/includes/SiteSettingsSetter/SiteSettingsSetter */ "./components/includes/SiteSettingsSetter/SiteSettingsSetter.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_includes_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/includes/Sidebar/Sidebar */ "./components/includes/Sidebar/Sidebar.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;












var tags = function tags(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    style: {}
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(props);

    if (props.identity.categoriesPagesSidebar) {
      setState({
        style: {
          gridArea: 'content'
        }
      });
    }
  }, [props]);
  var renderTags = props.tagsSource.metas.map(function (meta) {
    return __jsx(_components_includes_TagElement_TagElement__WEBPACK_IMPORTED_MODULE_7__["default"], {
      key: meta._id,
      imageUrl: meta.imageUrl,
      noImageUrl: meta.noImageUrl,
      name: meta.name,
      count: meta.count
    });
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_10__["default"], props), __jsx("div", {
    style: state.style,
    className: props.identity.categoriesPageSidebar ? 'content withSidebar' : 'content withOutSidebar'
  }, __jsx("div", null, __jsx("div", {
    className: "tags"
  }, renderTags), __jsx(_components_includes_PaginationComponent_PaginationComponent__WEBPACK_IMPORTED_MODULE_9__["default"], {
    isActive: true,
    currentPage: props.getTagsData.pageNo,
    totalCount: props.tagsSource.totalCount,
    size: props.getTagsData.size,
    maxPage: Math.ceil(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(props.tagsSource.totalCount) / _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(props.getTagsData.size)) - 1,
    queryData: props.query || props.router.query,
    pathnameData: props.pathname || props.router.pathname
  })), __jsx(_components_includes_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_12__["default"], {
    isActive: props.identity.tagsPageSidebar,
    widgets: props.widgets,
    position: "tagsPageSidebar"
  }))));
};

tags.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, navigation, identity, tagsSource, widgets, widgetsData, identityData, navigationData, getTagsData, tagsData;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          _context.next = 3;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["getWidgetsWithData"])('tagsPageSidebar'));

        case 3:
          widgetsData = _context.sent;
          _context.next = 6;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["getSetting"])('identity'));

        case 6:
          identityData = _context.sent;
          _context.next = 9;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["getSetting"])('navigation'));

        case 9:
          navigationData = _context.sent;
          identity = identityData.data.setting ? identityData.data.setting.data : {};
          navigation = navigationData.data.setting ? navigationData.data.setting : {};
          getTagsData = {
            type: 'tag',
            searchForImageIn: 'tags',
            pageNo: _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(query.page) || 1,
            size: _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(query.size) || _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(identity.tagsCountPerPage) || 30,
            sort: query.sort || 'latest'
          };
          _context.next = 15;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_5__["getMeta"])(getTagsData));

        case 15:
          tagsData = _context.sent;
          tagsSource = tagsData.data ? tagsData.data : {
            tags: [],
            totalCount: 0
          };
          widgets = widgetsData.data.widgets ? widgetsData.data.widgets : [];
          return _context.abrupt("return", {
            identity: identity,
            navigation: navigation,
            query: query,
            tagsSource: tagsSource,
            getTagsData: getTagsData,
            pathname: pathname,
            widgets: widgets
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_11___default()(tags));

/***/ })

})
//# sourceMappingURL=tags.js.5d4595bb92bc657032aa.hot-update.js.map