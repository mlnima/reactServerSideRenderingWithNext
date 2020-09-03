module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"static\\development\\pages\\_error.js": 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../../../" + ({}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_variables/_variables.js":
/*!**********************************!*\
  !*** ./_variables/_variables.js ***!
  \**********************************/
/*! exports provided: likeValueCalculator, getAbsolutePath, generateAbsolutePath, clickPathGenerator, trimString, convertVariableNameToName, fileTypeDetector, initGA, logPageView, logEvent, logException, queryToObject, getLanguageQuery, getLanguageQueryFromWindowLocationSearch, addOrReplaceQueryToWindowLocationSearch, setLanguageToLocalStorage, getLanguageFromLocalStorage, pathAndAsPathGenerator, adminConsoleOpenCloseHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "likeValueCalculator", function() { return likeValueCalculator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAbsolutePath", function() { return getAbsolutePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateAbsolutePath", function() { return generateAbsolutePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clickPathGenerator", function() { return clickPathGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimString", function() { return trimString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertVariableNameToName", function() { return convertVariableNameToName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileTypeDetector", function() { return fileTypeDetector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGA", function() { return initGA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logPageView", function() { return logPageView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logEvent", function() { return logEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logException", function() { return logException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryToObject", function() { return queryToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguageQuery", function() { return getLanguageQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguageQueryFromWindowLocationSearch", function() { return getLanguageQueryFromWindowLocationSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOrReplaceQueryToWindowLocationSearch", function() { return addOrReplaceQueryToWindowLocationSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguageToLocalStorage", function() { return setLanguageToLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguageFromLocalStorage", function() { return getLanguageFromLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathAndAsPathGenerator", function() { return pathAndAsPathGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminConsoleOpenCloseHandler", function() { return adminConsoleOpenCloseHandler; });
/* harmony import */ var react_ga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-ga */ "react-ga");
/* harmony import */ var react_ga__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_ga__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const likeValueCalculator = (likes, dislikes) => {
  return likes > 0 && dislikes > 0 ? Math.round(likes * 100 / (likes + dislikes)) : likes === 0 && dislikes === 0 ? 0 : likes === 0 && dislikes > 0 ? 0 : likes > 0 && dislikes === 0 ? 100 : 0;
};
const getAbsolutePath = async req => {
  return (await req.protocol) + '://' + (await req.get('Host'));
};
const generateAbsolutePath = () => {
  return window.location.protocol + '//' + window.location.host;
};
const clickPathGenerator = (clickedItemName, pathFromContexts) => {
  if (pathFromContexts === '.') {
    return './' + clickedItemName;
  } else {
    return pathFromContexts + '/' + clickedItemName;
  }
};
const trimString = string => {
  return trimString();
};
const convertVariableNameToName = name => {
  return name ? name.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + name.replace(/([A-Z])/g, " $1").slice(1) : '';
};
const fileTypeDetector = fileName => {
  const splitFileName = fileName.split('.');
  const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase();
  let finalFormat = '';
  const fileFormats = {
    image: ['jpg', 'png', 'jpeg', 'svg'],
    video: ['mp4', '3gp'],
    document: ['js', 'css', 'env', 'scss', 'txt'],
    application: ['exe'],
    archive: ['zip', 'rar']
  }; // const images = [ '.jpg', '.png', 'jpeg', 'svg' ]
  // const video = [ '.mp4', '.3gp' ]
  // const documents = [ '.js', '.css', '.env', '.scss' ]

  Object.keys(fileFormats).forEach(formatArr => {
    if (fileFormats[formatArr].includes(fileFormat)) {
      finalFormat = formatArr;
    }
  }); // console.log(finalFormat )

  return finalFormat;
};
const initGA = () => {
  react_ga__WEBPACK_IMPORTED_MODULE_0___default.a.initialize("UA-xxxxxxxx-xx");
};
const logPageView = () => {
  // console.log(`Logging pageview for ${window.location.pathname}`)
  react_ga__WEBPACK_IMPORTED_MODULE_0___default.a.set({
    page: window.location.pathname
  });
  react_ga__WEBPACK_IMPORTED_MODULE_0___default.a.pageview(window.location.pathname);
};
const logEvent = (category = '', action = '') => {
  if (category && action) {
    react_ga__WEBPACK_IMPORTED_MODULE_0___default.a.event({
      category,
      action
    });
  }
};
const logException = (description = '', fatal = false) => {
  if (description) {
    react_ga__WEBPACK_IMPORTED_MODULE_0___default.a.exception({
      description,
      fatal
    });
  }
};
const queryToObject = query => {
  let finalObject = {};
  const splitByAnd = query.split('&');

  for (let q of splitByAnd) {
    const splitByEqual = q.split('=');
    finalObject[splitByEqual[0]] = splitByEqual[1];
  }

  return finalObject;
};
const getLanguageQuery = url => {
  const searchParams = new URLSearchParams(url);

  if (searchParams.has('lang')) {
    return {
      lang: searchParams.get('lang')
    };
  } else return null;
};
const getLanguageQueryFromWindowLocationSearch = () => {
  if (false) {} else return null;
};
const addOrReplaceQueryToWindowLocationSearch = (queryName, queryValue) => {
  if (false) {} else return null;
};
const setLanguageToLocalStorage = language => {
  localStorage ? localStorage.setItem('lang', language) : null;
};
const getLanguageFromLocalStorage = () => {
  return localStorage ? localStorage.lang ? localStorage.lang : 'default' : 'default';
};
const pathAndAsPathGenerator = (pathname, asPath, query) => {
  const data = {
    pathname: '',
    asPath: '',
    query
  };
  asPath.includes('/tags/') || asPath.includes('/categories/') || asPath.includes('/actors/') ? data.pathname = '/posts' : asPath.includes('/tags') || asPath.includes('/categories') || asPath.includes('/actors') ? data.pathname = '/meta' : data.pathname = pathname;

  if (asPath.includes('?')) {
    const asPathSplit = asPath.split('?');
    const searchParams = new URLSearchParams(asPathSplit[1]);

    if (localStorage.lang && localStorage.lang !== 'default') {
      searchParams.set('lang', localStorage.lang);

      if (query.page) {
        searchParams.set('page', query.page);
      }

      data.query = _objectSpread({}, data.query, {
        lang: localStorage.lang
      });
    } else if (localStorage.lang === 'default' && asPath.includes('lang=')) {
      const page = query ? query.page ? `&page=${query.page}` : '' : '';
      data.asPath = asPathSplit[0] + '?' + searchParams.toString() + page;
      searchParams.delete('lang');
    }
  } else {
    if (localStorage.lang && localStorage.lang !== 'default') {
      const page = query ? query.page ? `&page=${query.page}` : '' : '';
      data.asPath = asPath + '?lang=' + localStorage.lang + page;
      data.pathname = pathname;
    } else if (localStorage.lang === 'default') {
      const page = query.page ? `?page=${query.page}` : '';
      data.asPath = asPath + page;
      data.pathname = pathname;
    }
  }

  return data;
};
const adminConsoleOpenCloseHandler = (userData, state, dispatchState) => {
  if (userData.role === 'administrator') {
    state.console ? dispatchState(_objectSpread({}, state, {
      console: false
    })) : dispatchState(_objectSpread({}, state, {
      console: true
    }));
  } else return null;
};

/***/ }),

/***/ "./_variables/ajaxVariables.js":
/*!*************************************!*\
  !*** ./_variables/ajaxVariables.js ***!
  \*************************************/
/*! exports provided: updateSetting, saveCustomStyle, getSetting, addNewWidget, getMultipleWidgetWithData, getMultipleSetting, getWidgetsWithData, updateWidgets, deleteWidgets, executor, fileUpload, postThumbnailsUpload, uploadFiles, postProductTypeImages, userImageUpload, contactAjaxPost, youtubeDataScrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSetting", function() { return updateSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveCustomStyle", function() { return saveCustomStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSetting", function() { return getSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNewWidget", function() { return addNewWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMultipleWidgetWithData", function() { return getMultipleWidgetWithData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMultipleSetting", function() { return getMultipleSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidgetsWithData", function() { return getWidgetsWithData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateWidgets", function() { return updateWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteWidgets", function() { return deleteWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executor", function() { return executor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileUpload", function() { return fileUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postThumbnailsUpload", function() { return postThumbnailsUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadFiles", function() { return uploadFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postProductTypeImages", function() { return postProductTypeImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userImageUpload", function() { return userImageUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactAjaxPost", function() { return contactAjaxPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "youtubeDataScrapper", function() { return youtubeDataScrapper; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const updateSetting = async (type, data) => {
  const body = {
    token: localStorage.wt,
    type,
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/update', body);
};
const saveCustomStyle = async data => {
  const body = {
    token: localStorage.wt,
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/saveCustomStyle', body);
};
const getSetting = async (type, domainName, cache, whichPage) => {
  const pageNameForCachedRequest = whichPage ? `&position=${whichPage}` : '';
  const body = {
    type,
    cache
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/get?type=${type}${pageNameForCachedRequest}`, body);
};
const addNewWidget = async data => {
  const body = {
    data,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/addWidget', body);
}; // export const getWidgets = async (position,cache, domainName) => {
//     const body = {
//         position,
//     };
//     return await axios.post(domainName + '/api/v1/settings/getWidget', body)
// }

const getMultipleWidgetWithData = async (widgets, domainName, cache, whichPage) => {
  const body = _objectSpread({}, widgets, {
    cache
  });

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getMultipleWidgetWithData?whichPage=${whichPage}`, body);
};
const getMultipleSetting = async (settings, domainName, cache, whichPage) => {
  const body = _objectSpread({}, settings, {
    cache
  });

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getMultiple?whichPage=${whichPage}`, body);
};
const getWidgetsWithData = async (position, domainName) => {
  const body = {
    position
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getWidgetsWithData`, body);
};
const updateWidgets = async widgetData => {
  // console.log(id)
  console.log(widgetData);
  const body = {
    widgetData,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/updateWidget', body);
};
const deleteWidgets = async id => {
  const body = {
    id,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/deleteWidget', body);
};
const executor = async command => {
  const body = {
    command,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/executor', body);
};
const fileUpload = async image => {
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-uploadFile', image);
};
const postThumbnailsUpload = async image => {
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-postThumbnailsUpload', image);
};
const uploadFiles = async image => {
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-uploadFiles', image);
};
const postProductTypeImages = async image => {
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-postProductTypeImages', image);
};
const userImageUpload = async image => {
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-userImageUpload', image);
};
const contactAjaxPost = async data => {
  const body = {
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/forms/contact', body);
};
const youtubeDataScrapper = async url => {
  const body = {
    url,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/scrap/youtube', body);
};

/***/ }),

/***/ "./components/includes/AdminTools/AdminTools.js":
/*!******************************************************!*\
  !*** ./components/includes/AdminTools/AdminTools.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AdminTools_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdminTools.scss */ "./components/includes/AdminTools/AdminTools.scss");
