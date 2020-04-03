webpackHotUpdate("static\\development\\pages\\admin\\settings\\widgets.js",{

/***/ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu.js":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ "./components/adminIncludes/widgetsModel/AddWidgetMenu/models.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AddWidgetWithPositionMenu */ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;






var AddWidgetMenu = function AddWidgetMenu(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {}, []);

  var onAddNewWidget = function onAddNewWidget(position, type) {
    var dataToSave = _models__WEBPACK_IMPORTED_MODULE_2__["widgetModels"];
    dataToSave.position = position;
    dataToSave.type = type;
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["addNewWidget"])(_models__WEBPACK_IMPORTED_MODULE_2__["widgetModels"]).then(function (res) {
      Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["getWidgets"])('home').then(function (res) {
        contextData.dispatchWidgetsSettings({
          widgets: Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(res.data.widgets)
        });
      });
    });
  };

  return __jsx("div", {
    className: "AddWidgetMenu"
  }, __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('home', 'text');
    }
  }, "Add Widget To Home"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('homePageSidebar', 'text');
    }
  }, "Add Widget To Home Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('postPageSidebar', 'text');
    }
  }, "Add Widget To Post Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('postsPageSidebar', 'text');
    }
  }, "Add Widget To Posts Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('tagsPageSidebar', 'text');
    }
  }, "Add Widget To Tags Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('categoriesPageSidebar', 'text');
    }
  }, "Add Widget To Categories Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('actorsPageSidebar', 'text');
    }
  }, "Add Widget To Actors Page Sidebar"), __jsx("button", {
    onClick: function onClick() {
      return onAddNewWidget('footer', 'text');
    }
  }, "Add Widget To Footer"), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "text"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AddWidgetMenu); // image recentComments search tagCloud categoriesCloud video navigationMenu

/***/ }),

/***/ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js":
/*!******************************************************************************************!*\
  !*** ./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var AddWidgetWithPositionMenu = function AddWidgetWithPositionMenu(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    open: false
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);

  if (state.open) {
    return __jsx("div", {
      className: "AddWidgetWithPositionMenu"
    }, __jsx("button", null, props.type), __jsx("div", {
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
//# sourceMappingURL=widgets.js.0d5c0f651291cbee3743.hot-update.js.map