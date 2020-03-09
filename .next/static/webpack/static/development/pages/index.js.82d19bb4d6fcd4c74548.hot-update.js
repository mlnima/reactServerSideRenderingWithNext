webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./context/AppContext.js":
/*!*******************************!*\
  !*** ./context/AppContext.js ***!
  \*******************************/
/*! exports provided: AppContext, AppProviderWithRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return AppContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppProviderWithRouter", function() { return AppProviderWithRouter; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! jsonwebtoken */ "./node_modules/jsonwebtoken/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);









var __jsx = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }






var AppContext = react__WEBPACK_IMPORTED_MODULE_9___default.a.createContext();

var AppProvider = function AppProvider(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    loading: false,
    videoPreviewID: ''
  }),
      state = _useState[0],
      dispatchState = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    title: 'site title',
    themeColor: '#000',
    description: 'site description',
    keywords: []
  }),
      siteIdentity = _useState2[0],
      dispatchSiteIdentity = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    adminPanelSideBar: false,
    test: false
  }),
      settings = _useState3[0],
      dispatchSettings = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({}),
      userData = _useState4[0],
      dispatchUserData = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])([]),
      navigationData = _useState5[0],
      dispatchNavigationData = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    categories: [],
    actors: [],
    tags: [],
    title: '',
    author: '',
    description: '',
    disLikes: 0,
    mainThumbnail: '',
    videoTrailerUrl: '',
    videoEmbedCode: '',
    likes: 0,
    quality: '',
    status: '',
    postType: '',
    sourceSite: '',
    views: 0
  }),
      editingPostData = _useState6[0],
      dispatchEditingPostData = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])([]),
      adminPosts = _useState7[0],
      dispatchAdminPosts = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    pageNo: 1,
    size: 30,
    totalPosts: 0,
    postType: 'all',
    keyword: '',
    status: 'all',
    author: 'all',
    fields: ['author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories'],
    checkedPosts: []
  }),
      adminPostsData = _useState8[0],
      dispatchAdminPostsData = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    homeWidgets: []
  }),
      widgetsSettings = _useState9[0],
      dispatchWidgetsSettings = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])([]),
      Posts = _useState10[0],
      dispatchPosts = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    pageNo: 1,
    size: 12,
    totalPosts: 0,
    postType: 'all',
    keyword: '',
    status: 'all',
    author: 'all',
    fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration'],
    checkedPosts: []
  }),
      videoPostsDataForClient = _useState11[0],
      dispatchVideoPostsDataForClient = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    getAndSetUserInfo: function getAndSetUserInfo() {
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.async(function getAndSetUserInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!localStorage.wt) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/users/getUserInfo', {
                token: localStorage.wt
              }).then(function (res) {
                dispatchUserData(_objectSpread({}, userData, {}, res.data.userData));
              })["catch"](function (err) {
                console.log(err);
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    logOutUser: function logOutUser() {
      localStorage.removeItem('wt');
      dispatchUserData({});
      props.router.push('/');
    },
    goToAdminPanel: function goToAdminPanel() {
      props.router.push('/admin');
    },
    goToHomePage: function goToHomePage() {// props.router.push('/')
    },
    savePosts: function savePosts(data) {
      var body;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.async(function savePosts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              body = {
                postData: data,
                token: localStorage.wt
              };
              return _context2.abrupt("return", axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts/createNewPost', body));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    updatePost: function updatePost(data) {
      var body;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.async(function updatePost$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              body = {
                postData: data,
                token: localStorage.wt
              };
              return _context3.abrupt("return", axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts/updatePost', body));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    getPosts: function getPosts(data) {
      var body;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.async(function getPosts$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              body = _objectSpread({}, data);
              _context4.next = 3;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts', body));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //exported to variables file ----
    getPost: function getPost(_id) {
      var body;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.async(function getPost$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              body = {
                _id: _id,
                token: localStorage.wt
              };
              _context5.next = 3;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts/post', body));

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    setEditingPostData: function setEditingPostData(name, value) {
      dispatchEditingPostData(function (editingPostData) {
        return _objectSpread({}, editingPostData, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])({}, name, value));
      });
    },
    bulkActionPost: function bulkActionPost(ids, status) {
      dispatchState(_objectSpread({}, state, {
        loading: true
      }));
      var body = {
        ids: ids,
        status: status,
        token: localStorage.wt
      };
      axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts/postsBulkAction', body).then(function () {
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      })["catch"](function () {
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      });
    },
    deletePost: function deletePost(id) {
      var body = {
        _id: id,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_12___default.a.post('/api/v1/posts/deletePost', body);
    },
    likeValueCalculator: function likeValueCalculator(likes, dislikes) {
      var finalValue = 0;

      if (likes > 0 && dislikes > 0) {
        var total = likes + dislikes;
        var likesTo100 = likes * 100;
        var value = Math.round(likesTo100 / total);
        finalValue = value;
      }

      if (likes === 0 && dislikes === 0) {
        finalValue = 0;
      }

      if (likes === 0 && dislikes > 0) {
        finalValue = 0;
      }

      if (likes > 0 && dislikes === 0) {
        finalValue = 100;
      }

      return finalValue;
    }
  }),
      functions = _useState12[0],
      dispatchFunctions = _useState12[1];

  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    functions.getAndSetUserInfo();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    if (props.router.pathname === '/admin/posts') {
      functions.getPosts(adminPostsData).then(function (res) {
        dispatchAdminPosts(res.data.posts);
        dispatchAdminPostsData(_objectSpread({}, adminPostsData, {
          totalPosts: _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(res.data.totalCount)
        }));
      });
    }
  }, [props.router.pathname, adminPostsData.pageNo, adminPostsData.size, adminPostsData.postType, adminPostsData.keyword, adminPostsData.status, adminPostsData.fields]);
  return __jsx("div", null, __jsx(AppContext.Provider, {
    value: {
      state: state,
      dispatchState: dispatchState,
      settings: settings,
      dispatchSettings: dispatchSettings,
      userData: userData,
      dispatchUserData: dispatchUserData,
      functions: functions,
      editingPostData: editingPostData,
      dispatchEditingPostData: dispatchEditingPostData,
      adminPosts: adminPosts,
      dispatchAdminPosts: dispatchAdminPosts,
      adminPostsData: adminPostsData,
      dispatchAdminPostsData: dispatchAdminPostsData,
      videoPostsDataForClient: videoPostsDataForClient,
      dispatchVideoPostsDataForClient: dispatchVideoPostsDataForClient,
      navigationData: navigationData,
      dispatchNavigationData: dispatchNavigationData,
      dispatchSiteIdentity: dispatchSiteIdentity,
      siteIdentity: siteIdentity,
      widgetsSettings: widgetsSettings,
      dispatchWidgetsSettings: dispatchWidgetsSettings
    }
  }, props.children));
};

var AppProviderWithRouter = Object(next_router__WEBPACK_IMPORTED_MODULE_13__["withRouter"])(AppProvider); //"dev": "nodemon -w ./server/server.js ./server/server.js",

/***/ })

})
//# sourceMappingURL=index.js.82d19bb4d6fcd4c74548.hot-update.js.map