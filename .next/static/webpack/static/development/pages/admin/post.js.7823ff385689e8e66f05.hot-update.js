webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./pages/admin/post/index.js":
/*!***********************************!*\
  !*** ./pages/admin/post/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/layouts/AdminLayout */ "./components/layouts/AdminLayout.js");
/* harmony import */ var _components_adminIncludes_PostComponents_TitleDescription_TitleDescription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription */ "./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.js");
/* harmony import */ var _components_adminIncludes_PostComponents_ActionOnPost_ActionOnPost__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost */ "./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js");
/* harmony import */ var _components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget */ "./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_adminIncludes_PostComponents_Format_Format__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/Format/Format */ "./components/adminIncludes/PostComponents/Format/Format.js");
/* harmony import */ var _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors */ "./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.js");
/* harmony import */ var _components_adminIncludes_PostComponents_VideoInformation_VideoInformation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation */ "./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_adminIncludes_PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/TextInputWithUploadBtn/TextInputWithUploadBtn */ "./components/adminIncludes/PostComponents/TextInputWithUploadBtn/TextInputWithUploadBtn.js");
/* harmony import */ var _components_adminIncludes_PostComponents_ImagePreview_ImagePreview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/adminIncludes/PostComponents/ImagePreview/ImagePreview */ "./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../server/tools/dataDecoder */ "./server/tools/dataDecoder.js");
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_17__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


















var Index = function Index(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_9__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    tags: [],
    categories: [],
    actors: [],
    inSlideShow: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var onChangeHandler = function onChangeHandler(e) {
    setState(_objectSpread({}, state, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, e.target.name, e.target.value)));
  };

  var onPostMetaChangeHandler = function onPostMetaChangeHandler(type, data) {
    setState(_objectSpread({}, state, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, type, data)));
  };

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (props.router.query["new"] && state._id) {
      props.router.reload();
    } else {
      setState(props.post);
    }
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(props.router);
  }, [props]);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx(_components_layouts_AdminLayout__WEBPACK_IMPORTED_MODULE_5__["default"], null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_16___default.a, {
    href: "/admin/post?new=1"
  }, __jsx("a", {
    className: "newPostLinkAdminPanel"
  }, "New Post")), __jsx("div", {
    className: "Post"
  }, __jsx("div", {
    className: "content"
  }, __jsx(_components_adminIncludes_PostComponents_TitleDescription_TitleDescription__WEBPACK_IMPORTED_MODULE_6__["default"], {
    postData: state,
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn__WEBPACK_IMPORTED_MODULE_14__["default"], {
    postData: state,
    onChangeHandler: onChangeHandler,
    name: "mainThumbnail",
    title: "Main thumbnail"
  }), __jsx(_components_adminIncludes_PostComponents_ImagePreview_ImagePreview__WEBPACK_IMPORTED_MODULE_15__["default"], {
    postData: state
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    component: _components_adminIncludes_PostComponents_VideoInformation_VideoInformation__WEBPACK_IMPORTED_MODULE_12__["default"],
    title: "Video Information",
    onChangeHandler: onChangeHandler
  })), __jsx("div", {
    className: "side"
  }, __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    component: _components_adminIncludes_PostComponents_ActionOnPost_ActionOnPost__WEBPACK_IMPORTED_MODULE_7__["default"],
    title: state.status,
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    component: _components_adminIncludes_PostComponents_Format_Format__WEBPACK_IMPORTED_MODULE_10__["default"],
    title: "Format",
    onChangeHandler: onChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    isNewPost: props.query["new"] === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_11__["default"],
    type: "categories",
    title: "Post Category",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    isNewPost: props.query["new"] === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_11__["default"],
    type: "tags",
    title: "Post Tags",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  }), __jsx(_components_adminIncludes_PostComponents_DropDownWidget_DropDownWidget__WEBPACK_IMPORTED_MODULE_8__["default"], {
    postData: state,
    isNewPost: props.query["new"] === 'true',
    component: _components_adminIncludes_PostComponents_PostCategoriesTagsActors_PostCategoriesTagsActors__WEBPACK_IMPORTED_MODULE_11__["default"],
    type: "actors",
    title: "Post Actors",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  })))));
};

Index.getInitialProps = function _callee(_ref) {
  var query, req, domainName, post, postData, requestBody, newPostData;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.query, req = _ref.req;

          if (!req) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_variables__WEBPACK_IMPORTED_MODULE_4__["getAbsolutePath"])(req));

        case 4:
          _context.t0 = _context.sent;
          _context.next = 8;
          break;

        case 7:
          _context.t0 = '';

        case 8:
          domainName = _context.t0;
          newPostData = {
            status: 'published',
            postType: 'video',
            tags: [],
            categories: [],
            actors: [],
            inSlideShow: false,
            quality: '2160p',
            views: 0,
            likes: 0,
            disLikes: 0
          };

          if (!query["new"]) {
            _context.next = 14;
            break;
          }

          post = newPostData;
          _context.next = 20;
          break;

        case 14:
          if (!(query.postTitle || query.id)) {
            _context.next = 20;
            break;
          }

          requestBody = {
            postTitle: query.postTitle,
            _id: query.id
          };
          _context.next = 18;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_3__["getPost"])(requestBody, true, domainName));

        case 18:
          postData = _context.sent;
          post = postData.data ? _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_17___default()(postData.data.post).post : newPostData;

        case 20:
          return _context.abrupt("return", {
            post: post,
            query: query
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_13___default()(Index));

/***/ })

})
//# sourceMappingURL=post.js.7823ff385689e8e66f05.hot-update.js.map