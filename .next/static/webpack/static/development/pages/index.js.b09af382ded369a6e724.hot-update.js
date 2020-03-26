webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var _components_includes_Widget_Widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/includes/Widget/Widget */ "./components/includes/Widget/Widget.js");
/* harmony import */ var _components_includes_Posts_Posts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/includes/Posts/Posts */ "./components/includes/Posts/Posts.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _components_includes_Widget_WidgetsModelsComponents_Text_Text__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/includes/Widget/WidgetsModelsComponents/Text/Text */ "./components/includes/Widget/WidgetsModelsComponents/Text/Text.js");
/* harmony import */ var _components_includes_PaginationComponent_PaginationComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/includes/PaginationComponent/PaginationComponent */ "./components/includes/PaginationComponent/PaginationComponent.js");
/* harmony import */ var _components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/includes/SiteSettingsSetter/SiteSettingsSetter */ "./components/includes/SiteSettingsSetter/SiteSettingsSetter.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;














var Home = function Home(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    title: props.identity.title || '',
    themeColor: props.identity.themeColor || '',
    description: props.identity.description || '',
    keywords: props.identity.keywords || [],
    homePageH1: props.identity.homePageH1 || 'H1 element'
  }),
      state = _useState[0],
      setState = _useState[1]; // useEffect(() => {
  //     if (props.navigation) {
  //         contextData.dispatchNavigationData(props.navigation.data)
  //     }
  //     if (props.identity) {
  //         contextData.dispatchSiteIdentity(siteIdentity => ({
  //             ...siteIdentity,
  //             ...props.identity
  //         }))
  //     }
  // }, [ props ]);


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  var renderWidgets = props.widgets.map(function (widget) {
    switch (widget.type) {
      case 'posts':
        return __jsx(_components_includes_Widget_Widget__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: widget._id,
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          component: _components_includes_Posts_Posts__WEBPACK_IMPORTED_MODULE_5__["default"],
          posts: widget.posts,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle,
          pagination: widget.pagination
        });
        break;

      case 'text':
        return __jsx(_components_includes_Widget_Widget__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: widget._id,
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          title: widget.title,
          mainLinkUrl: "/posts/",
          redirectToTitle: "More videos"
        });
        break;

      default:
        break;
    }
  });
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_13__["default"], props), __jsx("div", {
    className: "HomePage"
  }, __jsx("h1", null, state.homePageH1), renderWidgets));
};

Home.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, navigation, identity, widgets, identityData, navigationData, widgetsData;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          _context.prev = 1;
          _context.next = 4;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_10__["getSetting"])('identity'));

        case 4:
          identityData = _context.sent;
          _context.next = 7;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_10__["getSetting"])('navigation'));

        case 7:
          navigationData = _context.sent;
          _context.next = 10;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_10__["getWidgetsWithData"])('all'));

        case 10:
          widgetsData = _context.sent;
          identity = identityData.data.setting ? identityData.data.setting.data : {};
          navigation = navigationData.data.setting ? navigationData.data.setting : {};
          widgets = widgetsData.data.widgets ? widgetsData.data.widgets : [];
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 19:
          return _context.abrupt("return", {
            identity: identity,
            navigation: navigation,
            widgets: widgets
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_6___default()(Home));

/***/ })

})
//# sourceMappingURL=index.js.b09af382ded369a6e724.hot-update.js.map