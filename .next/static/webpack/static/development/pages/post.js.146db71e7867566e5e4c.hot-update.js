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


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;










var Post = function Post(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, null, __jsx("title", null, props.post.title), __jsx("meta", {
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
  })), __jsx("div", {
    className: "post"
  }, __jsx(_components_includes_Post_PostSidebar_PostSidebar__WEBPACK_IMPORTED_MODULE_9__["default"], null), __jsx("div", {
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
  })))));
};

Post.getInitialProps = function _callee(_ref) {
  var pathname, query, req, res, err, post, body, postData;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathname = _ref.pathname, query = _ref.query, req = _ref.req, res = _ref.res, err = _ref.err;
          body = {
            postTitle: query.postTitle
          };
          _context.prev = 2;
          _context.next = 5;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:3000/api/v1/posts/post', body));

        case 5:
          postData = _context.sent;
          post = postData.data.post;
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);

        case 12:
          return _context.abrupt("return", {
            post: post,
            query: query
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default()(Post));

/***/ })

})
//# sourceMappingURL=post.js.146db71e7867566e5e4c.hot-update.js.map