/* harmony import */ var _AdminTools_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_AdminTools_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_variables/_variables */ "./_variables/_variables.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const AdminTools = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    open: false,
    console: false
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(contextData.userData);
  }, [contextData.userData]);

  if (contextData.userData.role === 'administrator') {
    if (state.open) {
      return __jsx("div", {
        className: "admin-tools",
        onKeyDown: e => e.keyCode === 192 ? Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["adminConsoleOpenCloseHandler"])(contextData.userData, contextData.state, contextData.dispatchState) : null
      }, __jsx("button", {
        className: "admin-tools-item",
        onClick: () => state.open ? setState(_objectSpread({}, state, {
          open: false
        })) : setState(_objectSpread({}, state, {
          open: true
        }))
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faCogs"],
        className: "admin-tools-item-logo"
      })), __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
        href: "/admin"
      }, __jsx("a", {
        className: "admin-tools-item",
        style: state.colorsStyle
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faUserShield"],
        className: "admin-tools-item-logo"
      }))), __jsx("p", {
        className: "admin-tools-item",
        style: state.colorsStyle,
        onClick: () => contextData.functions.clearCaches().then(() => router.reload())
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faEraser"],
        className: "admin-tools-item-logo"
      })), __jsx("p", {
        className: "admin-tools-item",
        style: state.colorsStyle,
        onClick: () => Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["adminConsoleOpenCloseHandler"])(contextData.userData, contextData.state, contextData.dispatchState)
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTerminal"],
        className: "admin-tools-item-logo"
      })));
    } else {
      return __jsx("div", {
        className: "admin-tools"
      }, __jsx("button", {
        className: "admin-tools-item",
        onClick: () => state.open ? setState(_objectSpread({}, state, {
          open: false
        })) : setState(_objectSpread({}, state, {
          open: true
        }))
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faCogs"],
        className: "admin-tools-item-logo"
      })));
    }
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (AdminTools);

/***/ }),

/***/ "./components/includes/AdminTools/AdminTools.scss":
/*!********************************************************!*\
  !*** ./components/includes/AdminTools/AdminTools.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/AdminTools/Console/Console.js":
/*!***********************************************************!*\
  !*** ./components/includes/AdminTools/Console/Console.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _Console_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Console.scss */ "./components/includes/AdminTools/Console/Console.scss");
/* harmony import */ var _Console_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Console_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const Console = props => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])();
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    command: '',
    results: '',
    lastCommands: []
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(contextData.siteDesign);
  }, [contextData.siteDesign]); //design bodyBackgroundColor white

  const designChange = (key, value) => {
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: true
    }));

    const newDesignData = _objectSpread({}, contextData.siteDesign, {
      [key]: value
    });

    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_6__["updateSetting"])('design', newDesignData).then(() => {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        loading: false
      }));
    });
  };

  const identityChange = (key, value) => {
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: true
    }));

    const newDesignData = _objectSpread({}, contextData.siteIdentity, {
      [key]: value
    });

    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_6__["updateSetting"])('identity', newDesignData).then(() => {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        loading: false
      }));
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    switch (state.command) {
      case '':
        break;

      case 'close':
        Object(_variables_variables__WEBPACK_IMPORTED_MODULE_3__["adminConsoleOpenCloseHandler"])(contextData.userData, contextData.state, contextData.dispatchState);
        break;

      case 'clear cache':
        contextData.functions.clearCaches().then(() => router.reload());
        break;

      case 'design -h':
        setState(_objectSpread({}, state, {
          results: state.results += JSON.stringify(contextData.siteDesign)
        }));
        break;

      case 'identity -h':
        setState(_objectSpread({}, state, {
          results: state.results += JSON.stringify(contextData.siteIdentity)
        }));
        break;

      default:
        const splitCommand = state.command.split(' ');

        if (splitCommand.length > 2) {
          switch (splitCommand[0]) {
            case 'design':
              designChange(splitCommand[1], splitCommand[2]);

            case 'identity':
              identityChange(splitCommand[1], splitCommand[2]);

            default:
              break;
          }
        } else break;

    }

    setState(_objectSpread({}, state, {
      results: state.results + '\n' + state.command,
      lastCommands: [...state.lastCommands, state.command],
      command: ''
    }));
  };

  const onChangeHandler = e => {
    setState(_objectSpread({}, state, {
      [e.target.name]: e.target.value
    }));
  };

  if (contextData.state.console) {
    return __jsx("div", {
      id: "console",
      onKeyDown: e => e.keyCode === 192 ? Object(_variables_variables__WEBPACK_IMPORTED_MODULE_3__["adminConsoleOpenCloseHandler"])(contextData.userData, contextData.state, contextData.dispatchState) : null
    }, __jsx("div", {
      className: "console-panel"
    }, __jsx("div", {
      className: "console-header"
    }, __jsx("p", null, "Console"), __jsx("button", {
      onClick: () => Object(_variables_variables__WEBPACK_IMPORTED_MODULE_3__["adminConsoleOpenCloseHandler"])(contextData.userData, contextData.state, contextData.dispatchState)
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faTimes"],
      className: "admin-tools-item-logo"
    }))), __jsx("textarea", {
      value: state.results
    }), __jsx("form", {
      onSubmit: e => onSubmitHandler(e)
    }, __jsx("input", {
      onChange: e => onChangeHandler(e),
      value: state.command,
      name: "command",
      type: "text",
      onKeyDown: e => e.keyCode === 38 ? e.target.value = state.lastCommands[state.lastCommands.length - 1] : null
    }))));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Console);

/***/ }),

/***/ "./components/includes/AdminTools/Console/Console.scss":
/*!*************************************************************!*\
  !*** ./components/includes/AdminTools/Console/Console.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/AlertBox/AlertBox.js":
/*!**************************************************!*\
  !*** ./components/includes/AlertBox/AlertBox.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const AlertBox = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  const RenderAlertLogo = () => {
    return contextData.alert.type === 'error' ? 'X' : contextData.alert.type === 'info' ? '!' : null;
  };

  const onCloseHandler = () => {
    contextData.dispatchAlert(_objectSpread({}, contextData.alert, {
      active: false,
      alertMessage: '',
      type: ''
    }));
  };

  if (contextData.alert.active) {
    return __jsx("div", {
      className: "alert-box"
    }, __jsx("button", {
      className: "close-alert",
      onClick: () => onCloseHandler()
    }, "X"), __jsx("div", {
      className: "alert-message"
    }, __jsx("p", null, contextData.alert.type, ":"), __jsx("p", {
      className: "alert"
    }, contextData.alert.alertMessage)));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (AlertBox);

/***/ }),

/***/ "./components/includes/Footer/Footer.js":
/*!**********************************************!*\
  !*** ./components/includes/Footer/Footer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const Footer = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        backgroundColor: contextData.siteDesign.footerBackgroundColor,
        color: contextData.siteDesign.footerTextColor
      }
    }));
  }, [contextData.siteDesign]);
  return __jsx("div", {
    id: "footer",
    style: state.style
  }, __jsx(_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__["default"], props));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./components/includes/Header/Header.js":
/*!**********************************************!*\
  !*** ./components/includes/Header/Header.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const Header = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        backgroundColor: contextData.siteDesign.headerBackgroundColor,
        color: contextData.siteDesign.headerTextColor
      }
    }));
  }, [contextData.siteDesign]);
  return __jsx("div", {
    className: "header",
    style: state.style
  }, __jsx(_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    widgets: contextData.siteWidgets,
    position: "header"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/includes/Header/Navigation/Navigation.js":
/*!*************************************************************!*\
  !*** ./components/includes/Header/Navigation/Navigation.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _NavigationMobileButton_NavigationMobileButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavigationMobileButton/NavigationMobileButton */ "./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.js");
/* harmony import */ var _LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../LoggedInItemsForMenu/LoggedInItemsForMenu */ "./components/includes/LoggedInItemsForMenu/LoggedInItemsForMenu.js");
/* harmony import */ var _LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../LoggedOutItemsMenu/LoggedOutItemsMenu */ "./components/includes/LoggedOutItemsMenu/LoggedOutItemsMenu.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const Navigation = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const navigation = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const navigationMobileBtn = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: navigationData,
    1: setNavigationData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    isOpen: false,
    items: [],
    style: {},
    queries: {},
    asUrlWithLang: ''
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setNavigationData(_objectSpread({}, navigationData, {
      style: {
        backgroundColor: contextData.siteDesign.navigationBackgroundColor,
        color: contextData.siteDesign.navigationTextColor
      }
    }));
  }, [contextData.siteDesign, props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (window.innerWidth >= 768) {
      setNavigationData(_objectSpread({}, navigationData, {
        style: _objectSpread({}, navigationData.style, {
          display: 'flex'
        })
      }));
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        navigationOpenStatus: true
      }));
    } else {}
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setNavigationData(navigationData => _objectSpread({}, navigationData, {
      items: contextData.navigationData || []
    }));
  }, [contextData.navigationData]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (contextData.state.navigationOpenStatus) {
      setNavigationData(_objectSpread({}, navigationData, {
        style: _objectSpread({}, navigationData.style, {
          display: 'flex'
        })
      }));
    } else {
      setNavigationData(_objectSpread({}, navigationData, {
        style: _objectSpread({}, navigationData.style, {
          display: 'none'
        })
      }));
    }
  }, [contextData.state.navigationOpenStatus]);
  const renderNavigationItems = (contextData.navigationData || []).map(item => {
    const queryArrayToObject = arr => {
      let returningData = {};

      if (arr) {
        arr.forEach(arrItem => {
          returningData[Object.keys(arrItem)[0]] = Object.values(arrItem)[0];
        });
        return returningData;
      }
    };

    const pathData = Object(_variables_variables__WEBPACK_IMPORTED_MODULE_4__["pathAndAsPathGenerator"])(item.url, item.as || item.url, item.query);
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      as: item.as || item.url,
      key: item.title,
      href: {
        pathname: pathData.pathname,
        query: queryArrayToObject(item.query)
      }
    }, __jsx("a", {
      style: _objectSpread({}, navigationData.style, {
        backgroundColor: 'transparent'
      }),
      className: "navigation-link"
    }, item.translations ? item.translations[contextData.state.activeLanguage] ? item.translations[contextData.state.activeLanguage].title || item.title : item.title : item.title));
  });

  if ((contextData.navigationData || []).length > 0) {
    return __jsx("div", {
      ref: navigation,
      className: "navigation",
      style: navigationData.style
    }, __jsx(_LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_8__["default"], {
      visible: contextData.state.isMobile
    }), __jsx(_LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_9__["default"], {
      visible: contextData.state.isMobile
    }), __jsx("div", {
      className: "navigation-links"
    }, renderNavigationItems));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(Navigation));

/***/ }),

/***/ "./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.js":
/*!************************************************************************************************!*\
  !*** ./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavigationMobileButton_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavigationMobileButton.scss */ "./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.scss");
