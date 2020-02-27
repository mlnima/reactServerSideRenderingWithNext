webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/adminIncludes/SideBar/SideBar.js":
false,

/***/ "./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.js":
false,

/***/ "./components/adminIncludes/TopBar/AdminTopBar.js":
false,

/***/ "./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.js":
false,

/***/ "./components/layouts/AdminLayout.js":
false,

/***/ "./components/layouts/AppLayout.js":
/*!*****************************************!*\
  !*** ./components/layouts/AppLayout.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _includes_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../includes/Header/Header */ "./components/includes/Header/Header.js");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/styles.scss */ "./styles/styles.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _includes_TopBar_TopBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../includes/TopBar/TopBar */ "./components/includes/TopBar/TopBar.js");
/* harmony import */ var _includes_Header_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../includes/Header/Navigation/Navigation */ "./components/includes/Header/Navigation/Navigation.js");
/* harmony import */ var _includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../includes/Loading/Loading */ "./components/includes/Loading/Loading.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








var AppLayout = function AppLayout(props) {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, __jsx("title", null, "Website Title"), __jsx("meta", {
    name: "theme-color",
    content: "#000000"
  }), __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), __jsx("meta", {
    charSet: "utf-8"
  }), __jsx("link", {
    href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    rel: "stylesheet"
  }), __jsx("meta", {
    name: "description",
    content: "description of the site"
  }), __jsx("meta", {
    name: "keywords",
    content: "key,word,for,SEO"
  }), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico"
  })), __jsx(_includes_TopBar_TopBar__WEBPACK_IMPORTED_MODULE_4__["default"], null), __jsx(_includes_Header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null), __jsx(_includes_Header_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_5__["default"], null), __jsx(_includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__["default"], null), __jsx("div", {
    className: "App"
  }, props.children));
};

/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/date/now.js":
false,

/***/ "./node_modules/core-js/library/fn/date/now.js":
false,

/***/ "./node_modules/core-js/library/modules/es6.date.now.js":
false,

/***/ "./pages/admin/settings/index.js":
false,

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
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
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var _components_includes_Widget_Widget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/includes/Widget/Widget */ "./components/includes/Widget/Widget.js");
/* harmony import */ var _components_includes_Posts_Posts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/includes/Posts/Posts */ "./components/includes/Posts/Posts.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");









var __jsx = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }












var Home = function Home(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_9__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_10__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  var FakeComponentForTest = function FakeComponentForTest() {
    return __jsx("div", null, __jsx("p", null, "test"));
  };

  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__["default"], null, __jsx("div", {
    className: "HomePage"
  }, __jsx("h1", null, "Header 1"), __jsx(_components_includes_Posts_Posts__WEBPACK_IMPORTED_MODULE_13__["default"], {
    posts: props.posts
  })));
};

Home.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, data, posts, identity;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          data = {
            pageNo: query.pageNo ? _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_8___default()(query.pageNo) : 1,
            size: 30,
            totalPosts: 0,
            postType: 'all',
            keyword: '',
            status: 'published',
            author: 'all',
            fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration'],
            checkedPosts: []
          };
          _context.next = 4;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('http://localhost:3000/api/v1/posts/', _objectSpread({}, data)));

        case 4:
          posts = _context.sent;
          _context.next = 7;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_18__["getSetting"])('identity'));

        case 7:
          identity = _context.sent;
          return _context.abrupt("return", {
            posts: posts.data.posts,
            identity: identity
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_14___default()(Home));

/***/ })

})
//# sourceMappingURL=index.js.b97327cf3984d7f192bd.hot-update.js.map