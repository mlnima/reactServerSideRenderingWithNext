webpackHotUpdate("static\\development\\pages\\admin\\design\\widgets.js",{

/***/ "./pages/admin/design/widgets/index.js":
/*!*********************************************!*\
  !*** ./pages/admin/design/widgets/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var _components_adminIncludes_widgetsModel_AddWidgetMenu_AddWidgetMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu */ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel */ "./components/adminIncludes/widgetsModel/WidgetModel/WidgetModel.js");
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/adminIncludes/design/ColorSection */ "./components/adminIncludes/design/ColorSection.js");



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }










var HomePageWidgets = function HomePageWidgets(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    home: [],
    homePageSidebar: [],
    postPageSidebar: [],
    postsPageSidebar: [],
    footer: [],
    tagsPageSidebar: [],
    categoriesPageSidebar: [],
    actorsPageSidebar: [],
    header: []
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (props.widgets) {
      contextData.dispatchWidgetsSettings(_objectSpread({}, contextData.widgetsSettings, {
        widgets: Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(props.widgets)
      })); //=============
    }
  }, []);
  var renderHomeWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'home') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderHomePageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'homePageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderPostPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'postPageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderPostsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'postsPageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderFooterWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'footer') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderTagsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'tagsPageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderCategoriesPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'categoriesPageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderActorsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'actorsPageSidebar') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  var renderHeaderPageSidebarWidgets = contextData.widgetsSettings.widgets.map(function (widget) {
    if (widget.position === 'header') {
      return __jsx(_components_adminIncludes_widgetsModel_WidgetModel_WidgetModel__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: contextData.widgetsSettings.widgets.indexOf(widget),
        data: widget
      });
    }
  });
  return __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_4__["default"], null, __jsx("h1", null, "Widgets Settings :"), __jsx("h2", null, "Add Widgets:"), __jsx("div", {
    id: "HomePageWidgets"
  }, __jsx("div", {
    className: "sidePanel"
  }, __jsx(_components_adminIncludes_widgetsModel_AddWidgetMenu_AddWidgetMenu__WEBPACK_IMPORTED_MODULE_5__["default"], null)), __jsx("div", {
    className: "widgets"
  }, __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Homepage"), renderHomeWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Header"), renderHeaderPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Home Page Sidebar"), renderHomePageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Post Page"), renderPostPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Posts Page"), renderPostsPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Tags Page"), renderTagsPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Categories Page"), renderCategoriesPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Actors Page"), renderActorsPageSidebarWidgets), __jsx("div", {
    className: "widgetAdminPanelItem"
  }, __jsx("p", {
    className: "widgetAdminPanelItemHeader"
  }, "Footer"), renderFooterWidgets))), __jsx("h2", null, "Color Widget:"), __jsx("div", {
    className: "colorSettingSections"
  }, __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetHeaderBackgroundColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetHeaderTextColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetHeaderRedirectLinkBackgroundColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetHeaderRedirectLinkTextColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetBodyBackgroundColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetBodyTextColor"
  }), __jsx(_components_adminIncludes_design_ColorSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
    designName: "widgetBodyBorder"
  })));
};

HomePageWidgets.getInitialProps = function _callee(_ref) {
  var asPath, pathname, query, req, res, err, domainName, widgets, widgetsData;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          asPath = _ref.asPath, pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;

          if (!req) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_variables__WEBPACK_IMPORTED_MODULE_9__["getAbsolutePath"])(req));

        case 4:
          _context.t0 = _context.sent;
          _context.next = 8;
          break;

        case 7:
          _context.t0 = '';

        case 8:
          domainName = _context.t0;
          _context.next = 11;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_8__["getMultipleWidgetWithData"])({
            widgets: ['all']
          }, false, domainName, Date.now()));

        case 11:
          widgetsData = _context.sent;
          widgets = widgetsData.data.widgets ? widgetsData.data.widgets : [];
          return _context.abrupt("return", {
            widgets: widgets,
            domainName: domainName
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (HomePageWidgets);

/***/ })

})
//# sourceMappingURL=widgets.js.21550f8dbc7dc72cc2f5.hot-update.js.map