/* harmony import */ var _NavigationMobileButton_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_NavigationMobileButton_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const NavigationMobileButton = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const navigationMobileBtn = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: navigationBtnData,
    1: setNavigationBtnData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {}
  });
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    colorsStyle: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      colorsStyle: {
        backgroundColor: contextData.siteDesign.topBarBackgroundColor,
        color: contextData.siteDesign.topBarTextColor
      }
    }));
  }, [contextData.siteDesign]);

  const onNavigationMobileBtnClickHandler = () => {
    if (contextData.state.navigationOpenStatus) {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        navigationOpenStatus: false
      }));
      setNavigationBtnData(_objectSpread({}, navigationBtnData, {
        style: _objectSpread({}, navigationBtnData, {
          transform: 'rotate(0deg)'
        })
      }));
    } else {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        navigationOpenStatus: true
      }));
      setNavigationBtnData(_objectSpread({}, navigationBtnData, {
        style: _objectSpread({}, navigationBtnData, {
          transform: 'rotate(-90deg)'
        })
      }));
    }
  };

  if (window.innerWidth <= 768) {
    return __jsx("button", {
      style: _objectSpread({}, state.colorsStyle, {
        backgroundColor: 'transparent'
      }),
      ref: navigationMobileBtn,
      className: "navigationMobileBtn",
      onClick: onNavigationMobileBtnClickHandler
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faBars"],
      className: "navigation-mobile-btn-logo"
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (NavigationMobileButton);

/***/ }),

/***/ "./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.scss":
/*!**************************************************************************************************!*\
  !*** ./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/Loading/Loading.js":
/*!************************************************!*\
  !*** ./components/includes/Loading/Loading.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const Loading = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  const onStopLoadingHandler = () => {
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: false
    }));
  };

  if (contextData.state.loading) {
    return __jsx("div", {
      className: "Loading"
    }, __jsx("div", {
      className: "lds-ring"
    }, __jsx("div", null), __jsx("div", null), __jsx("div", null), __jsx("div", null)), __jsx("button", {
      className: "stopLoading fas fa-times",
      onClick: () => onStopLoadingHandler()
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./components/includes/LoggedInItemsForMenu/LoggedInItemsForMenu.js":
/*!**************************************************************************!*\
  !*** ./components/includes/LoggedInItemsForMenu/LoggedInItemsForMenu.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const LoggedInItemsForMenu = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  const MyProfile = () => {
    if (contextData.siteIdentity.membership) {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
        href: `/profile?username=${contextData.userData.username}`
      }, __jsx("a", null, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faUser"],
        className: "logged-in-item-logo",
        style: props.colorsStyle
      })));
    } else return null;
  };

  if (contextData.userData.username && props.visible) {
    return __jsx("div", {
      className: "logged-in-items"
    }, __jsx("p", {
      onClick: () => contextData.functions.logOutUser()
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faPowerOff"],
      className: "logged-in-item-logo",
      style: props.colorsStyle
    })), __jsx(MyProfile, null));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedInItemsForMenu);

/***/ }),

/***/ "./components/includes/LoggedOutItemsMenu/LoggedOutItemsMenu.js":
/*!**********************************************************************!*\
  !*** ./components/includes/LoggedOutItemsMenu/LoggedOutItemsMenu.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const LoggedOutItemsMenu = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  if (!contextData.userData.username && contextData.siteIdentity.topBarAuthBtn && props.visible) {
    return __jsx("div", {
      className: "logged-out-items"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: "/auth/login",
      as: "/login"
    }, __jsx("a", null, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faUser"],
      className: "logged-out-item-logo",
      style: props.colorsStyle
    }))), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: "/auth/register",
      as: "/register"
    }, __jsx("a", null, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faPen"],
      className: "logged-out-item-logo",
      style: props.colorsStyle
    }))));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedOutItemsMenu);

/***/ }),

/***/ "./components/includes/Logo/Logo.js":
/*!******************************************!*\
  !*** ./components/includes/Logo/Logo.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const Logo = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    logoText: 'Logo',
    headLine: 'Head Line',
    logoTextStyle: {},
    headLineStyle: {},
    queries: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      logoText: contextData.siteIdentity.logoText,
      headLine: contextData.siteIdentity.headLine,
      logoTextStyle: {
        color: props.logoTextColor || 'white',
        fontSize: props.logoTextFontSize + 'px' || false
      },
      headLineStyle: {
        color: props.logoHeadLineColor || 'white',
        fontSize: props.logoHeadLineFontSize + 'px' || false,
        fontWeight: props.logoHeadLineFontWeight || 'initial'
      }
    }));
  }, [contextData.siteIdentity]);

  const RenderLogoImage = () => {
    if (props.LogoUrl) {
      return __jsx("img", {
        src: props.LogoUrl
      });
    } else return null;
  };

  const RenderLogoText = () => {
    const value = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText;

    if (value) {
      return __jsx("span", {
        style: state.logoTextStyle,
        className: "logo-text"
      }, value);
    } else return null;
  };

  const RenderHeadLine = () => {
    const value = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine;

    if (value) {
      if (router.pathname === '/') {
        return __jsx("h1", {
          style: state.headLineStyle
        }, value);
      } else {
        return __jsx("p", {
          style: state.headLineStyle
        }, value);
      }
    } else return null;
  };

  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/"
  }, __jsx("a", {
    className: "Logo"
  }, __jsx(RenderLogoImage, null), __jsx(RenderLogoText, null), __jsx(RenderHeadLine, null)));
};

/* harmony default export */ __webpack_exports__["default"] = (Logo);

/***/ }),

/***/ "./components/includes/PostElement/PostElement.js":
/*!********************************************************!*\
  !*** ./components/includes/PostElement/PostElement.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProgressBar/ProgressBar */ "./components/includes/ProgressBar/ProgressBar.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









 // import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const PostElement = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_5__["AppContext"]);
  let qualityLabel = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  let bottomLeft = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  let bottomRight = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  let element = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  let videoElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  let {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    isHover: false,
    isWatched: false,
    extraClassName: '',
    queries: {},
    infoOnPostElementStyle: {},
    titleElementStyle: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      extraClassName: props.viewType ? props.viewType : '',
      queries: _objectSpread({}, Object(_variables_variables__WEBPACK_IMPORTED_MODULE_4__["getLanguageQueryFromWindowLocationSearch"])())
    }));
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const titleTextAlign = props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title ? contextData.state.activeLanguage === 'fa' || contextData.state.activeLanguage === 'ar' ? 'right' : 'left' : 'left' : 'left' : 'left';
    setState(_objectSpread({}, state, {
      infoOnPostElementStyle: _objectSpread({}, state.infoOnPostElementStyle, {
        color: contextData.siteDesign.postElementOnImageTextColor || 'white',
        backgroundColor: contextData.siteDesign.postElementOnImageTextBackgroundColor || 'rgba(0,0,0,0.5)'
      }),
      titleElementStyle: _objectSpread({}, state.titleElementStyle, {
        color: contextData.siteDesign.postElementTitleTextColor || 'white',
        backgroundColor: contextData.siteDesign.postElementBackgroundColor || 'transparent',
        textAlign: contextData.siteDesign.postElementTitleTextAlign || 'left'
      })
    }));
  }, [contextData.siteDesign]);

  let isHoverHandler = () => {
    if (props.state.videoTrailerUrl) {
      state.isHover ? setState(_objectSpread({}, state, {
        isHover: false
      })) : setState(_objectSpread({}, state, {
        isHover: true
      }));
    }
  };

  const ImageContent = () => {
    let dataToRender = () => {
      if (state.isHover && props.state.videoTrailerUrl) {
        return __jsx("video", {
          ref: videoElement,
          src: props.state.videoTrailerUrl,
          autoPlay: true,
          loop: true,
          onMouseOut: isHoverHandler,
          onTouchCancel: isHoverHandler
        });
      } else if (!state.isHover) {
        return __jsx("img", {
          src: props.state.mainThumbnail,
          alt: props.state.title,
          onError: err => {
            if (!props.state.mainThumbnail) {
              // deletedVideoAutoRemover(props.state)
              console.log('something wrong with image on ', props.state.title);
            }
          },
          onMouseEnter: isHoverHandler,
          onTouchStart: isHoverHandler
        });
      } else {
        return __jsx("span", null, props.state.title);
      }
    };

    return dataToRender();
  };

  const RenderProgressBar = () => {
    if (props.state.rating !== 'disable') {
      return __jsx(_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
        backgroundColor: contextData.siteDesign.postElementProgressbarBackgroundColor || '#333',
        valueColor: contextData.siteDesign.postElementProgressbarValueColor || 'red',
        textColor: contextData.siteDesign.postElementProgressbarTextColor || 'white',
        value: Object(_variables_variables__WEBPACK_IMPORTED_MODULE_4__["likeValueCalculator"])(props.state.likes, props.state.disLikes),
        percent: true
      });
    } else return null;
  };

  const BottomRight = () => {
    if (props.state) {
      switch (props.state.postType) {
        case 'video':
          return __jsx("span", {
            ref: bottomRight,
            className: "bottom-right",
            style: state.infoOnPostElementStyle
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faEye"],
            className: "post-element-info-logo"
          }), __jsx("span", {
            className: "view-count value-next-icon"
          }, props.state.views));

        case 'product':
          return __jsx("span", {
            ref: bottomRight,
            className: "bottom-right",
            style: state.infoOnPostElementStyle
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faEye"],
            className: "post-element-info-logo"
          }), __jsx("span", {
            className: "view-count value-next-icon"
          }, " ", props.state.views));

        default:
          break;
      }
    } else return null;
  };

  const BottomLeft = () => {
    if (props.state) {
      switch (props.state.postType) {
        case 'video':
          return __jsx("span", {
            ref: bottomLeft,
            className: "bottom-left",
            style: state.infoOnPostElementStyle
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faClock"],
            className: "post-element-info-logo",
            color: contextData.siteDesign.postElementOnImageTextColor || 'white'
          }), __jsx("span", {
            className: "value-next-icon"
          }, "  ", props.state.duration));

        case 'product':
          return __jsx("span", {
            ref: bottomRight,
            className: "bottom-left",
            style: state.infoOnPostElementStyle
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: props.state.currency === 'Usd' ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faDollarSign"] : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faEuroSign"],
            className: "post-element-info-logo",
            color: contextData.siteDesign.postElementOnImageTextColor || 'white'
          }), __jsx("span", {
            className: "value-next-icon"
          }, props.state.price));

        default:
          break;
      }
    } else return null;
  };

  const TopRight = () => {
    if (props.state) {
      switch (props.state.postType) {
        case 'video':
          return __jsx("span", {
            ref: qualityLabel,
            className: "top-right",
            style: state.infoOnPostElementStyle
          }, props.state.quality);

        case 'product':
          return null;

        default:
          break;
      }
    } else return null;
  };

  const RenderDataOnImage = () => {
    if (state.isHover) {
      return null;
    } else {
      return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(TopRight, null), __jsx(BottomRight, null), __jsx(BottomLeft, null));
    }
  };

  return __jsx("div", {
    ref: element,
    className: 'post-element-div ' + (props.viewType ? props.viewType : 'standard')
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    as: contextData.state.activeLanguage !== 'default' ? `/post/${props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title || props.state.title : props.state.title : props.state.title}?id=${props.state._id}&lang=${contextData.state.activeLanguage}` : `/post/${props.state.title}?id=${props.state._id}`,
    href: {
      pathname: `/post`,
      query: _objectSpread({
        id: props.state._id
      }, state.queries)
    }
  }, __jsx("a", null, __jsx("div", {
    className: "post-element",
    key: props.state.title
  }, __jsx("div", {
    className: "image"
  }, __jsx(ImageContent, null), __jsx(RenderDataOnImage, null)), __jsx(RenderProgressBar, null), __jsx("h3", {
    style: state.titleElementStyle
  }, props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title || props.state.title : props.state.title : props.state.title)))));
}; //  props.state.title


