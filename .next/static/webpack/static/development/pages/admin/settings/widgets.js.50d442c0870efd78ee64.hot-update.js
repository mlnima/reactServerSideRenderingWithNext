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
  }, __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "text",
    name: "Text"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "posts",
    name: "Posts"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "recentComments",
    name: "Recent Comments"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "search",
    name: "Search"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "tagsCloud",
    name: "Tags Cloud"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "video",
    name: "Video"
  }), __jsx(_AddWidgetWithPositionMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: "navigationMenu",
    name: "Navigation Menu"
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
    }, props.name), __jsx("div", {
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
    }, props.name));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (AddWidgetWithPositionMenu);

/***/ }),

/***/ "./components/adminIncludes/widgetsModel/WidgetModel/WidgetModel.js":
/*!**************************************************************************!*\
  !*** ./components/adminIncludes/widgetsModel/WidgetModel/WidgetModel.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var WidgetModel = function WidgetModel(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"]);
  var title = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var categories = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var tags = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var count = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var pagination = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var redirectLink = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    title: props.data.title || '',
    categories: props.data.categories || [],
    tags: props.data.tags || [],
    count: props.data.count || 6,
    pagination: props.data.pagination || false,
    redirectLink: props.data.redirectLink || '',
    redirectToTitle: props.data.redirectToTitle || '',
    type: props.data.type || 'posts',
    position: props.data.position || 'home',
    sortBy: props.data.sortBy || '-id',
    text: props.data.text || '',
    textAlign: props.data.text || 'center',
    customHtml: props.data.customHtml || ''
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    open: false
  }),
      widgetSettings = _useState2[0],
      setWidgetSettings = _useState2[1];

  var onOpenHandler = function onOpenHandler() {
    widgetSettings.open ? setWidgetSettings(_objectSpread({}, widgetSettings, {
      open: false
    })) : setWidgetSettings(_objectSpread({}, widgetSettings, {
      open: true
    }));
  };

  var onDeleteHandler = function onDeleteHandler() {
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["deleteWidgets"])(props.data._id).then(function () {
      contextData.dispatchWidgetsSettings({
        widgets: contextData.widgetsSettings.widgets.filter(function (w) {
          return w._id !== props.data._id;
        })
      });
    });
  };

  var onSaveHandler = function onSaveHandler() {
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["updateWidgets"])(props.data._id, state).then(function (res) {
      // let newData = res.data.updatedWidgets
      // setState({ ...state, ...newData })
      Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_4__["getWidgets"])('all').then(function (res) {
        contextData.dispatchWidgetsSettings({
          widgets: Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(res.data.widgets)
        });
      });
    });
  };

  var onChangeHandler = function onChangeHandler(e) {
    setState(_objectSpread({}, state, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, e.target.name, e.target.value)));
  };

  var onNewCategoryAddHandler = function onNewCategoryAddHandler() {
    setState(_objectSpread({}, state, {
      categories: [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.categories), [categories.current.value])
    }));
    categories.current.value = '';
  };

  var onNewTagAddHandler = function onNewTagAddHandler() {
    setState(_objectSpread({}, state, {
      tags: [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.tags), [tags.current.value])
    }));
    tags.current.value = '';
  };

  var deleteTagHandler = function deleteTagHandler(e) {
    setState(_objectSpread({}, state, {
      tags: state.tags.filter(function (tag) {
        return tag !== e.target.name;
      })
    }));
  };

  var deleteCategoryHandler = function deleteCategoryHandler(e) {
    setState(_objectSpread({}, state, {
      categories: state.categories.filter(function (category) {
        return category !== e.target.name;
      })
    }));
  };

  var renderTags = state.tags.map(function (tag) {
    return __jsx("button", {
      name: tag,
      onClick: function onClick(e) {
        return deleteTagHandler(e);
      }
    }, tag, "X");
  });
  var renderCategories = state.categories.map(function (category) {
    return __jsx("button", {
      name: category,
      onClick: function onClick(e) {
        return deleteCategoryHandler(e);
      }
    }, category, "X");
  });
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    setTimeout(function () {
      var items = ['count'];
      items.forEach(function (item) {
        if ([item].current) {
          [item].current.value = state[item];
        }
      });
    }, 2000);
  }, []);

  var RenderOptionByFormat = function RenderOptionByFormat() {
    switch (state.type) {
      case 'posts':
        return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx("p", null, "Sort By:"), __jsx("select", {
          name: "sortBy",
          value: state.sortBy,
          onChange: function onChange(e) {
            return onChangeHandler(e);
          }
        }, __jsx("option", {
          value: "id"
        }, "ID"), __jsx("option", {
          value: "views"
        }, "Views"), __jsx("option", {
          value: "likes"
        }, "Likes")), __jsx("p", null, "Categories:"), __jsx("div", {
          className: "inputWithAddBtn"
        }, __jsx("input", {
          ref: categories,
          name: "category",
          className: "category",
          placeholder: "Categories"
        }), __jsx("button", {
          onClick: function onClick() {
            return onNewCategoryAddHandler();
          }
        }, "add")), __jsx("div", {
          className: "categoriesTags"
        }, renderCategories), __jsx("p", null, "Tags:"), __jsx("div", {
          className: "inputWithAddBtn"
        }, __jsx("input", {
          ref: tags,
          className: "tags",
          name: "tags",
          placeholder: "Tags"
        }), __jsx("button", {
          onClick: function onClick() {
            return onNewTagAddHandler();
          }
        }, "add")), __jsx("div", {
          className: "categoriesTags"
        }, renderTags), __jsx("p", null, "Count:"), __jsx("input", {
          ref: count,
          name: "count",
          type: "number",
          className: "count",
          placeholder: "count",
          value: state.count,
          onChange: function onChange(e) {
            return onChangeHandler(e);
          }
        }), __jsx("span", null, "Pagination:"), __jsx("select", {
          name: "pagination",
          value: state.pagination,
          onChange: function onChange(e) {
            return onChangeHandler(e);
          }
        }, __jsx("option", {
          value: false
        }, "false"), __jsx("option", {
          value: true
        }, "true")));
        break;

      case 'text':
        return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
        break;

      default:
        return null;
        break;
    }
  };

  if (widgetSettings.open) {
    return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx("div", {
      className: "widget-open-control"
    }, __jsx("p", null, props.data.title || props.data.type), __jsx("button", {
      onClick: function onClick() {
        return onOpenHandler();
      }
    }, widgetSettings.open ? 'close' : 'open')), __jsx("div", {
      className: "widgetModel"
    }, __jsx("div", {
      className: "widgetInfo"
    }, __jsx("label", {
      className: "widgetId"
    }, __jsx("p", null, "ID :"), " ", __jsx("p", null, props.data._id))), __jsx("p", null, "Title:"), __jsx("input", {
      name: "title",
      ref: title,
      className: "title",
      placeholder: "Title",
      value: state.title,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }), __jsx("p", null, "Type:"), __jsx("select", {
      name: "type",
      value: state.type,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }, __jsx("option", {
      value: "posts"
    }, "Posts"), __jsx("option", {
      value: "text"
    }, "Text"), __jsx("option", {
      value: "recentComments"
    }, "Recent Comments"), __jsx("option", {
      value: "search"
    }, "Search"), __jsx("option", {
      value: "tagsCloud"
    }, "Tags Cloud"), __jsx("option", {
      value: "video"
    }, "Video"), __jsx("option", {
      value: "navigationMenu"
    }, "Navigation Menu")), __jsx("p", null, "Position:"), __jsx("select", {
      name: "position",
      value: state.position,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }, __jsx("option", {
      value: "home"
    }, "Home"), __jsx("option", {
      value: "homePageSidebar"
    }, "Home Page Sidebar"), __jsx("option", {
      value: "postPageSidebar"
    }, "Post Page SideBar"), __jsx("option", {
      value: "postsPageSidebar"
    }, "Posts Page SideBar"), __jsx("option", {
      value: "categoriesPageSidebar"
    }, "Categories Page SideBar"), __jsx("option", {
      value: "tagsPagesSidebar"
    }, "Tags Page SideBar"), __jsx("option", {
      value: "actorsPagesSidebar"
    }, "Actors Page SideBar"), __jsx("option", {
      value: "footer"
    }, "footer")), __jsx("p", null, "Text:"), __jsx("textarea", {
      name: "text",
      value: state.text,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }), __jsx("p", null, "Text Align:"), __jsx("select", {
      name: "textAlign",
      value: state.textAlign,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }, __jsx("option", {
      value: "left"
    }, "Left"), __jsx("option", {
      value: "center"
    }, "Center"), __jsx("option", {
      value: "right"
    }, "Right")), __jsx(RenderOptionByFormat, null), __jsx("p", null, "Redirect Link:"), __jsx("input", {
      className: "redirectLink",
      name: "redirectLink",
      placeholder: "Redirect",
      value: state.redirectLink,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }), __jsx("p", null, "Title for Redirect Link"), __jsx("input", {
      className: "redirectToTitle",
      name: "redirectToTitle",
      placeholder: "Title for Redirect Link",
      value: state.redirectToTitle,
      onChange: function onChange(e) {
        return onChangeHandler(e);
      }
    }), __jsx("div", {
      className: "control"
    }, __jsx("button", {
      onClick: function onClick() {
        return onSaveHandler();
      }
    }, "Save"), __jsx("button", {
      onClick: function onClick() {
        return onDeleteHandler();
      }
    }, "Delete"))));
  } else {
    return __jsx("div", {
      className: "widget-open-control"
    }, __jsx("p", null, props.data.title || props.data.type), __jsx("button", {
      onClick: function onClick() {
        return onOpenHandler();
      }
    }, widgetSettings.open ? 'close' : 'open'));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetModel);

/***/ })

})
//# sourceMappingURL=widgets.js.50d442c0870efd78ee64.hot-update.js.map