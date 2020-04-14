webpackHotUpdate("static\\development\\pages\\admin\\posts.js",{

/***/ "./components/adminIncludes/PostsComponents/Filters/FilterDropDownActions.js":
/*!***********************************************************************************!*\
  !*** ./components/adminIncludes/PostsComponents/Filters/FilterDropDownActions.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var FilterDropDownActions = function FilterDropDownActions(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  var bulkAction = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var typeToDisplay = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  var onFormatChangeHandler = function onFormatChangeHandler(e) {// if (bulkAction.current.value !== 'none') {
    //     contextData.setState({
    //         ...contextData.state,
    //         loading:true
    //     });
    //     postsBulkAction(contextData.postsData.checkedPosts,bulkAction.current.value).then(()=>{
    //        setData()
    //     }).catch(err=>{
    //         contextData.setState({
    //             ...contextData.state,
    //             loading:false
    //         })
    //     })
    // }
  };

  var changePostsTypeToDisplay = function changePostsTypeToDisplay(e) {
    props.router.push({
      pathname: props.router.pathname,
      query: _objectSpread({}, props.query, {
        type: e.target.value
      })
    }); // if (e.target.value !== 'none') {
    //     contextData.setPostsData({
    //         ...contextData.postsData,
    //         type: e.target.value
    //     })
    // }
  };

  var onEmptyTrashHandler = function onEmptyTrashHandler() {// emptyTrash().then(res=>{
    //     if (res.data.error){
    //         contextData.setState({
    //             ...contextData.state,
    //             report:res.data.message,
    //             reportColor:'red'
    //         })
    //     }else {
    //         contextData.setState({
    //             ...contextData.state,
    //             loading: false
    //         });
    //         setData();
    //         contextData.setState({
    //             ...contextData.state,
    //             report:res.data.message,
    //             reportColor:'green'
    //         })
    //     }
    // }).catch(()=>{
    //     contextData.setState({
    //         ...contextData.state,
    //         report:'Can Not Communicate With Server'
    //     })
    // })
  };

  var EmptyTrash = function EmptyTrash() {
    // if (contextData.postsData.status === 'Trash'){
    //     return (
    //         <button onClick={()=>onEmptyTrashHandler()}>Empty Trash</button>
    //     )
    // }else
    return null;
  };

  return __jsx("div", {
    className: "FilterDropDownActions"
  }, __jsx("div", {
    className: "bulkAction"
  }, __jsx("select", {
    ref: bulkAction,
    placeholder: "Bulk Actions"
  }, __jsx("option", {
    value: "none"
  }, "Bulk Actions"), __jsx("option", {
    value: "Published"
  }, "Published"), __jsx("option", {
    value: "Draft"
  }, "Draft"), __jsx("option", {
    value: "Trash"
  }, "Trash")), __jsx("button", {
    className: "actionBtn",
    onClick: function onClick() {
      return onFormatChangeHandler();
    }
  }, "Apply")), __jsx("div", {
    className: "DateCategoryFormat"
  }, __jsx("select", {
    ref: typeToDisplay,
    onChange: function onChange(e) {
      return changePostsTypeToDisplay(e);
    }
  }, __jsx("option", {
    value: "all"
  }, "All"), __jsx("option", {
    value: "video"
  }, "Video"), __jsx("option", {
    value: "standard"
  }, "Standard"))), __jsx(EmptyTrash, null));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(FilterDropDownActions));

/***/ })

})
//# sourceMappingURL=posts.js.74a9f028420e03fedde2.hot-update.js.map