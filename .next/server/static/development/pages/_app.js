module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/global/fontawesome/fontawesome.js":
/*!******************************************************!*\
  !*** ./components/global/fontawesome/fontawesome.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "@fortawesome/fontawesome-svg-core");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__);
// import the library
 // import your icons



_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCode"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faHighlighter"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faEye"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faClock"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faEuroSign"] // more icons go here
);

/***/ }),

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jwt-decode */ "jwt-decode");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../server/tools/dataDecoder */ "./server/tools/dataDecoder.js");
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../server/tools/dataEncoder */ "./server/tools/dataEncoder.js");
/* harmony import */ var _server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const AppContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();

const AppProvider = props => {
  const {
    0: state,
    1: dispatchState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    loading: false,
    videoPreviewID: '',
    activeLanguage: 'default'
  });
  const {
    0: alert,
    1: dispatchAlert
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    active: false,
    alertMessage: '',
    type: ''
  }); // const[absolutePath,dispatchAbsolutePath]=useState('http://localhost:3000/')

  const {
    0: siteIdentity,
    1: dispatchSiteIdentity
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    title: 'site title',
    themeColor: '#000',
    description: 'site description',
    keywords: [],
    customScripts: []
  });
  const {
    0: siteDesign,
    1: dispatchSiteDesign
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: settings,
    1: dispatchSettings
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    adminPanelSideBar: false,
    textEditorCurrentFile: '',
    textEditorEditMode: false
  });
  const {
    0: galleryData,
    1: setGalleryData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    path: './static'
  });
  const {
    0: userData,
    1: dispatchUserData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: navigationData,
    1: dispatchNavigationData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: editingPostData,
    1: dispatchEditingPostData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
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
  });
  const {
    0: adminPosts,
    1: dispatchAdminPosts
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: adminPostsData,
    1: dispatchAdminPostsData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pageNo: 1,
    size: 30,
    totalPosts: 0,
    postType: 'all',
    keyword: '',
    status: 'all',
    author: 'all',
    fields: ['author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories'],
    checkedPosts: []
  });
  const {
    0: widgetsSettings,
    1: dispatchWidgetsSettings
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    widgets: []
  }); // const [ adminWidgets, dispatchAdminWidgets ] = useState({
  //     home:[],
  //     homePageSidebar:[],
  //     postPageSidebar:[],
  //     postsPageSidebar:[],
  //     footer:[],
  //     tagsPageSidebar:[],
  //     categoriesPageSidebar:[],
  //     actorsPageSidebar:[],
  //     header:[]
  // });

  const {
    0: siteWidgets,
    1: setSiteWidgets
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: videoPostsDataForClient,
    1: dispatchVideoPostsDataForClient
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pageNo: 1,
    size: 12,
    totalPosts: 0,
    postType: 'all',
    keyword: '',
    status: 'all',
    author: 'all',
    fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration'],
    checkedPosts: []
  });
  const {
    0: functions,
    1: dispatchFunctions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    getAndSetUserInfo: async () => {
      if (localStorage.wt) {
        await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/users/getUserInfo', {
          token: localStorage.wt
        }).then(res => {
          dispatchUserData(_objectSpread({}, userData, {}, _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4___default()(res.data).userData));
        }).catch(err => {
          console.log(err);
        });
      }
    },
    logOutUser: () => {
      localStorage.removeItem('wt');
      dispatchUserData({});
      props.router.push('/');
    },
    goToAdminPanel: () => {
      props.router.push('/admin');
    },
    goToHomePage: () => {// props.router.push('/')
    },
    savePosts: async data => {
      const body = {
        postData: data,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/createNewPost', body);
    },
    updatePost: async data => {
      const body = {
        postData: data,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/updatePost', body);
    },
    getPosts: async data => {
      const body = _objectSpread({}, data);

      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts', body);
    },
    //exported to variables file ----
    getPost: async _id => {
      const body = {
        _id,
        token: localStorage.wt
      };
      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/post', body);
    },
    setEditingPostData: async (name, value) => {
      dispatchEditingPostData(editingPostData => _objectSpread({}, editingPostData, {
        [name]: value
      }));
    },
    bulkActionPost: async (ids, status) => {
      dispatchState(_objectSpread({}, state, {
        loading: true
      }));
      const body = {
        ids,
        status,
        token: localStorage.wt
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/postsBulkAction', body).then(() => {
        // props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      }).catch(() => {
        dispatchState(_objectSpread({}, state, {
          loading: false
        }));
      });
    },
    deletePost: id => {
      const body = {
        _id: id,
        token: localStorage.wt
      };
      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/deletePost', body);
    },
    updateSetting: async (type, data) => {
      const body = {
        token: localStorage.wt,
        type,
        data
      };
      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(window.location.origin + '/api/v1/settings/update', body);
    },
    clearCaches: async () => {
      const body = {
        token: localStorage.wt
      };
      return await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(window.location.origin + '/api/v1/settings/clearCaches', body);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    functions.getAndSetUserInfo();
  }, []);
  return __jsx("div", null, __jsx(AppContext.Provider, {
    value: {
      state,
      dispatchState,
      settings,
      dispatchSettings,
      userData,
      dispatchUserData,
      functions,
      editingPostData,
      dispatchEditingPostData,
      adminPosts,
      dispatchAdminPosts,
      adminPostsData,
      dispatchAdminPostsData,
      videoPostsDataForClient,
      dispatchVideoPostsDataForClient,
      navigationData,
      dispatchNavigationData,
      dispatchSiteIdentity,
      siteIdentity,
      widgetsSettings,
      dispatchWidgetsSettings,
      siteDesign,
      dispatchSiteDesign,
      alert,
      dispatchAlert,
      siteWidgets,
      setSiteWidgets // adminWidgets,
      // dispatchAdminWidgets

    }
  }, props.children));
};

const AppProviderWithRouter = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(AppProvider);

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_global_fontawesome_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/global/fontawesome/fontawesome */ "./components/global/fontawesome/fontawesome.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const MyApp = ({
  Component,
  pageProps
}) => {
  return __jsx(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppProviderWithRouter"], null, __jsx(Component, pageProps));
};

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./server/tools/dataDecoder.js":
/*!*************************************!*\
  !*** ./server/tools/dataDecoder.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const jwtDecoder = __webpack_require__(/*! jwt-decode */ "jwt-decode");

const tokenExpireTime = '1000h';

const dataDecoder = token => {
  return jwtDecoder(token);
};

module.exports = dataDecoder;

/***/ }),

/***/ "./server/tools/dataEncoder.js":
/*!*************************************!*\
  !*** ./server/tools/dataEncoder.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const tokenExpireTime = '1000h';

const dataEncoder = data => {
  return jwt.sign(data, "secretKey", {
    expiresIn: tokenExpireTime
  });
};

module.exports = dataEncoder;

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@fortawesome/free-regular-svg-icons":
/*!******************************************************!*\
  !*** external "@fortawesome/free-regular-svg-icons" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-regular-svg-icons");

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map