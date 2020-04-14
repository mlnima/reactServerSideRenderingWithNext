webpackHotUpdate("static\\development\\pages\\admin\\fileManager.js",{

/***/ "./pages/admin/fileManager/index.js":
/*!******************************************!*\
  !*** ./pages/admin/fileManager/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var _components_adminIncludes_FileManagerComponents_FileManagerControl_FileManagerControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl */ "./components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl.js");
/* harmony import */ var _components_adminIncludes_FileManagerComponents_FileManagerArea_FileManagerArea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea */ "./components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea.js");
/* harmony import */ var _variables_ajaxFilesVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_variables/_ajaxFilesVariables */ "./_variables/_ajaxFilesVariables.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_adminIncludes_FileManagerComponents_UploadedPopView_UploadedPopView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView */ "./components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








 ///static/uploads/image/2020/4/706185_561483320532764_1215505165_o.jpg

var fileManager = function fileManager(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    path: '.',
    prevPath: '.',
    files: [],
    clickedItem: '',
    clickedItemName: '',
    file: '',
    editFile: false,
    action: '',
    _do: '',
    // AlertBox:false,
    DeleteAlertBox: false,
    confirm: Date.now(),
    message: '',
    report: '',
    inputBox: false,
    newItemName: ''
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    // setState({
    //     ...state,
    //     prevPath: state.path
    // })
    setData();
  }, [state.path]);

  var setData = function setData() {
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: true
    }));
    Object(_variables_ajaxFilesVariables__WEBPACK_IMPORTED_MODULE_5__["readPath"])(state.path).then(function (res) {
      // console.log(res.data.type )
      if (res.data.type === 'dir') {
        setState(_objectSpread({}, state, {
          files: res.data.data // prevPath: path

        }));
        contextData.dispatchState(_objectSpread({}, contextData.state, {
          loading: false
        }));
      } else if (res.data.type === 'file') {
        setState(_objectSpread({}, state, {
          clickedItem: state.path,
          path: state.prevPath
        })); // contextData.dispatchSettings({
        //     ...contextData.settings,
        //     textEditorCurrentFile: res.data.data
        // })

        contextData.dispatchState(_objectSpread({}, contextData.state, {
          loading: false
        })); // props.router.push('/admin/fileManager/textEditor')
      } else {
        setState(_objectSpread({}, state, {
          error: true
        }));
        contextData.dispatchState(_objectSpread({}, contextData.state, {
          loading: false
        }));
      }
    })["catch"](function (err) {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        loading: false
      }));
    });
  };

  var setStateHandler = function setStateHandler(key, value) {
    setState(_objectSpread({}, state, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, key, value)));
  };

  return __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, __jsx(_components_adminIncludes_FileManagerComponents_UploadedPopView_UploadedPopView__WEBPACK_IMPORTED_MODULE_8__["default"], {
    clickedItem: state.clickedItem,
    setStateHandler: setStateHandler,
    state: state,
    setState: setState
  }), __jsx("div", {
    className: "fileManager"
  }, __jsx(_components_adminIncludes_FileManagerComponents_FileManagerControl_FileManagerControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
    setStateHandler: setStateHandler,
    data: state,
    state: state,
    setState: setState
  }), __jsx(_components_adminIncludes_FileManagerComponents_FileManagerArea_FileManagerArea__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setStateHandler: setStateHandler,
    data: state,
    state: state,
    setState: setState
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_7___default()(fileManager));

/***/ })

})
//# sourceMappingURL=fileManager.js.0a596c8eb028ee0fb0b7.hot-update.js.map