/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_1___default()(PostElement));

/***/ }),

/***/ "./components/includes/Posts/Posts.js":
/*!********************************************!*\
  !*** ./components/includes/Posts/Posts.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PostElement_PostElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PostElement/PostElement */ "./components/includes/PostElement/PostElement.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Posts = props => {
  const renderPosts = (props.posts || []).map(post => {
    return __jsx(_PostElement_PostElement__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: post._id,
      state: post,
      viewType: props.viewType
    });
  });
  return __jsx("div", {
    className: "Posts"
  }, __jsx("div", {
    className: 'postsContent ' + (props.viewType ? props.viewType + 'PostsContent' : 'standard')
  }, renderPosts));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default()(Posts));

/***/ }),

/***/ "./components/includes/ProgressBar/ProgressBar.js":
/*!********************************************************!*\
  !*** ./components/includes/ProgressBar/ProgressBar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_ga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-ga */ "react-ga");
/* harmony import */ var react_ga__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_ga__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const ProgressBar = props => {
  // useEffect(() => {
  //     console.log(props)
  // }, [props]);
  if (props.value < 1) {
    return __jsx("div", {
      className: "progressParent",
      style: {
        backgroundColor: props.backgroundColor
      }
    }, __jsx("div", {
      className: "progressChild",
      style: {
        color: props.textColor,
        backgroundColor: props.valueColor
      }
    }));
  } else return __jsx("div", {
    className: "progressParent",
    style: {
      backgroundColor: props.backgroundColor
    }
  }, __jsx("div", {
    className: "progressChild",
    style: {
      color: props.textColor,
      backgroundColor: props.valueColor,
      width: props.value + '%'
    }
  }, " ", __jsx("p", null, props.percent ? props.value + ' %' : '')));
};

/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);

/***/ }),

/***/ "./components/includes/SiteSettingsSetter/SiteSettingsSetter.js":
/*!**********************************************************************!*\
  !*** ./components/includes/SiteSettingsSetter/SiteSettingsSetter.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/next-server/lib/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/document */ "./node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_ga__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next-ga */ "next-ga");
/* harmony import */ var next_ga__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_ga__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! html-react-parser */ "html-react-parser");
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(html_react_parser__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const SiteSettingSetter = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();
  const customScriptElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    title: '',
    themeColor: '',
    description: '',
    bodyBackgroundImage: '',
    keywords: [],
    customScripts: [] // customScript: props.identity.data.customScript || 'your Script will be here',

  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.design) {
      contextData.dispatchSiteDesign(props.design.data);
    }

    if (props.navigation) {
      contextData.dispatchNavigationData(props.navigation.data);
    }

    if (props.identity) {
      contextData.dispatchSiteIdentity(props.identity.data);
      setState(_objectSpread({}, state, {
        title: props.identity ? props.identity.data.title || '' : '',
        themeColor: props.design ? props.design.data.themeColor || '' : '',
        description: props.identity ? props.identity.data.description || '' : '',
        bodyBackgroundImage: props.design ? props.design.data.bodyBackgroundImage || '' : '',
        keywords: props.identity ? props.identity.data.keywords || [] : [],
        customScripts: props.identity ? props.identity.data.customScripts || [] : [],
        favIcon: props.identity ? props.identity.data.favIcon || '/static/images/favIcon/favicon.png' : '/static/images/favIcon/favicon.png'
      }));
    }

    if (props.widgets) {
      contextData.setSiteWidgets(props.widgets);
    }
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (localStorage.lang || router.query.lang) {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        activeLanguage: localStorage.lang || router.query.lang
      }));
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    document.documentElement.lang = contextData.state.activeLanguage === 'default' ? contextData.siteIdentity.defaultSiteLanguage ? contextData.siteIdentity.defaultSiteLanguage : 'en' : contextData.state.activeLanguage;
  }, [contextData.state.activeLanguage, contextData.siteIdentity.defaultSiteLanguage]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    document.body.style.backgroundColor = contextData.siteDesign.bodyBackgroundColor;
    document.body.style.backgroundPosition = contextData.siteDesign.bodyBackgroundPosition || 'center';
    document.body.style.backgroundSize = contextData.siteDesign.bodyBackgroundSize || 'cover';
    document.body.style.backgroundRepeat = contextData.siteDesign.bodyBackgroundRepeat || 'no-repeat';
    document.body.style.backgroundAttachment = contextData.siteDesign.bodyBackgroundAttachment || 'initial';
    document.body.style.backgroundImage = contextData.siteDesign.bodyBackgroundImage ? `url(${contextData.siteDesign.bodyBackgroundImage})` : 'none';
    document.body.style.color = contextData.siteDesign.bodyBackgroundColor;
  }, [contextData.siteDesign]);
  const renderCustomScripts = (props.identity ? props.identity.data.customScripts || [] : []).map(script => {
    return html_react_parser__WEBPACK_IMPORTED_MODULE_7___default()(script.scriptBody);
  });
  return __jsx(next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx("title", null, state.title), __jsx("meta", {
    name: "theme-color",
    content: state.themeColor
  }), __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), __jsx("meta", {
    charSet: "utf-8"
  }), __jsx("meta", {
    name: "description",
    content: state.description
  }), __jsx("meta", {
    name: "keywords",
    content: state.keywords
  }), __jsx("link", {
    rel: "icon",
    href: state.favIcon || '/static/images/favIcon/favicon.png'
  }), __jsx("link", {
    href: "https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap",
    rel: "stylesheet"
  }), __jsx("link", {
    rel: "stylesheet",
    type: "text/css",
    href: "/static/style-sheet/customStyle.css"
  }), renderCustomScripts);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_5___default()(SiteSettingSetter));

/***/ }),

/***/ "./components/includes/TopBar/ImageLogoInTopBar.js":
/*!*********************************************************!*\
  !*** ./components/includes/TopBar/ImageLogoInTopBar.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const ImageLogoInTopBar = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);

  if (contextData.siteIdentity.imageLogoInTopBar && contextData.siteIdentity.imageLogoInTopBarUrl) {
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: "/"
    }, __jsx("a", {
      className: "site-logo-top-bar"
    }, __jsx("img", {
      src: contextData.siteIdentity.imageLogoInTopBarUrl,
      alt: ""
    })));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (ImageLogoInTopBar);

/***/ }),

/***/ "./components/includes/TopBar/TopBar.js":
/*!**********************************************!*\
  !*** ./components/includes/TopBar/TopBar.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Header_Navigation_NavigationMobileButton_NavigationMobileButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Header/Navigation/NavigationMobileButton/NavigationMobileButton */ "./components/includes/Header/Navigation/NavigationMobileButton/NavigationMobileButton.js");
/* harmony import */ var _LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../LoggedInItemsForMenu/LoggedInItemsForMenu */ "./components/includes/LoggedInItemsForMenu/LoggedInItemsForMenu.js");
/* harmony import */ var _LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../LoggedOutItemsMenu/LoggedOutItemsMenu */ "./components/includes/LoggedOutItemsMenu/LoggedOutItemsMenu.js");
/* harmony import */ var _ImageLogoInTopBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ImageLogoInTopBar */ "./components/includes/TopBar/ImageLogoInTopBar.js");
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @loadable/component */ "@loadable/component");
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_loadable_component__WEBPACK_IMPORTED_MODULE_7__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const SearchBarInTopBar = _loadable_component__WEBPACK_IMPORTED_MODULE_7___default()(() => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./SearchBarInTopBar */ "./components/includes/TopBar/SearchBarInTopBar.js")));

const TopBar = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    colorsStyle: {},
    mobileSearchBarOpen: false
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      colorsStyle: {
        backgroundColor: contextData.siteDesign.topBarBackgroundColor,
        color: contextData.siteDesign.topBarTextColor
      }
    }));
  }, [contextData.siteDesign]); // const onMobileSearchBarOpenHandler = () => {
  //     state.mobileSearchBarOpen ?
  //         setState({
  //             ...state,
  //             mobileSearchBarOpen: false
  //         }) :
  //         setState({
  //             ...state,
  //             mobileSearchBarOpen: true
  //         })
  // }
  // const SearchBarInTopBar = () => {
  //     if (contextData.siteIdentity.searchBarInTopBar) {
  //         if (window.innerWidth < 768) {
  //             if (state.mobileSearchBarOpen) {
  //                 return (
  //                     <div className='search-bar-top' >
  //                         <button style={state.colorsStyle} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon icon={faTimes} className='top-bar-item-logo'/></button>
  //                         <SearchInputComponent searchBtnBackgroundColor={state.colorsStyle.backgroundColor} searchBtnColor={state.colorsStyle.color}/>
  //                     </div>
  //                 )
  //             } else {
  //                 return (
  //                     <div className='search-bar-top'>
  //                         <button style={state.colorsStyle} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon icon={faSearch} className='top-bar-item-logo'/></button>
  //                     </div>
  //                 )
  //             }
  //
  //
  //         } else return (
  //             <div className='search-bar-top'>
  //                 <SearchInputComponent searchBtnBackgroundColor={state.colorsStyle.backgroundColor} searchBtnColor={state.colorsStyle.color}/>
  //             </div>
  //         )
  //     } else return null
  // }

  const RenderAuthBtns = () => {
    if (contextData.userData.username && !contextData.state.isMobile && contextData.siteIdentity.topBarAuthBtn) {
      return __jsx("div", {
        className: "auth-buttons"
      }, __jsx(_LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_4__["default"], {
        visible: !contextData.state.isMobile,
        colorsStyle: state.colorsStyle,
        position: "topBar"
      }));
    } else if (!contextData.userData.username && !contextData.state.isMobile && contextData.siteIdentity.topBarAuthBtn) {
      return __jsx("div", {
        className: "auth-buttons"
      }, __jsx(_LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
        visible: !contextData.state.isMobile,
        colorsStyle: state.colorsStyle,
        position: "topBar"
      }));
    } else return null;
  };

  if (contextData.siteIdentity.topBarVisibility || (contextData.navigationData || []).length > 0 && contextData.state.isMobile) {
    return __jsx("div", {
      className: "top-bar",
      style: state.colorsStyle
    }, __jsx(_Header_Navigation_NavigationMobileButton_NavigationMobileButton__WEBPACK_IMPORTED_MODULE_3__["default"], null), __jsx(RenderAuthBtns, null), __jsx(_ImageLogoInTopBar__WEBPACK_IMPORTED_MODULE_6__["default"], null), __jsx(SearchBarInTopBar, {
      colorsStyle: state.colorsStyle
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(TopBar));

/***/ }),

/***/ "./components/includes/Widget/Widget.js":
/*!**********************************************!*\
  !*** ./components/includes/Widget/Widget.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WidgetHeader_WidgetHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WidgetHeader/WidgetHeader */ "./components/includes/Widget/WidgetHeader/WidgetHeader.js");
/* harmony import */ var _WidgetFooter_WidgetFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WidgetFooter/WidgetFooter */ "./components/includes/Widget/WidgetFooter/WidgetFooter.js");
/* harmony import */ var _WidgetText_WidgetText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WidgetText/WidgetText */ "./components/includes/Widget/WidgetText/WidgetText.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







