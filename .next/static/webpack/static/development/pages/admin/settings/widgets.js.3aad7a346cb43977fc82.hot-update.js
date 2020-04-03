webpackHotUpdate("static\\development\\pages\\admin\\settings\\widgets.js",{

/***/ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js":
/*!******************************************************************************************!*\
  !*** ./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AddWidgetWithPositionMenu_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddWidgetWithPositionMenu.scss */ "./components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetWithPositionMenu.scss");
/* harmony import */ var _AddWidgetWithPositionMenu_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_AddWidgetWithPositionMenu_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models */ "./components/adminIncludes/widgetsModel/AddWidgetMenu/models.js");
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var AddWidgetWithPositionMenu = function AddWidgetWithPositionMenu(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    open: false
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {}, []);

  var onOpenHandler = function onOpenHandler() {
    state.open ? setState(_objectSpread({}, state, {
      open: false
    })) : setState(_objectSpread({}, state, {
      open: true
    }));
  };

  var onAddNewWidget = function onAddNewWidget(position, type) {
    var dataToSave = _models__WEBPACK_IMPORTED_MODULE_4__["widgetModels"];
    dataToSave.position = position;
    dataToSave.type = type;
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_5__["addNewWidget"])(_models__WEBPACK_IMPORTED_MODULE_4__["widgetModels"]).then(function (res) {
      Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_5__["getWidgets"])('home').then(function (res) {
        contextData.dispatchWidgetsSettings({
          widgets: Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(res.data.widgets)
        });
      });
    });
  };

  if (state.open) {
    return __jsx("div", {
      className: "AddWidgetWithPositionMenu"
    }, __jsx("button", {
      className: "positionsOpener",
      onClick: function onClick() {
        return onOpenHandler();
      }
    }, props.type), __jsx("div", {
      className: "AddWidgetWithPositionMenuPositions"
    }, __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('home', props.type);
      }
    }, "Home Page"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('homePageSidebar', props.type);
      }
    }, "Home Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('postPageSidebar', props.type);
      }
    }, "Post Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('postsPageSidebar', props.type);
      }
    }, "Posts Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('tagsPageSidebar', props.type);
      }
    }, "Tags Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('categoriesPageSidebar', props.type);
      }
    }, "Categories Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('actorsPageSidebar', props.type);
      }
    }, "Actors Page Sidebar"), __jsx("button", {
      className: "AddWidgetWithPositionMenuPositionsBtn",
      onClick: function onClick() {
        return onAddNewWidget('footer', props.type);
      }
    }, "Footer")));
  } else {
    return __jsx("div", {
      className: "AddWidgetWithPositionMenu"
    }, __jsx("button", {
      className: "positionsOpener",
      onClick: function onClick() {
        return onOpenHandler();
      }
    }, props.type));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (AddWidgetWithPositionMenu);

/***/ })

})
//# sourceMappingURL=widgets.js.3aad7a346cb43977fc82.hot-update.js.map