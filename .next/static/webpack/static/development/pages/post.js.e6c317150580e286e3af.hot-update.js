webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./pages/post/index.js":
/*!*****************************!*\
  !*** ./pages/post/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var _components_includes_Post_Iframe_Iframe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/includes/Post/Iframe/Iframe */ "./components/includes/Post/Iframe/Iframe.js");
/* harmony import */ var _components_includes_Post_PostInfo_PostInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/includes/Post/PostInfo/PostInfo */ "./components/includes/Post/PostInfo/PostInfo.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_includes_Post_PostSidebar_PostSidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/includes/Post/PostSidebar/PostSidebar */ "./components/includes/Post/PostSidebar/PostSidebar.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/includes/SiteSettingsSetter/SiteSettingsSetter */ "./components/includes/SiteSettingsSetter/SiteSettingsSetter.js");
/* harmony import */ var _components_includes_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/includes/Sidebar/Sidebar */ "./components/includes/Sidebar/Sidebar.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;














var Post = function Post(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_12__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    style: {}
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(props);

    if (props.identity.postPageSidebar) {
      setState({
        style: {
          gridArea: 'content'
        }
      });
    }
  }, [props]);

  var RenderMeta = function RenderMeta() {
    if (props.post.title) {
      return __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, null, __jsx("title", null, props.post.title), __jsx("meta", {
        name: "description",
        content: props.post.description
      }), __jsx("meta", {
        name: "keywords",
        content: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(props.post.tags), Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(props.post.categories), Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(props.post.actors))
      }), __jsx("meta", {
        property: "og:title",
        content: props.post.title
      }), __jsx("meta", {
        property: "og:type",
        content: props.post.postType === 'video' ? props.post.postType + '.' + 'movies' : props.post.postType
      }), __jsx("meta", {
        property: "og:url",
        content: props.post.videoEmbedCode
      }), __jsx("meta", {
        property: "og:image",
        content: props.post.mainThumbnail
      }));
    } else return null;
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_13__["default"], props), __jsx(RenderMeta, null), __jsx("div", {
    style: state.style,
    className: props.identity.postPageSidebar ? 'post withSidebar' : 'post withOutSidebar'
  }, __jsx("div", {
    className: "main"
  }, __jsx(_components_includes_Post_Iframe_Iframe__WEBPACK_IMPORTED_MODULE_6__["default"], {
    iframeCode: props.post.videoEmbedCode,
    meta: {
      description: props.post.description,
      title: props.post.title,
      duration: props.post.duration,
      thumbnailUrl: props.post.mainThumbnail,
      embedURL: props.post.videoEmbedCode,
      uploadDate: props.post.lastModify
    }
  }), __jsx(_components_includes_Post_PostInfo_PostInfo__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: props.post.title,
    description: props.post.description,
    tags: props.post.tags,
    actors: props.post.actors,
    categories: props.post.categories,
    id: props.post._id,
    likes: props.post.likes,
    disLikes: props.post.disLikes,
    views: props.post.views,
    videoEmbedCode: props.post.videoEmbedCode
  })), __jsx(_components_includes_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_14__["default"], {
    isActive: props.identity.postPageSidebar,
    widgets: props.widgets,
    position: "postPageSidebar"
  }))));
};

Post.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, post, navigation, identity, widgets, identityData, navigationData, widgetsData, postBody, postData;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          _context.next = 3;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_11__["getSetting"])('identity'));

        case 3:
          identityData = _context.sent;
          _context.next = 6;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_11__["getSetting"])('navigation'));

        case 6:
          navigationData = _context.sent;
          _context.next = 9;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_11__["getWidgetsWithData"])('postPageSidebar'));

        case 9:
          widgetsData = _context.sent;
          postBody = {
            postTitle: query.postTitle
          };
          _context.next = 13;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:3000/api/v1/posts/post', postBody));

        case 13:
          postData = _context.sent;
          post = postData.data.post;
          navigation = navigationData.data.setting ? navigationData.data.setting : {};
          identity = identityData.data.setting ? identityData.data.setting.data : {};
          widgets = widgetsData.data.widgets ? widgetsData.data.widgets : [];
          return _context.abrupt("return", {
            post: post,
            query: query,
            navigation: navigation,
            identity: identity,
            widgets: widgets
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default()(Post));

/***/ })

})
//# sourceMappingURL=post.js.e6c317150580e286e3af.hot-update.js.map