const Widget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    extraClassName: ''
  });

  const RenderComponent = () => {
    if (props.component) {
      return __jsx(props.component, _extends({}, props.data, {
        widget: true
      }));
    } else return null;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.data.extraClassName) {
      setState(_objectSpread({}, state, {
        extraClassName: props.data.extraClassName
      }));
    }
  }, [props]); // useEffect(() => {
  //     console.log(props)
  // }, [ props ]);

  const RenderCustomStyles = () => {
    if (props.data.customStyles) {
      return __jsx("style", {
        jsx: true
      }, `
                  ${props.data.customStyles}
                `);
    } else return null;
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(RenderCustomStyles, null), __jsx("div", {
    className: 'Widget ' + state.extraClassName
  }, __jsx(_WidgetHeader_WidgetHeader__WEBPACK_IMPORTED_MODULE_1__["default"], props.data), __jsx(_WidgetText_WidgetText__WEBPACK_IMPORTED_MODULE_3__["default"], props.data), __jsx(RenderComponent, null), __jsx(_WidgetFooter_WidgetFooter__WEBPACK_IMPORTED_MODULE_2__["default"], props.data)));
};

/* harmony default export */ __webpack_exports__["default"] = (Widget); // ${ props.data.customStyles }

/***/ }),

/***/ "./components/includes/Widget/WidgetFooter/WidgetFooter.js":
/*!*****************************************************************!*\
  !*** ./components/includes/Widget/WidgetFooter/WidgetFooter.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const WidgetFooter = props => {
  if (props.redirectTo && props.redirectToTitle) {
    return __jsx("div", {
      className: "WidgetFooter"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: props.redirectTo
    }, __jsx("a", null, props.redirectToTitle)));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetFooter);

/***/ }),

/***/ "./components/includes/Widget/WidgetHeader/WidgetHeader.js":
/*!*****************************************************************!*\
  !*** ./components/includes/Widget/WidgetHeader/WidgetHeader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const WidgetHeader = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        widgetHead: {
          backgroundColor: contextData.siteDesign.widgetHeaderBackgroundColor,
          color: contextData.siteDesign.widgetHeaderTextColor,
          borderLeft: contextData.siteDesign.widgetHeaderBorder ? `5px solid ${contextData.siteDesign.widgetHeaderBorder}` : '5px solid gray '
        },
        redirectLink: {
          backgroundColor: contextData.siteDesign.widgetHeaderRedirectLinkBackgroundColor,
          color: contextData.siteDesign.widgetHeaderRedirectLinkTextColor,
          fontWeight: 'bold'
        }
      }
    }));
  }, [contextData.siteDesign]);

  const RenderTitle = () => {
    if (props.title) {
      return __jsx("p", {
        className: "WidgetHeaderTitle"
      }, props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].title || props.title : props.title : props.title);
    } else return null;
  };

  const RenderRedirectLink = () => {
    if (props.redirectLink && props.redirectToTitle) {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: props.redirectLink
      }, __jsx("a", {
        style: state.style.redirectLink
      }, props.redirectToTitle));
    } else return null;
  };

  if (props.title) {
    return __jsx("div", {
      className: "WidgetHeader",
      style: state.style.widgetHead
    }, __jsx(RenderTitle, null), __jsx(RenderRedirectLink, null));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(WidgetHeader));

/***/ }),

/***/ "./components/includes/Widget/WidgetText/WidgetText.js":
/*!*************************************************************!*\
  !*** ./components/includes/Widget/WidgetText/WidgetText.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WidgetsModelsComponents_Text_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WidgetsModelsComponents/Text/Text */ "./components/includes/Widget/WidgetsModelsComponents/Text/Text.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const WidgetText = props => {
  if (props.text) {
    return __jsx(_WidgetsModelsComponents_Text_Text__WEBPACK_IMPORTED_MODULE_1__["default"], props);
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetText);

/***/ }),

/***/ "./components/includes/Widget/WidgetsModelsComponents/Text/Text.js":
/*!*************************************************************************!*\
  !*** ./components/includes/Widget/WidgetsModelsComponents/Text/Text.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const Text = props => {
  const spanElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {},
    textData: ''
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        textAlign: props.textAlign || 'center',
        color: props.textColor || 'white'
      },
      textData: props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text
    }));
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    spanElement.current.innerHTML = state.textData;
  }, [state]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(state);
  }, [state]);
  return __jsx("p", {
    className: "widgetText",
    ref: spanElement,
    style: state.style
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Text);

/***/ }),

/***/ "./components/includes/WidgetsRenderer/WidgetsRenderer.js":
/*!****************************************************************!*\
  !*** ./components/includes/WidgetsRenderer/WidgetsRenderer.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Widget_Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Widget/Widget */ "./components/includes/Widget/Widget.js");
/* harmony import */ var _Posts_Posts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Posts/Posts */ "./components/includes/Posts/Posts.js");
/* harmony import */ var _widgets_RecentComments_RecentComments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/RecentComments/RecentComments */ "./components/includes/widgets/RecentComments/RecentComments.js");
/* harmony import */ var _widgets_MetaWidget_MetaWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/MetaWidget/MetaWidget */ "./components/includes/widgets/MetaWidget/MetaWidget.js");
/* harmony import */ var _widgets_MediaWidget_MediaWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widgets/MediaWidget/MediaWidget */ "./components/includes/widgets/MediaWidget/MediaWidget.js");
/* harmony import */ var _widgets_SearchInputComponent_SearchInputComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/SearchInputComponent/SearchInputComponent */ "./components/includes/widgets/SearchInputComponent/SearchInputComponent.js");
/* harmony import */ var _widgets_AlphabeticalNumericalRangeLinksWidget_AlphabeticalNumericalRangeLinksWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget */ "./components/includes/widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget.js");
/* harmony import */ var _widgets_LanguagesSwitcher_LanguagesSwitcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widgets/LanguagesSwitcher/LanguagesSwitcher */ "./components/includes/widgets/LanguagesSwitcher/LanguagesSwitcher.js");
/* harmony import */ var _Logo_Logo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Logo/Logo */ "./components/includes/Logo/Logo.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }












const WidgetsRenderer = props => {
  const widgetInTypeOfPropsPosition = (props.widgets || []).filter(widget => widget.data.position === props.position);
  const widgetsToRenderSortByIndex = widgetInTypeOfPropsPosition.sort((a, b) => a.data.widgetIndex > b.data.widgetIndex ? 1 : -1);
  const renderWidgets = widgetsToRenderSortByIndex.map(widget => {
    switch (widget.data.type) {
      case 'posts':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: widget._id,
          component: _Posts_Posts__WEBPACK_IMPORTED_MODULE_2__["default"],
          posts: widget.posts,
          propsKey: widget._id
        }, widget));

      case 'media':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: widget._id,
          component: _widgets_MediaWidget_MediaWidget__WEBPACK_IMPORTED_MODULE_5__["default"],
          posts: widget.posts,
          propsKey: widget._id
        }, widget));

      case 'text':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id
        }, widget));

      case 'recentComments':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_RecentComments_RecentComments__WEBPACK_IMPORTED_MODULE_3__["default"]
        }, widget));

      case 'meta':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_MetaWidget_MetaWidget__WEBPACK_IMPORTED_MODULE_4__["default"]
        }, widget));

      case 'searchBar':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_SearchInputComponent_SearchInputComponent__WEBPACK_IMPORTED_MODULE_6__["default"]
        }, widget));

      case 'logo':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _Logo_Logo__WEBPACK_IMPORTED_MODULE_9__["default"]
        }, widget));

      case 'alphabeticalNumericalRange':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_AlphabeticalNumericalRangeLinksWidget_AlphabeticalNumericalRangeLinksWidget__WEBPACK_IMPORTED_MODULE_7__["default"]
        }, widget));

      case 'language':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_LanguagesSwitcher_LanguagesSwitcher__WEBPACK_IMPORTED_MODULE_8__["default"]
        }, widget));

      default:
        return null;
    }
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, renderWidgets);
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetsRenderer);

/***/ }),

/***/ "./components/includes/widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget.js":
/*!********************************************************************************************************************!*\
  !*** ./components/includes/widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget.js ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const AlphabeticalNumericalRangeLinksWidget = props => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    range: [...'abcdefghijklmnopqrstuvwxyz0123456789']
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(router);
  }, [props]);
  const renderRange = state.range.map(i => {
    const path = {
      pathname: props.router ? props.router.pathname : '',
      query: props.router ? _objectSpread({}, props.router.query, {
        startWith: i
      }) : ''
    };
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      key: i,
      href: path,
      as: router.asPath
    }, __jsx("a", null, i));
  });
  return __jsx("div", {
    className: "alphabetical-range"
  }, renderRange);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default()(AlphabeticalNumericalRangeLinksWidget));

/***/ }),

/***/ "./components/includes/widgets/LanguagesSwitcher/LanguagesSwitcher.js":
/*!****************************************************************************!*\
  !*** ./components/includes/widgets/LanguagesSwitcher/LanguagesSwitcher.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_images_fontawesome_language_solid_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../static/images/fontawesome/language-solid.svg */ "./static/images/fontawesome/language-solid.svg");
/* harmony import */ var _static_images_fontawesome_language_solid_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_static_images_fontawesome_language_solid_svg__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const LanguagesSwitcher = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const languagesOptions = (contextData.siteIdentity.translationLanguages || []).map(lang => {
    return __jsx("option", {
      key: lang,
      value: lang
    }, lang);
  });

  const onChangeHandler = e => {
    localStorage.setItem('lang', e.target.value);
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      activeLanguage: e.target.value
    }));
  };

  return __jsx("div", {
    className: "language-switcher-widget"
  }, __jsx("p", null, props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].languageToShowBesideDropDown || props.languageToShowBesideDropDown : props.languageToShowBesideDropDown : props.languageToShowBesideDropDown), __jsx("select", {
    value: contextData.state.activeLanguage,
    onChange: e => onChangeHandler(e)
  }, __jsx("option", {
    key: "default",
    value: "default"
  }, props.languageTextAsDefaultLanguage || 'default'), languagesOptions));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default()(LanguagesSwitcher));

/***/ }),

/***/ "./components/includes/widgets/MediaWidget/MediaWidget.js":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/MediaWidget/MediaWidget.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaWidget_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaWidget.scss */ "./components/includes/widgets/MediaWidget/MediaWidget.scss");
/* harmony import */ var _MediaWidget_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaWidget_scss__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const MediaWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    extraClassName: ''
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    props.mediaType === 'iframe' ? setState(_objectSpread({}, state, {
      extraClassName: 'media-widget-video-iframe'
    })) : setState(_objectSpread({}, state, {
      extraClassName: ''
    }));
  }, []);

  const WhatToRender = () => {
    switch (props.mediaType) {
      case 'image':
        return __jsx("img", {
          src: props.mediaUrl,
          alt: props.title || props.type
        });

      case 'video':
        return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("video", {
          src: props.mediaUrl,
          controls: true
        }));

      case 'iframe':
        return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("iframe", {
          src: props.mediaUrl
        }));

      case 'audio':
        return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("audio", {
          controls: true,
          src: props.mediaUrl
        }));
    }
  };

  return __jsx("div", {
    className: 'media-widget ' + state.extraClassName
  }, __jsx(WhatToRender, null));
};

/* harmony default export */ __webpack_exports__["default"] = (MediaWidget);

/***/ }),

/***/ "./components/includes/widgets/MediaWidget/MediaWidget.scss":
/*!******************************************************************!*\
  !*** ./components/includes/widgets/MediaWidget/MediaWidget.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/widgets/MetaWidget/MetaWidget.js":
/*!**************************************************************!*\
  !*** ./components/includes/widgets/MetaWidget/MetaWidget.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MetaWidget_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetaWidget.scss */ "./components/includes/widgets/MetaWidget/MetaWidget.scss");
/* harmony import */ var _MetaWidget_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MetaWidget_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const MetaWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    style: {
      color: 'white',
      backgroundColor: 'red'
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        color: props.metaTextColor || 'white',
        backgroundColor: props.metaBackgroundColor || 'red'
      }
    }));
  }, [props]);
  const renderMeta = (props.metaData || []).map(meta => {
    const path = `/posts?content=${meta._id}`;
    const icon = meta.type === 'categories' ? _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faFolder"] : meta.type === 'tags' ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faTag"] : meta.type === 'actors' ? _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faStar"] : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faTag"];
    return __jsx("div", {
      key: meta.name,
      className: "meta-child-element",
      style: state.style
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: icon,
      className: "meta-data-logo"
    }), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: path,
      key: meta.name
    }, __jsx("a", {
      className: "meta-widget-item",
      style: state.style
    }, "  ", meta.name)));
  });
  return __jsx("div", {
    className: "meta-widget"
  }, renderMeta);
};

/* harmony default export */ __webpack_exports__["default"] = (MetaWidget);

/***/ }),

/***/ "./components/includes/widgets/MetaWidget/MetaWidget.scss":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/MetaWidget/MetaWidget.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/widgets/RecentComments/RecentComments.js":
/*!**********************************************************************!*\
  !*** ./components/includes/widgets/RecentComments/RecentComments.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const RecentComments = props => {
  const renderComments = props.comments.map(comment => {
    return __jsx("div", {
      key: props.comments.indexOf(comment),
      className: "recent-comments-item"
    }, __jsx("strong", {
      className: "recent-comments-item-author"
    }, comment.author, " says:"), __jsx("p", null, comment.body));
  });
  return __jsx("div", {
    className: "recent-comments"
  }, renderComments);
};

/* harmony default export */ __webpack_exports__["default"] = (RecentComments);

/***/ }),

/***/ "./components/includes/widgets/SearchInputComponent/SearchInputComponent.js":
/*!**********************************************************************************!*\
  !*** ./components/includes/widgets/SearchInputComponent/SearchInputComponent.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchInputComponent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchInputComponent.scss */ "./components/includes/widgets/SearchInputComponent/SearchInputComponent.scss");
/* harmony import */ var _SearchInputComponent_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SearchInputComponent_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const SearchInputComponent = props => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pathURL: '',
    keyword: '',
    queries: {},
    style: {
      backgroundColor: '#222222'
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      queries: props.router ? props.router.query : {},
      pathURL: props.router ? props.router.pathname.includes('meta') ? props.router.pathname : '/posts' : '/posts',
      keyword: props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : '',
      style: _objectSpread({}, state.style, {
        backgroundColor: props.searchBtnBackgroundColor,
        color: props.searchBtnColor
      })
    }));
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.router) {
      if ((props.router.pathname.includes('posts') || props.router.pathname.includes('meta')) && props.router.query.keyword === '') {// props.router.push('/')
      }
    }
  }, [state]);

  const onChangeHandler = e => {
    setState(_objectSpread({}, state, {
      keyword: e.target.value
    }));
  };

  const mainPath = props.router ? props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' : props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? '/meta' : '/posts' : '/posts';
  const contentType = props.router ? props.router.query.contentType : '';
  const contentName = props.router ? props.router.query.contentName : '';
  const asPath = props.router ? props.router.asPath.includes('/tags/') ? '/' + contentType + '/' + contentName : props.router.asPath.includes('/categories/') ? '/' + contentType + '/' + contentName : props.router.asPath.includes('/actors/') ? '/' + contentType + '/' + contentName : props.router.asPath.includes('/tags') ? '/tags' : props.router.asPath.includes('/categories') ? '/categories' : props.router.asPath.includes('/actors') ? '/actors' : '/posts' : '/posts';
  const asQuery = {
    keyword: state.keyword ? state.keyword : undefined,
    page: router.query.page ? router.query.page : undefined,
    content: router.query.content ? router.query.content : undefined
  };
  !asQuery.keyword ? delete asQuery.keyword : null;
  asQuery.page == 1 ? delete asQuery.page : null;
  !asQuery.page ? delete asQuery.page : null;
  !asQuery.content ? delete asQuery.content : null;
  return __jsx("div", {
    className: "search-bar"
  }, __jsx("input", {
    className: "search-input",
    name: "keyword",
    onChange: e => onChangeHandler(e),
    value: state.keyword
  }), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: {
      pathname: mainPath,
      query: _objectSpread({}, state.queries, {
        keyword: state.keyword
      })
    },
    as: {
      pathname: asPath,
      query: asQuery
    }
  }, __jsx("a", {
    className: "search-bar-btn",
    style: state.style
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__["faSearch"],
    className: "search-bar-btn-logo",
    style: state.style
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(SearchInputComponent));

/***/ }),

/***/ "./components/includes/widgets/SearchInputComponent/SearchInputComponent.scss":
/*!************************************************************************************!*\
  !*** ./components/includes/widgets/SearchInputComponent/SearchInputComponent.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/layouts/AppLayout.js":
/*!*****************************************!*\
  !*** ./components/layouts/AppLayout.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _includes_Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../includes/Header/Header */ "./components/includes/Header/Header.js");
/* harmony import */ var _includes_TopBar_TopBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../includes/TopBar/TopBar */ "./components/includes/TopBar/TopBar.js");
/* harmony import */ var _includes_Header_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../includes/Header/Navigation/Navigation */ "./components/includes/Header/Navigation/Navigation.js");
/* harmony import */ var _includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../includes/Loading/Loading */ "./components/includes/Loading/Loading.js");
/* harmony import */ var _includes_AlertBox_AlertBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../includes/AlertBox/AlertBox */ "./components/includes/AlertBox/AlertBox.js");
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/global.scss */ "./styles/global.scss");
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_global_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _includes_AdminTools_AdminTools__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../includes/AdminTools/AdminTools */ "./components/includes/AdminTools/AdminTools.js");
/* harmony import */ var _includes_AdminTools_Console_Console__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../includes/AdminTools/Console/Console */ "./components/includes/AdminTools/Console/Console.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const AppLayout = props => {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!window.GA_INITIALIZED) {
      Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["initGA"])();
      window.GA_INITIALIZED = true;
    }

    Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["logPageView"])();
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_includes_TopBar_TopBar__WEBPACK_IMPORTED_MODULE_2__["default"], null), __jsx(_includes_Header_Header__WEBPACK_IMPORTED_MODULE_1__["default"], null), __jsx(_includes_Header_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_3__["default"], null), __jsx(_includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__["default"], null), __jsx(_includes_AlertBox_AlertBox__WEBPACK_IMPORTED_MODULE_5__["default"], null), __jsx("div", {
    className: "App"
  }, props.children), __jsx(_includes_AdminTools_AdminTools__WEBPACK_IMPORTED_MODULE_8__["default"], null), __jsx(_includes_AdminTools_Console_Console__WEBPACK_IMPORTED_MODULE_9__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

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
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(AppContext);
  const {
    0: state,
    1: dispatchState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    loading: false,
    videoPreviewID: '',
    activeLanguage: 'default',
    navigationOpenStatus: false,
    isMobile: true,
    console: false
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.innerWidth > 768 ? dispatchState(_objectSpread({}, state, {
      isMobile: false
    })) : dispatchState(_objectSpread({}, state, {
      isMobile: true
    }));
  }, [props]);
  const {
    0: alert,
    1: dispatchAlert
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    active: false,
    alertMessage: '',
    type: ''
  });
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
  });
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

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/amp-context.js":
/*!***************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/amp-context.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.AmpStateContext = React.createContext({});

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/amp.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/amp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

const amp_context_1 = __webpack_require__(/*! ./amp-context */ "./node_modules/next/dist/next-server/lib/amp-context.js");

function isInAmpMode({
  ampFirst = false,
  hybrid = false,
  hasQuery = false
} = {}) {
  return ampFirst || hybrid && hasQuery;
}

exports.isInAmpMode = isInAmpMode;

function useAmp() {
  // Don't assign the context value to a variable to save bytes
  return isInAmpMode(react_1.default.useContext(amp_context_1.AmpStateContext));
}

exports.useAmp = useAmp;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/constants.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PHASE_EXPORT = 'phase-export';
exports.PHASE_PRODUCTION_BUILD = 'phase-production-build';
exports.PHASE_PRODUCTION_SERVER = 'phase-production-server';
exports.PHASE_DEVELOPMENT_SERVER = 'phase-development-server';
exports.PAGES_MANIFEST = 'pages-manifest.json';
exports.BUILD_MANIFEST = 'build-manifest.json';
exports.EXPORT_MARKER = 'export-marker.json';
exports.EXPORT_DETAIL = 'export-detail.json';
exports.PRERENDER_MANIFEST = 'prerender-manifest.json';
exports.ROUTES_MANIFEST = 'routes-manifest.json';
exports.REACT_LOADABLE_MANIFEST = 'react-loadable-manifest.json';
exports.SERVER_DIRECTORY = 'server';
exports.SERVERLESS_DIRECTORY = 'serverless';
exports.CONFIG_FILE = 'next.config.js';
exports.BUILD_ID_FILE = 'BUILD_ID';
exports.BLOCKED_PAGES = ['/_document', '/_app'];
exports.CLIENT_PUBLIC_FILES_PATH = 'public';
exports.CLIENT_STATIC_FILES_PATH = 'static';
exports.CLIENT_STATIC_FILES_RUNTIME = 'runtime';
exports.AMP_RENDER_TARGET = '__NEXT_AMP_RENDER_TARGET__';
exports.CLIENT_STATIC_FILES_RUNTIME_PATH = `${exports.CLIENT_STATIC_FILES_PATH}/${exports.CLIENT_STATIC_FILES_RUNTIME}`; // static/runtime/main.js

exports.CLIENT_STATIC_FILES_RUNTIME_MAIN = `${exports.CLIENT_STATIC_FILES_RUNTIME_PATH}/main.js`; // static/runtime/amp.js

exports.CLIENT_STATIC_FILES_RUNTIME_AMP = `${exports.CLIENT_STATIC_FILES_RUNTIME_PATH}/amp.js`; // static/runtime/webpack.js

exports.CLIENT_STATIC_FILES_RUNTIME_WEBPACK = `${exports.CLIENT_STATIC_FILES_RUNTIME_PATH}/webpack.js`; // static/runtime/polyfills.js

exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = `${exports.CLIENT_STATIC_FILES_RUNTIME_PATH}/polyfills.js`; // matches static/<buildid>/pages/<page>.js

exports.IS_BUNDLED_PAGE_REGEX = /^static[/\\][^/\\]+[/\\]pages.*\.js$/; // matches static/<buildid>/pages/:page*.js

exports.ROUTE_NAME_REGEX = /^static[/\\][^/\\]+[/\\]pages[/\\](.*)\.js$/;
exports.SERVERLESS_ROUTE_NAME_REGEX = /^pages[/\\](.*)\.js$/;
exports.TEMPORARY_REDIRECT_STATUS = 307;
exports.PERMANENT_REDIRECT_STATUS = 308;
exports.STATIC_PROPS_ID = '__N_SSG';
exports.SERVER_PROPS_ID = '__N_SSP';

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/document-context.js":
/*!********************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/document-context.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.DocumentContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/head-manager-context.js":
/*!************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/head-manager-context.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.HeadManagerContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/head.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/head.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

const side_effect_1 = __importDefault(__webpack_require__(/*! ./side-effect */ "./node_modules/next/dist/next-server/lib/side-effect.js"));

const amp_context_1 = __webpack_require__(/*! ./amp-context */ "./node_modules/next/dist/next-server/lib/amp-context.js");

const head_manager_context_1 = __webpack_require__(/*! ./head-manager-context */ "./node_modules/next/dist/next-server/lib/head-manager-context.js");

const amp_1 = __webpack_require__(/*! ./amp */ "./node_modules/next/dist/next-server/lib/amp.js");

function defaultHead(inAmpMode = false) {
  const head = [react_1.default.createElement("meta", {
    charSet: "utf-8"
  })];

  if (!inAmpMode) {
    head.push(react_1.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width"
    }));
  }

  return head;
}

exports.defaultHead = defaultHead;

function onlyReactElement(list, child) {
  // React children can be "string" or "number" in this case we ignore them for backwards compat
  if (typeof child === 'string' || typeof child === 'number') {
    return list;
  } // Adds support for React.Fragment


  if (child.type === react_1.default.Fragment) {
    return list.concat(react_1.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild) => {
      if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
        return fragmentList;
      }

      return fragmentList.concat(fragmentChild);
    }, []));
  }

  return list.concat(child);
}

const METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp'];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/

function unique() {
  const keys = new Set();
  const tags = new Set();
  const metaTypes = new Set();
  const metaCategories = {};
  return h => {
    let unique = true;

    if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
      const key = h.key.slice(h.key.indexOf('$') + 1);

      if (keys.has(key)) {
        unique = false;
      } else {
        keys.add(key);
      }
    } // eslint-disable-next-line default-case


    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) {
          unique = false;
        } else {
          tags.add(h.type);
        }

        break;

      case 'meta':
        for (let i = 0, len = METATYPES.length; i < len; i++) {
          const metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === 'charSet') {
            if (metaTypes.has(metatype)) {
              unique = false;
            } else {
              metaTypes.add(metatype);
            }
          } else {
            const category = h.props[metatype];
            const categories = metaCategories[metatype] || new Set();

            if (categories.has(category)) {
              unique = false;
            } else {
              categories.add(category);
              metaCategories[metatype] = categories;
            }
          }
        }

        break;
    }

    return unique;
  };
}
/**
 *
 * @param headElements List of multiple <Head> instances
 */


function reduceComponents(headElements, props) {
  return headElements.reduce((list, headElement) => {
    const headElementChildren = react_1.default.Children.toArray(headElement.props.children);
    return list.concat(headElementChildren);
  }, []).reduce(onlyReactElement, []).reverse().concat(defaultHead(props.inAmpMode)).filter(unique()).reverse().map((c, i) => {
    const key = c.key || i;
    return react_1.default.cloneElement(c, {
      key
    });
  });
}

const Effect = side_effect_1.default();
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */

function Head({
  children
}) {
  return react_1.default.createElement(amp_context_1.AmpStateContext.Consumer, null, ampState => react_1.default.createElement(head_manager_context_1.HeadManagerContext.Consumer, null, updateHead => react_1.default.createElement(Effect, {
    reduceComponentsToState: reduceComponents,
    handleStateChange: updateHead,
    inAmpMode: amp_1.isInAmpMode(ampState)
  }, children)));
}

Head.rewind = Effect.rewind;
exports.default = Head;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router-context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function addBasePath(path) {
  // variable is always a string
  const p = "";
  return path.indexOf(p) !== 0 ? p + path : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      // @ts-ignore __NEXT_DATA__
      pathname: `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`,
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, addBasePath(as), options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, addBasePath(as), options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      Promise.all([this.pageLoader.prefetchData(url, asPath), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](toRoute(pathname))]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = decodeURIComponent;
    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/side-effect.js":
/*!***************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/side-effect.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __webpack_require__(/*! react */ "react");

const isServer = true;

exports.default = () => {
  const mountedInstances = new Set();
  let state;

  function emitChange(component) {
    state = component.props.reduceComponentsToState([...mountedInstances], component.props);

    if (component.props.handleStateChange) {
      component.props.handleStateChange(state);
    }
  }

  return class extends react_1.Component {
    // Used when server rendering
    static rewind() {
      const recordedState = state;
      state = undefined;
      mountedInstances.clear();
      return recordedState;
    }

    constructor(props) {
      super(props);

      if (isServer) {
        mountedInstances.add(this);
        emitChange(this);
      }
    }

    componentDidMount() {
      mountedInstances.add(this);
      emitChange(this);
    }

    componentDidUpdate() {
      emitChange(this);
    }

    componentWillUnmount() {
      mountedInstances.delete(this);
      emitChange(this);
    }

    render() {
      return null;
    }

  };
};

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/dist/next-server/server/utils.js":
/*!************************************************************!*\
  !*** ./node_modules/next/dist/next-server/server/utils.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ../lib/constants */ "./node_modules/next/dist/next-server/lib/constants.js");
function isBlockedPage(pathname) {
    return constants_1.BLOCKED_PAGES.indexOf(pathname) !== -1;
}
exports.isBlockedPage = isBlockedPage;
function cleanAmpPath(pathname) {
    if (pathname.match(/\?amp=(y|yes|true|1)/)) {
        pathname = pathname.replace(/\?amp=(y|yes|true|1)&?/, '?');
    }
    if (pathname.match(/&amp=(y|yes|true|1)/)) {
        pathname = pathname.replace(/&amp=(y|yes|true|1)/, '');
    }
    pathname = pathname.replace(/\?$/, '');
    return pathname;
}
exports.cleanAmpPath = cleanAmpPath;


/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.middleware = middleware;
exports.NextScript = exports.Main = exports.Head = exports.Html = exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../next-server/lib/constants */ "./node_modules/next/dist/next-server/lib/constants.js");

var _documentContext = __webpack_require__(/*! ../next-server/lib/document-context */ "./node_modules/next/dist/next-server/lib/document-context.js");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

exports.DocumentContext = _utils.DocumentContext;
exports.DocumentInitialProps = _utils.DocumentInitialProps;
exports.DocumentProps = _utils.DocumentProps;

var _utils2 = __webpack_require__(/*! ../next-server/server/utils */ "./node_modules/next/dist/next-server/server/utils.js");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "./node_modules/next/dist/server/htmlescape.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

async function middleware({
  req,
  res
}) {}

function dedupe(bundles) {
  const files = new Set();
  const kept = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }

  return kept;
}

function getOptionalModernScriptVariant(path) {
  if (false) {}

  return path;
}
/**
* `Document` component handles the initial `document` markup and renders only on the server side.
* Commonly used for implementing server side rendering for `css-in-js` libraries.
*/


class Document extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhancers =  false ? undefined : [];

    const enhanceApp = App => {
      for (const enhancer of enhancers) {
        App = enhancer(App);
      }

      return props => _react.default.createElement(App, props);
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server.default)(), ...( false ? undefined : [])];
    return {
      html,
      head,
      styles
    };
  }

  static renderDocument(Document, props) {
    return _react.default.createElement(_documentContext.DocumentContext.Provider, {
      value: {
        _documentProps: props,
        // In dev we invalidate the cache by appending a timestamp to the resource URL.
        // This is a workaround to fix https://github.com/zeit/next.js/issues/5860
        // TODO: remove this workaround when https://bugs.webkit.org/show_bug.cgi?id=187726 is fixed.
        _devOnlyInvalidateCacheQueryString: true ? '?ts=' + Date.now() : undefined
      }
    }, _react.default.createElement(Document, props));
  }

  render() {
    return _react.default.createElement(Html, null, _react.default.createElement(Head, null), _react.default.createElement("body", null, _react.default.createElement(Main, null), _react.default.createElement(NextScript, null)));
  }

}

exports.default = Document;
Document.headTagsMiddleware =  false ? undefined : () => [];
Document.bodyTagsMiddleware =  false ? undefined : () => [];
Document.htmlPropsMiddleware =  false ? undefined : () => [];

class Html extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  render() {
    const {
      inAmpMode,
      htmlProps
    } = this.context._documentProps;
    return _react.default.createElement("html", Object.assign({}, htmlProps, this.props, {
      amp: inAmpMode ? '' : undefined,
      "data-ampdevmode": inAmpMode && true ? '' : undefined
    }));
  }

}

exports.Html = Html;
Html.contextType = _documentContext.DocumentContext;
Html.propTypes = {
  children: _propTypes.default.node.isRequired
};

class Head extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getCssLinks() {
    const {
      assetPrefix,
      files
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    const cssFiles = files && files.length ? files.filter(f => /\.css$/.test(f)) : [];
    const cssLinkElements = [];
    cssFiles.forEach(file => {
      cssLinkElements.push(_react.default.createElement("link", {
        key: `${file}-preload`,
        nonce: this.props.nonce,
        rel: "preload",
        href: `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`,
        as: "style",
        crossOrigin: this.props.crossOrigin || undefined
      }), _react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined
      }));
    });
    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    return dedupe(dynamicImports).map(bundle => {
      // `dynamicImports` will contain both `.js` and `.module.js` when the
      // feature is enabled. This clause will filter down to the modern
      // variants only.
      if (!bundle.file.endsWith(getOptionalModernScriptVariant('.js'))) {
        return null;
      }

      return _react.default.createElement("link", {
        rel: "preload",
        key: bundle.file,
        href: `${assetPrefix}/_next/${encodeURI(bundle.file)}${_devOnlyInvalidateCacheQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks() {
    const {
      assetPrefix,
      files
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    const preloadFiles = files && files.length ? files.filter(file => {
      // `dynamicImports` will contain both `.js` and `.module.js` when
      // the feature is enabled. This clause will filter down to the
      // modern variants only.
      return file.endsWith(getOptionalModernScriptVariant('.js'));
    }) : [];
    return preloadFiles.length === 0 ? null : preloadFiles.map(file => {
      return _react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "preload",
        href: `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`,
        as: "script",
        crossOrigin: this.props.crossOrigin || undefined
      });
    });
  }

  render() {
    const {
      styles,
      ampPath,
      inAmpMode,
      assetPrefix,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    const {
      page,
      buildId
    } = __NEXT_DATA__;
    let {
      head
    } = this.context._documentProps;
    let children = this.props.children; // show a warning if Head contains <title> (only in development)

    if (true) {
      children = _react.default.Children.map(children, child => {
        const isReactHelmet = child && child.props && child.props['data-react-helmet'];

        if (child && child.type === 'title' && !isReactHelmet) {
          console.warn("Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title");
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://err.sh/next.js/doc-crossorigin-deprecated');
    }

    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://err.sh/next.js/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => el && el.props && el.props.dangerouslySetInnerHTML && el.props.dangerouslySetInnerHTML.__html; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.map(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    return _react.default.createElement("head", this.props, this.context._documentProps.isDevelopment && this.context._documentProps.hasCssMode && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), _react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, _react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children, head, _react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && _react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils2.cleanAmpPath)(dangerousAsPath)
    }), _react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && _react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), _react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), _react.default.createElement("noscript", null, _react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), _react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && _react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && _react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }), this.getCssLinks(), page !== '/_error' && _react.default.createElement("link", {
      rel: "preload",
      href: assetPrefix + getOptionalModernScriptVariant(encodeURI(`/_next/static/${buildId}/pages${getPageFile(page)}`)) + _devOnlyInvalidateCacheQueryString,
      as: "script",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    }), _react.default.createElement("link", {
      rel: "preload",
      href: assetPrefix + getOptionalModernScriptVariant(encodeURI(`/_next/static/${buildId}/pages/_app.js`)) + _devOnlyInvalidateCacheQueryString,
      as: "script",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    }), this.getPreloadDynamicChunks(), this.getPreloadMainLinks(), this.context._documentProps.isDevelopment && this.context._documentProps.hasCssMode && // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), _react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;
Head.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};

class Main extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  render() {
    const {
      inAmpMode,
      html
    } = this.context._documentProps;
    if (inAmpMode) return _constants.AMP_RENDER_TARGET;
    return _react.default.createElement("div", {
      id: "__next",
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }

}

exports.Main = Main;
Main.contextType = _documentContext.DocumentContext;

class NextScript extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      files
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    return dedupe(dynamicImports).map(bundle => {
      let modernProps = {};

      if (false) {}

      if (!/\.js$/.test(bundle.file) || files.includes(bundle.file)) return null;
      return _react.default.createElement("script", Object.assign({
        async: true,
        key: bundle.file,
        src: `${assetPrefix}/_next/${encodeURI(bundle.file)}${_devOnlyInvalidateCacheQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      }, modernProps));
    });
  }

  getScripts() {
    const {
      assetPrefix,
      files,
      lowPriorityFiles
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    const normalScripts = files === null || files === void 0 ? void 0 : files.filter(file => file.endsWith('.js'));
    const lowPriorityScripts = lowPriorityFiles === null || lowPriorityFiles === void 0 ? void 0 : lowPriorityFiles.filter(file => file.endsWith('.js'));
    return [...normalScripts, ...lowPriorityScripts].map(file => {
      let modernProps = {};

      if (false) {}

      return _react.default.createElement("script", Object.assign({
        key: file,
        src: `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`,
        nonce: this.props.nonce,
        async: true,
        crossOrigin: this.props.crossOrigin || undefined
      }, modernProps));
    });
  }

  getPolyfillScripts() {
    // polyfills.js has to be rendered as nomodule without async
    // It also has to be the first script to load
    const {
      assetPrefix,
      polyfillFiles
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;
    return polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !/\.module\.js$/.test(polyfill)).map(polyfill => _react.default.createElement("script", {
      key: polyfill,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      noModule: true,
      src: `${assetPrefix}/_next/${polyfill}${_devOnlyInvalidateCacheQueryString}`
    }));
  }

  static getInlineScriptSource(documentProps) {
    const {
      __NEXT_DATA__
    } = documentProps;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape.htmlEscapeJsonString)(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://err.sh/zeit/next.js/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      staticMarkup,
      assetPrefix,
      inAmpMode,
      devFiles,
      __NEXT_DATA__,
      bodyTags
    } = this.context._documentProps;
    const {
      _devOnlyInvalidateCacheQueryString
    } = this.context;

    if (inAmpMode) {
      if (false) {}

      const devFiles = [_constants.CLIENT_STATIC_FILES_RUNTIME_AMP, _constants.CLIENT_STATIC_FILES_RUNTIME_WEBPACK];
      return _react.default.createElement(_react.default.Fragment, null, staticMarkup ? null : _react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context._documentProps)
        },
        "data-ampdevmode": true
      }), devFiles ? devFiles.map(file => _react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${_devOnlyInvalidateCacheQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })) : null, _react.default.createElement(_react.default.Fragment, {}, ...(bodyTags || [])));
    }

    const {
      page,
      buildId
    } = __NEXT_DATA__;

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://err.sh/next.js/doc-crossorigin-deprecated');
    }

    const pageScript = [_react.default.createElement("script", Object.assign({
      async: true,
      "data-next-page": page,
      key: page,
      src: assetPrefix + encodeURI(`/_next/static/${buildId}/pages${getPageFile(page)}`) + _devOnlyInvalidateCacheQueryString,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    },  false ? undefined : {})),  false && false];
    const appScript = [_react.default.createElement("script", Object.assign({
      async: true,
      "data-next-page": "/_app",
      src: assetPrefix + `/_next/static/${buildId}/pages/_app.js` + _devOnlyInvalidateCacheQueryString,
      key: "_app",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    },  false ? undefined : {})),  false && false];
    return _react.default.createElement(_react.default.Fragment, null, devFiles ? devFiles.map(file => !file.match(/\.js\.map/) && _react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, staticMarkup ? null : _react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context._documentProps)
      }
    }),  false ? undefined : null, this.getPolyfillScripts(), page !== '/_error' && pageScript, appScript, staticMarkup ? null : this.getDynamicChunks(), staticMarkup ? null : this.getScripts(), _react.default.createElement(_react.default.Fragment, {}, ...(bodyTags || [])));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath ? ampPath : `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

function getPageFile(page, buildId) {
  if (page === '/') {
    return buildId ? `/index.${buildId}.js` : '/index.js';
  }

  return buildId ? `${page}.${buildId}.js` : `${page}.js`;
}

/***/ }),

/***/ "./node_modules/next/dist/server/htmlescape.js":
/*!*****************************************************!*\
  !*** ./node_modules/next/dist/server/htmlescape.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.htmlEscapeJsonString=htmlEscapeJsonString;// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP={'&':'\\u0026','>':'\\u003e','<':'\\u003c','\u2028':'\\u2028','\u2029':'\\u2029'};const ESCAPE_REGEX=/[&><\u2028\u2029]/g;function htmlEscapeJsonString(str){return str.replace(ESCAPE_REGEX,match=>ESCAPE_LOOKUP[match]);}

/***/ }),

/***/ "./node_modules/next/document.js":
/*!***************************************!*\
  !*** ./node_modules/next/document.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "./node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./pages/_error.js":
/*!*************************!*\
  !*** ./pages/_error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
/* harmony import */ var _components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/includes/SiteSettingsSetter/SiteSettingsSetter */ "./components/includes/SiteSettingsSetter/SiteSettingsSetter.js");
/* harmony import */ var _components_includes_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/includes/Footer/Footer */ "./components/includes/Footer/Footer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Error = props => {
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_2__["default"], props), __jsx("div", {
    className: "error-page"
  }, __jsx("h1", {
    className: "error-page-message"
  }, props.errorCode ? `error ${props.errorCode} occurred on server` : 'An error occurred on client')), __jsx(_components_includes_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    widgets: props.widgets,
    position: "footer"
  }));
};

Error.getInitialProps = async ({
  req,
  res,
  err
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Error);

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

/***/ "./static/images/fontawesome/language-solid.svg":
/*!******************************************************!*\
  !*** ./static/images/fontawesome/language-solid.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJsYW5ndWFnZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWxhbmd1YWdlIGZhLXctMjAiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQwIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUyLjEgMjM2LjJjLTMuNS0xMi4xLTcuOC0zMy4yLTcuOC0zMy4yaC0uNXMtNC4zIDIxLjEtNy44IDMzLjJsLTExLjEgMzcuNUgxNjN6TTYxNiA5NkgzMzZ2MzIwaDI4MGMxMy4zIDAgMjQtMTAuNyAyNC0yNFYxMjBjMC0xMy4zLTEwLjctMjQtMjQtMjR6bS0yNCAxMjBjMCA2LjYtNS40IDEyLTEyIDEyaC0xMS40Yy02LjkgMjMuNi0yMS43IDQ3LjQtNDIuNyA2OS45IDguNCA2LjQgMTcuMSAxMi41IDI2LjEgMTggNS41IDMuNCA3LjMgMTAuNSA0LjEgMTYuMmwtNy45IDEzLjljLTMuNCA1LjktMTAuOSA3LjgtMTYuNyA0LjMtMTIuNi03LjgtMjQuNS0xNi4xLTM1LjQtMjQuOS0xMC45IDguNy0yMi43IDE3LjEtMzUuNCAyNC45LTUuOCAzLjUtMTMuMyAxLjYtMTYuNy00LjNsLTcuOS0xMy45Yy0zLjItNS42LTEuNC0xMi44IDQuMi0xNi4yIDkuMy01LjcgMTgtMTEuNyAyNi4xLTE4LTcuOS04LjQtMTQuOS0xNy0yMS0yNS43LTQtNS43LTIuMi0xMy42IDMuNy0xNy4xbDYuNS0zLjkgNy4zLTQuM2M1LjQtMy4yIDEyLjQtMS43IDE2IDMuNCA1IDcgMTAuOCAxNCAxNy40IDIwLjkgMTMuNS0xNC4yIDIzLjgtMjguOSAzMC00My4ySDQxMmMtNi42IDAtMTItNS40LTEyLTEydi0xNmMwLTYuNiA1LjQtMTIgMTItMTJoNjR2LTE2YzAtNi42IDUuNC0xMiAxMi0xMmgxNmM2LjYgMCAxMiA1LjQgMTIgMTJ2MTZoNjRjNi42IDAgMTIgNS40IDEyIDEyek0wIDEyMHYyNzJjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMjgwVjk2SDI0Yy0xMy4zIDAtMjQgMTAuNy0yNCAyNHptNTguOSAyMTYuMUwxMTYuNCAxNjdjMS43LTQuOSA2LjItOC4xIDExLjQtOC4xaDMyLjVjNS4xIDAgOS43IDMuMyAxMS40IDguMWw1Ny41IDE2OS4xYzIuNiA3LjgtMy4xIDE1LjktMTEuNCAxNS45aC0yMi45YTEyIDEyIDAgMCAxLTExLjUtOC42bC05LjQtMzEuOWgtNjAuMmwtOS4xIDMxLjhjLTEuNSA1LjEtNi4yIDguNy0xMS41IDguN0g3MC4zYy04LjIgMC0xNC04LjEtMTEuNC0xNS45eiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),

/***/ "./styles/global.scss":
/*!****************************!*\
  !*** ./styles/global.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/_error.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! I:\Dev Project\reactServerSideRenderingWithNext\pages\_error.js */"./pages/_error.js");


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

/***/ "@fortawesome/react-fontawesome":
/*!*************************************************!*\
  !*** external "@fortawesome/react-fontawesome" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "@loadable/component":
/*!**************************************!*\
  !*** external "@loadable/component" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@loadable/component");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "html-react-parser":
/*!************************************!*\
  !*** external "html-react-parser" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("html-react-parser");

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

/***/ "next-ga":
/*!**************************!*\
  !*** external "next-ga" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-ga");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-ga":
/*!***************************!*\
  !*** external "react-ga" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/server");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=_error.js.map