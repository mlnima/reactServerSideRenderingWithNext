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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_variables/_variables.js":
/*!**********************************!*\
  !*** ./_variables/_variables.js ***!
  \**********************************/
/*! exports provided: likeValueCalculator, getAbsolutePath, generateAbsolutePath, clickPathGenerator, trimString, convertVariableNameToName, fileTypeDetector, initGA, logPageView, logEvent, logException, queryToObject, getLanguageQuery, getLanguageQueryFromWindowLocationSearch, addOrReplaceQueryToWindowLocationSearch, setLanguageToLocalStorage, getLanguageFromLocalStorage, pathAndAsPathGenerator, adminConsoleOpenCloseHandler, jsonExporter */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonExporter", function() { return jsonExporter; });
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
const jsonExporter = (data, fileName) => {
  const contentType = "application/json;charset=utf-8;";

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {
      type: contentType
    });
    navigator.msSaveOrOpenBlob(blob, fileName);
    contextData.dispatchState(_objectSpread({}, contextData.state, {
      loading: false
    }));
  } else {
    let a = document.createElement('a');
    a.download = fileName;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

/***/ }),

/***/ "./_variables/ajaxVariables.js":
/*!*************************************!*\
  !*** ./_variables/ajaxVariables.js ***!
  \*************************************/
/*! exports provided: updateSetting, saveCustomStyle, getSetting, addNewWidget, getSingleWidgetData, getMultipleWidgetWithData, getMultipleSetting, getWidgetsWithData, updateWidgets, deleteWidgets, executor, fileUpload, postThumbnailsUpload, uploadFiles, postProductTypeImages, userImageUpload, contactAjaxPost, saveFormWidgetData, getFormData, getSingleFormData, saveNewPage, updatePage, getPageData, getPagesData, youtubeDataScrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSetting", function() { return updateSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveCustomStyle", function() { return saveCustomStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSetting", function() { return getSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNewWidget", function() { return addNewWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSingleWidgetData", function() { return getSingleWidgetData; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFormWidgetData", function() { return saveFormWidgetData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormData", function() { return getFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSingleFormData", function() { return getSingleFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveNewPage", function() { return saveNewPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePage", function() { return updatePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageData", function() { return getPageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPagesData", function() { return getPagesData; });
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
};
const getSingleWidgetData = async data => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/getSingleWidgetData', body);
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
}; // will be remove

const contactAjaxPost = async data => {
  const body = {
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/form/contact', body);
}; //-- forms

const saveFormWidgetData = async data => {
  const body = {
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/forms/save', body);
};
const getFormData = async data => {
  const body = {
    data
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/forms/get', body);
};
const getSingleFormData = async (data, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + '/api/v1/forms/getFormData', body);
}; //pages

const saveNewPage = async data => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/pages/new', body);
};
const updatePage = async data => {
  const body = _objectSpread({}, data, {
    token: localStorage.wt
  });

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/pages/update', body);
};
const getPageData = async (data, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + '/api/v1/pages/getPageData', body);
};
const getPagesData = async data => {
  const body = _objectSpread({}, data, {
    token: localStorage.wt
  });

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/pages/getPagesData', body);
}; //others

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
            className: "bottom-right"
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faEye"],
            className: "post-element-info-logo"
          }), __jsx("span", {
            className: "view-count value-next-icon"
          }, props.state.views));

        case 'product':
          return __jsx("span", {
            ref: bottomRight,
            className: "bottom-right"
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
            className: "bottom-left"
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faClock"],
            className: "post-element-info-logo"
          }), __jsx("span", {
            className: "value-next-icon"
          }, "  ", props.state.duration));

        case 'product':
          return __jsx("span", {
            ref: bottomRight,
            className: "bottom-left"
          }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
            icon: props.state.currency === 'Usd' ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faDollarSign"] : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faEuroSign"],
            className: "post-element-info-logo"
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
            className: "top-right"
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
      className: "progressChild"
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
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-react-parser */ "html-react-parser");
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_react_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const SiteSettingSetter = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    title: '',
    themeColor: '',
    description: '',
    bodyBackgroundImage: '',
    keywords: [],
    customScripts: [],
    customStyles: ''
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
        description: props.identity ? props.identity.data.description || '' : '',
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
  const renderCustomScripts = (props.identity ? props.identity.data.customScripts || [] : []).map(script => {
    return html_react_parser__WEBPACK_IMPORTED_MODULE_4___default()(script.scriptBody);
  });
  return __jsx(next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx("title", null, state.title), __jsx("meta", {
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
  }), renderCustomScripts);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(SiteSettingSetter));

/***/ }),

/***/ "./components/includes/Widget/Logo/Logo.js":
/*!*************************************************!*\
  !*** ./components/includes/Widget/Logo/Logo.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
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
        src: props.LogoUrl,
        alt: "logo"
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
    className: "logo"
  }, __jsx(RenderLogoImage, null), __jsx(RenderLogoText, null), __jsx(RenderHeadLine, null)));
};

/* harmony default export */ __webpack_exports__["default"] = (Logo);

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
/* harmony import */ var _Widget_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Widget.scss */ "./components/includes/Widget/Widget.scss");
/* harmony import */ var _Widget_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Widget_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







let StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_5___default.a.div`${props => props.customStyles}`;

const Widget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    extraClassName: '',
    isMobile: true,
    navigationOpenStatus: true
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.innerWidth >= 768 ? setState(_objectSpread({}, state, {
      isMobile: false
    })) : setState(_objectSpread({}, state, {
      isMobile: true
    }));
  }, [props]);

  const RenderComponent = () => {
    if (props.component) {
      return __jsx(props.component, _extends({}, props.data, {
        id: props._id,
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
  }, [props]);

  if (!props.data.deviceTypeToRender || props.data.deviceTypeToRender === 'all' || state.isMobile && props.data.deviceTypeToRender === 'mobile' || !state.isMobile && props.data.deviceTypeToRender === 'desktop') {
    return __jsx(StyledDiv, {
      customStyles: props.data.customStyles ? props.data.customStyles : '',
      className: 'widget ' + state.extraClassName
    }, __jsx(_WidgetHeader_WidgetHeader__WEBPACK_IMPORTED_MODULE_1__["default"], props.data), __jsx(_WidgetText_WidgetText__WEBPACK_IMPORTED_MODULE_3__["default"], props.data), __jsx(RenderComponent, null), __jsx(_WidgetFooter_WidgetFooter__WEBPACK_IMPORTED_MODULE_2__["default"], props.data));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Widget);

/***/ }),

/***/ "./components/includes/Widget/Widget.scss":
/*!************************************************!*\
  !*** ./components/includes/Widget/Widget.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var _WidgetHeader_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WidgetHeader.scss */ "./components/includes/Widget/WidgetHeader/WidgetHeader.scss");
/* harmony import */ var _WidgetHeader_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_WidgetHeader_scss__WEBPACK_IMPORTED_MODULE_4__);
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
      return __jsx("h2", {
        className: "widget-header-title"
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
      className: "widget-Header",
      style: state.style.widgetHead
    }, __jsx(RenderTitle, null), __jsx(RenderRedirectLink, null));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(WidgetHeader));

/***/ }),

/***/ "./components/includes/Widget/WidgetHeader/WidgetHeader.scss":
/*!*******************************************************************!*\
  !*** ./components/includes/Widget/WidgetHeader/WidgetHeader.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var _Widget_Logo_Logo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Widget/Logo/Logo */ "./components/includes/Widget/Logo/Logo.js");
/* harmony import */ var _widgets_Authentication_Authentication__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../widgets/Authentication/Authentication */ "./components/includes/widgets/Authentication/Authentication.js");
/* harmony import */ var _widgets_LinkTo_LinkTo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../widgets/LinkTo/LinkTo */ "./components/includes/widgets/LinkTo/LinkTo.js");
/* harmony import */ var _widgets_ImageSwiper_ImageSwiper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../widgets/ImageSwiper/ImageSwiper */ "./components/includes/widgets/ImageSwiper/ImageSwiper.js");
/* harmony import */ var _widgets_PostSwiper_PostSwiper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../widgets/PostSwiper/PostSwiper */ "./components/includes/widgets/PostSwiper/PostSwiper.js");
/* harmony import */ var _widgets_MenuWidget_MenuWidget__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../widgets/MenuWidget/MenuWidget */ "./components/includes/widgets/MenuWidget/MenuWidget.js");
/* harmony import */ var _widgets_ShoppingCart_ShoppingCart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../widgets/ShoppingCart/ShoppingCart */ "./components/includes/widgets/ShoppingCart/ShoppingCart.js");
/* harmony import */ var _widgets_FormWidget_FormWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../widgets/FormWidget/FormWidget */ "./components/includes/widgets/FormWidget/FormWidget.js");
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
          component: _Widget_Logo_Logo__WEBPACK_IMPORTED_MODULE_9__["default"]
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

      case 'authentication':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_Authentication_Authentication__WEBPACK_IMPORTED_MODULE_10__["default"]
        }, widget));

      case 'linkTo':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_LinkTo_LinkTo__WEBPACK_IMPORTED_MODULE_11__["default"]
        }, widget));

      case 'imageSwiper':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_ImageSwiper_ImageSwiper__WEBPACK_IMPORTED_MODULE_12__["default"]
        }, widget));

      case 'postsSwiper':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_PostSwiper_PostSwiper__WEBPACK_IMPORTED_MODULE_13__["default"]
        }, widget));

      case 'menu':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_MenuWidget_MenuWidget__WEBPACK_IMPORTED_MODULE_14__["default"]
        }, widget));

      case 'shoppingCart':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_ShoppingCart_ShoppingCart__WEBPACK_IMPORTED_MODULE_15__["default"]
        }, widget));

      case 'form':
        // console.log(widget)
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          component: _widgets_FormWidget_FormWidget__WEBPACK_IMPORTED_MODULE_16__["default"]
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

/***/ "./components/includes/widgets/Authentication/Authentication.js":
/*!**********************************************************************!*\
  !*** ./components/includes/widgets/Authentication/Authentication.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoggedOutItemsMenu/LoggedOutItemsMenu */ "./components/includes/widgets/Authentication/LoggedOutItemsMenu/LoggedOutItemsMenu.js");
/* harmony import */ var _LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoggedInItemsForMenu/LoggedInItemsForMenu */ "./components/includes/widgets/Authentication/LoggedInItemsForMenu/LoggedInItemsForMenu.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const Authentication = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
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
      },
      itemsColorStyle: {
        backgroundColor: 'transparent',
        color: contextData.siteDesign.topBarTextColor
      }
    }));
  }, [contextData.siteDesign]);

  const RenderAuthBtns = () => {
    if (contextData.userData.username && !contextData.state.isMobile) {
      return __jsx("div", {
        className: "auth-buttons"
      }, __jsx(_LoggedInItemsForMenu_LoggedInItemsForMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
        visible: !contextData.state.isMobile,
        colorsStyle: state.itemsColorStyle,
        position: "topBar"
      }));
    } else if (!contextData.userData.username && !contextData.state.isMobile) {
      return __jsx("div", {
        className: "auth-buttons"
      }, __jsx(_LoggedOutItemsMenu_LoggedOutItemsMenu__WEBPACK_IMPORTED_MODULE_2__["default"], {
        visible: !contextData.state.isMobile,
        colorsStyle: state.itemsColorStyle,
        position: "topBar"
      }));
    } else return null;
  };

  return __jsx(RenderAuthBtns, null);
};

/* harmony default export */ __webpack_exports__["default"] = (Authentication);

/***/ }),

/***/ "./components/includes/widgets/Authentication/LoggedInItemsForMenu/LoggedInItemsForMenu.js":
/*!*************************************************************************************************!*\
  !*** ./components/includes/widgets/Authentication/LoggedInItemsForMenu/LoggedInItemsForMenu.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
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
        className: "logged-in-item-logo"
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
      className: "logged-in-item-logo"
    })), __jsx(MyProfile, null));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (LoggedInItemsForMenu);

/***/ }),

/***/ "./components/includes/widgets/Authentication/LoggedOutItemsMenu/LoggedOutItemsMenu.js":
/*!*********************************************************************************************!*\
  !*** ./components/includes/widgets/Authentication/LoggedOutItemsMenu/LoggedOutItemsMenu.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../context/AppContext */ "./context/AppContext.js");
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

  if (!contextData.userData.username && props.visible) {
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

/***/ "./components/includes/widgets/FormWidget/FormWidget.js":
/*!**************************************************************!*\
  !*** ./components/includes/widgets/FormWidget/FormWidget.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../_variables/ajaxVariables */ "./_variables/ajaxVariables.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _FormWidget_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormWidget.scss */ "./components/includes/widgets/FormWidget/FormWidget.scss");
/* harmony import */ var _FormWidget_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FormWidget_scss__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const FormWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    widgetId: '',
    formName: '',
    data: {}
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.id) {
      setState(_objectSpread({}, state, {
        widgetId: props.id,
        formName: props.formData.formName
      }));
    }
  }, [props]);

  const onFormFieldsChangeHandler = e => {
    setState(_objectSpread({}, state, {
      data: _objectSpread({}, state.data, {
        [e.target.name]: e.target.value
      })
    }));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_1__["saveFormWidgetData"])(_objectSpread({}, state, {
      date: Date.now()
    })).then(res => {
      console.log(res);
    });
  };

  const renderFields = (props.formData.formFields || []).map(field => {
    if (field.fieldType === 'textarea') {
      return __jsx("div", {
        className: "form-widget-field",
        key: (props.formData.formFields || []).indexOf(field)
      }, __jsx("p", null, Object(_variables_variables__WEBPACK_IMPORTED_MODULE_2__["convertVariableNameToName"])(field.fieldName)), __jsx("textarea", {
        name: field.fieldName,
        placeholder: field.fieldPlaceHolder,
        required: field.required,
        onChange: e => onFormFieldsChangeHandler(e)
      }));
    } else {
      return __jsx("div", {
        className: "form-widget-field",
        key: (props.formData.formFields || []).indexOf(field)
      }, __jsx("p", null, Object(_variables_variables__WEBPACK_IMPORTED_MODULE_2__["convertVariableNameToName"])(field.fieldName)), __jsx("input", {
        name: field.fieldName,
        type: field.fieldType,
        placeholder: field.fieldPlaceHolder,
        required: field.required,
        onChange: e => onFormFieldsChangeHandler(e)
      }));
    }
  });
  return __jsx("div", {
    className: "form-widget"
  }, __jsx("form", {
    onSubmit: e => onSubmitHandler(e)
  }, __jsx("h2", null, props.formData.formTitle), renderFields, __jsx("button", {
    type: "submit",
    className: "submit-button"
  }, props.formData.submitButtonText || 'Submit')));
};

/* harmony default export */ __webpack_exports__["default"] = (FormWidget);

/***/ }),

/***/ "./components/includes/widgets/FormWidget/FormWidget.scss":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/FormWidget/FormWidget.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/includes/widgets/ImageSwiper/ImageSwiper.js":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/ImageSwiper/ImageSwiper.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/swiper-bundle.css */ "./node_modules/swiper/swiper-bundle.css");
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ImageSwiper_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImageSwiper.scss */ "./components/includes/widgets/ImageSwiper/ImageSwiper.scss");
/* harmony import */ var _ImageSwiper_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ImageSwiper_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // let swiper;

swiper__WEBPACK_IMPORTED_MODULE_2___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_2__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_2__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_2__["Scrollbar"], swiper__WEBPACK_IMPORTED_MODULE_2__["Keyboard"], swiper__WEBPACK_IMPORTED_MODULE_2__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_2__["Controller"], swiper__WEBPACK_IMPORTED_MODULE_2__["EffectCube"], swiper__WEBPACK_IMPORTED_MODULE_2__["EffectCoverflow"], swiper__WEBPACK_IMPORTED_MODULE_2__["Lazy"]]);

const ImageSwiper = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);
  const {
    0: thumbsSwiper,
    1: setThumbsSwiper
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: controlledSwiper,
    1: setControlledSwiper
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    imageSwiperData: []
  }); //
  // useEffect(() => {
  //     console.log(state)
  // }, [state]);

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.imageSwiperData) {
      setState(_objectSpread({}, state, {
        imageSwiperData: props.imageSwiperData,
        spaceBetween: contextData.state.isMobile ? props.imageSwiperSpaceBetweenMobile || 0 : props.imageSwiperSpaceBetweenDeskTop || 0,
        slidesPerView: contextData.state.isMobile ? props.imageSwiperSpaceBetweenMobile || 1 : props.imageSwiperSpaceBetweenDeskTop || 3
      }));
    }
  }, [props.imageSwiperData, contextData.state.isMobile]);
  const renderSlides = state.imageSwiperData.map(imageData => {
    if (imageData.targetUrlType === 'internal') {
      return __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_1__["SwiperSlide"], {
        tag: "li",
        key: props.imageSwiperData.indexOf(imageData)
      }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
        href: imageData.targetUrl,
        as: imageData.targetUrlAs || imageData.targetUrl
      }, __jsx("a", null, __jsx("img", {
        src: imageData.imageUrl,
        alr: `Thumbnail ${imageData.imageUrl}`
      }))));
    } else if (imageData.targetUrlType === 'external') {
      return __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_1__["SwiperSlide"], {
        tag: "li",
        key: props.imageSwiperData.indexOf(imageData)
      }, __jsx("a", {
        href: imageData.targetUrl
      }, __jsx("img", {
        src: imageData.imageUrl,
        alt: `Thumbnail ${imageData.imageUrl}`
      })));
    } else return null;
  });

  if (state.imageSwiperData.length > 0) {
    return __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_1__["Swiper"], {
      thumbs: {
        swiper: thumbsSwiper
      },
      controller: {
        control: controlledSwiper
      },
      className: "image-swiper",
      tag: "section",
      keyboard: true,
      autoplay: true,
      speed: 2000,
      navigation: true // pagination
      ,
      spaceBetween: state.spaceBetween,
      slidesPerView: state.slidesPerView
    }, renderSlides);
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (ImageSwiper);

/***/ }),

/***/ "./components/includes/widgets/ImageSwiper/ImageSwiper.scss":
/*!******************************************************************!*\
  !*** ./components/includes/widgets/ImageSwiper/ImageSwiper.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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

/***/ "./components/includes/widgets/LinkTo/LinkTo.js":
/*!******************************************************!*\
  !*** ./components/includes/widgets/LinkTo/LinkTo.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const LinkTo = props => {
  if (props.linkTo && props.linkToType) {
    if (props.linkToType === 'internal') {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: props.linkTo ? props.linkTo : '/',
        as: props.linkToAs ? props.linkToAs : props.linkTo || '/'
      }, __jsx("a", null, props.linkToText));
    } else if (props.linkToType === 'external') {
      return __jsx("a", {
        href: props.linkTo,
        target: props.linkToWindowType ? props.linkToWindowType : '_self'
      }, props.linkToText);
    } else return null;
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (LinkTo);

/***/ }),

/***/ "./components/includes/widgets/MediaWidget/MediaDocumentWidget/MediaDocumentWidget.js":
/*!********************************************************************************************!*\
  !*** ./components/includes/widgets/MediaWidget/MediaDocumentWidget/MediaDocumentWidget.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-pdf */ "react-pdf");
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_pdf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





react_pdf__WEBPACK_IMPORTED_MODULE_1__["pdfjs"].GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${react_pdf__WEBPACK_IMPORTED_MODULE_1__["pdfjs"].version}/pdf.worker.js`;

const MediaDocumentWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    maxPage: 0,
    activePage: 1
  });

  const onDocumentLoad = ({
    numPages
  }) => {
    setState(_objectSpread({}, state, {
      maxPage: numPages
    }));
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(state);
  }, [state]);

  const PagesController = () => {
    if (state.maxPage > 1) {
      return __jsx("div", {
        className: "page-controller"
      }, __jsx("button", {
        onClick: () => {
          setState(_objectSpread({}, state, {
            activePage: state.activePage - 1 < 1 ? 1 : state.activePage - 1
          }));
        }
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faArrowLeft"],
        className: "svg-logo-small"
      })), __jsx("button", {
        onClick: () => {
          setState(_objectSpread({}, state, {
            activePage: state.activePage + 1 > state.maxPage ? state.maxPage : state.activePage + 1
          }));
        }
      }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faArrowRight"],
        className: "svg-logo-small"
      })));
    } else return null;
  };

  const documentWidth = window.innerWidth > 768 ? 760 : window.innerWidth;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_1__["Document"], {
    className: "widget-document-type",
    file: props.mediaUrl,
    onLoadError: console.error,
    onLoadSuccess: onDocumentLoad
  }, __jsx(react_pdf__WEBPACK_IMPORTED_MODULE_1__["Page"], {
    pageNumber: state.activePage || 1,
    width: documentWidth
  })), __jsx(PagesController, null));
};

/* harmony default export */ __webpack_exports__["default"] = (MediaDocumentWidget);

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
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-pdf */ "react-pdf");
/* harmony import */ var react_pdf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_pdf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-pdf/renderer */ "@react-pdf/renderer");
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MediaDocumentWidget_MediaDocumentWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MediaDocumentWidget/MediaDocumentWidget */ "./components/includes/widgets/MediaWidget/MediaDocumentWidget/MediaDocumentWidget.js");
/* harmony import */ var _MediaWidget_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MediaWidget.scss */ "./components/includes/widgets/MediaWidget/MediaWidget.scss");
/* harmony import */ var _MediaWidget_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_MediaWidget_scss__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // import {pdfjs} from "react-pdf";
// import { Text, View, StyleSheet } from '@react-pdf/renderer';





const MediaWidget = props => {
  const pdfViewer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    extraClassName: ''
  }); // const [docData,setDocData]=useState({
  //     maxPage:null
  // })

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    props.mediaType === 'iframe' ? setState(_objectSpread({}, state, {
      extraClassName: 'media-widget-video-iframe'
    })) : setState(_objectSpread({}, state, {
      extraClassName: ''
    }));
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.mediaType === 'document') {
      console.log(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_2__);
    }
  }, []); // const styles = StyleSheet.create({
  //     page: {
  //         flexDirection: 'row',
  //         backgroundColor: '#E4E4E4'
  //     },
  //     section: {
  //         margin: 10,
  //         padding: 10,
  //         flexGrow: 1
  //     }
  // });

  const WhatToRender = () => {
    if (props.mediaUrl && props.mediaType) {
      switch (props.mediaType) {
        case 'image':
          return __jsx("img", {
            className: "media-element",
            src: props.mediaUrl,
            alt: props.title || props.type
          });

        case 'video':
          return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("video", {
            className: "media-element",
            src: props.mediaUrl,
            controls: true
          }));

        case 'document':
          return __jsx(_MediaDocumentWidget_MediaDocumentWidget__WEBPACK_IMPORTED_MODULE_3__["default"], props);

        case 'iframe':
          return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("iframe", {
            className: "media-element",
            src: props.mediaUrl
          }));

        case 'audio':
          return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("audio", {
            className: "media-element",
            controls: true,
            src: props.mediaUrl
          }));

        default:
          return null;
      }
    } else return null;
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

/***/ "./components/includes/widgets/MenuWidget/MenuWidget.js":
/*!**************************************************************!*\
  !*** ./components/includes/widgets/MenuWidget/MenuWidget.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuWidget_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuWidget.scss */ "./components/includes/widgets/MenuWidget/MenuWidget.scss");
/* harmony import */ var _MenuWidget_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MenuWidget_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const MenuWidget = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"]);
  const {
    0: menuItems,
    1: setMenuItems
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const {
    0: open,
    1: setOpen
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (props.menuItems) {
      setMenuItems(props.menuItems);
    }
  }, [props]);
  const renderMenuItems = Object.keys(menuItems).map(menuItem => {
    console.log(menuItems[menuItem]);

    if (menuItems[menuItem].type === 'internal') {
      return __jsx("li", {
        className: "menu-widget-item",
        key: menuItems[menuItem].name
      }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
        href: menuItems[menuItem].target,
        as: menuItems[menuItem].as
      }, __jsx("a", null, menuItems[menuItem].name)));
    } else if (menuItems[menuItem].type === 'external') {
      return __jsx("li", {
        className: "menu-widget-item",
        key: menuItems[menuItem].name
      }, __jsx("a", {
        href: menuItems[menuItem].target
      }, menuItems[menuItem].name));
    } else return null;
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!contextData.state.isMobile) {
      setOpen(true);
    }
  }, [contextData.state.isMobile]);
  return __jsx("div", {
    className: "menu-widget"
  }, __jsx("button", {
    style: {
      display: contextData.state.isMobile ? 'initial' : 'none'
    },
    onClick: () => open ? setOpen(false) : setOpen(true),
    className: "navigation-mobile-button"
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faBars"],
    className: "navigation-mobile-button-logo"
  })), __jsx("ul", {
    className: "menu-widget-items",
    style: {
      display: open ? 'flex' : 'none'
    }
  }, __jsx("button", {
    style: {
      display: contextData.state.isMobile ? 'initial' : 'none'
    },
    onClick: () => open ? setOpen(false) : setOpen(true),
    className: "navigation-close-button"
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faTimes"],
    className: "navigation-mobile-button-logo svg-logo-medium"
  })), renderMenuItems));
};

/* harmony default export */ __webpack_exports__["default"] = (MenuWidget);

/***/ }),

/***/ "./components/includes/widgets/MenuWidget/MenuWidget.scss":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/MenuWidget/MenuWidget.scss ***!
  \****************************************************************/
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
    const icon = meta.type === 'categories' ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faFolder"] : meta.type === 'tags' ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faTag"] : meta.type === 'actors' ? _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faStar"] : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faTag"];
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

/***/ "./components/includes/widgets/PostSwiper/PostSwiper.js":
/*!**************************************************************!*\
  !*** ./components/includes/widgets/PostSwiper/PostSwiper.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/swiper-bundle.css */ "./node_modules/swiper/swiper-bundle.css");
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PostSwiper_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PostSwiper.scss */ "./components/includes/widgets/PostSwiper/PostSwiper.scss");
/* harmony import */ var _PostSwiper_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_PostSwiper_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








swiper__WEBPACK_IMPORTED_MODULE_2___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_2__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_2__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_2__["Scrollbar"], swiper__WEBPACK_IMPORTED_MODULE_2__["Keyboard"], swiper__WEBPACK_IMPORTED_MODULE_2__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_2__["Controller"], swiper__WEBPACK_IMPORTED_MODULE_2__["EffectCube"], swiper__WEBPACK_IMPORTED_MODULE_2__["EffectCoverflow"], swiper__WEBPACK_IMPORTED_MODULE_2__["Lazy"]]);

const PostSwiper = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"]);
  const {
    0: thumbsSwiper,
    1: setThumbsSwiper
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: controlledSwiper,
    1: setControlledSwiper
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    spaceBetween: 0,
    slidesPerView: 3
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(props);
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      spaceBetween: window.innerWidth >= 768 ? props.postSwiperSpaceBetweenDesktop || 0 : props.postSwiperSpaceBetweenMobile || 1,
      slidesPerView: window.innerWidth >= 768 ? props.postSwiperAmountDesktop || 3 : props.postSwiperAmountMobile || 1
    }));
  }, [props]);
  const renderSlides = props.posts.map(post => {
    return __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_1__["SwiperSlide"], {
      tag: "li",
      key: props.posts.indexOf(post)
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
      href: {
        pathname: '/post',
        query: {
          id: post._id
        }
      },
      as: contextData.state.activeLanguage !== 'default' ? `/post/${post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title}?id=${post._id}&lang=${contextData.state.activeLanguage}` : `/post/${post.title}?id=${post._id}`
    }, __jsx("a", null, __jsx("img", {
      src: post.mainThumbnail,
      alt: `Thumbnail ${post.mainThumbnail}`
    }), __jsx("h3", {
      style: {
        textAlign: 'center'
      }
    }, post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title))));
  });
  return __jsx("div", null, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_1__["Swiper"], {
    thumbs: {
      swiper: thumbsSwiper
    },
    controller: {
      control: controlledSwiper
    },
    className: "post-swiper",
    tag: "section",
    keyboard: true,
    autoplay: true,
    speed: 2000,
    navigation: true // pagination={{ clickable: true }}
    ,
    scrollbar: {
      draggable: true
    },
    spaceBetween: state.spaceBetween || 0,
    slidesPerView: state.slidesPerView || 3
  }, renderSlides));
};

/* harmony default export */ __webpack_exports__["default"] = (PostSwiper); //{/*{renderSlides}*/}
//

/***/ }),

/***/ "./components/includes/widgets/PostSwiper/PostSwiper.scss":
/*!****************************************************************!*\
  !*** ./components/includes/widgets/PostSwiper/PostSwiper.scss ***!
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
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const RecentComments = props => {
  const renderComments = props.comments.map(comment => {
    return __jsx("div", {
      key: props.comments.indexOf(comment),
      className: "recent-comments-item"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: `/post/${comment.onDocumentTitle}?id=${comment.onDocumentId}`
    }, __jsx("a", null, __jsx("strong", {
      className: "recent-comments-item-author"
    }, comment.onDocumentTitle))), __jsx("strong", {
      className: "recent-comments-item-author"
    }, comment.author, ":"), __jsx("p", null, comment.body));
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
    },
    isOpen: false
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

  const onSearchHandler = e => {
    e.preventDefault();
    router.push({
      pathname: mainPath,
      query: _objectSpread({}, state.queries, {
        keyword: state.keyword
      })
    }, {
      pathname: asPath,
      query: asQuery
    });
  };

  const onOpenCloseHandler = () => {
    state.isOpen ? setState(_objectSpread({}, state, {
      isOpen: false
    })) : setState(_objectSpread({}, state, {
      isOpen: true
    }));
  };

  if (state.isOpen) {
    return __jsx("form", {
      className: "search-bar",
      onSubmit: e => onSearchHandler(e)
    }, __jsx("button", {
      className: "search-bar-btn-close",
      onClick: onOpenCloseHandler
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__["faTimes"],
      className: "search-bar-btn-logo svg-logo-medium",
      style: state.style
    })), __jsx("input", {
      className: "search-input",
      name: "keyword",
      onChange: e => onChangeHandler(e),
      value: state.keyword
    }), __jsx("button", {
      className: "search-bar-btn",
      type: "submit"
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__["faSearch"],
      className: "search-bar-btn-logo svg-logo-medium",
      style: state.style
    })));
  } else {
    return __jsx("button", {
      className: "search-bar-btn-close",
      onClick: onOpenCloseHandler
    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__["faSearch"],
      className: "search-bar-btn-logo svg-logo-medium",
      style: state.style
    }));
  }
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

/***/ "./components/includes/widgets/ShoppingCart/ShoppingCart.js":
/*!******************************************************************!*\
  !*** ./components/includes/widgets/ShoppingCart/ShoppingCart.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ShoppingCart_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShoppingCart.scss */ "./components/includes/widgets/ShoppingCart/ShoppingCart.scss");
/* harmony import */ var _ShoppingCart_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ShoppingCart_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const ShoppingCart = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_5__["AppContext"]);
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/checkout"
  }, __jsx("a", {
    className: "shopping-card-link"
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faShoppingCart"],
    className: "shopping-card-logo svg-logo-medium",
    style: props.colorsStyle
  }), __jsx("p", {
    className: "shopping-card-number"
  }, contextData.checkOutData.items.length)));
};

/* harmony default export */ __webpack_exports__["default"] = (ShoppingCart);

/***/ }),

/***/ "./components/includes/widgets/ShoppingCart/ShoppingCart.scss":
/*!********************************************************************!*\
  !*** ./components/includes/widgets/ShoppingCart/ShoppingCart.scss ***!
  \********************************************************************/
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
/* harmony import */ var _widgetsArea_Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../widgetsArea/Header/Header */ "./components/widgetsArea/Header/Header.js");
/* harmony import */ var _widgetsArea_TopBar_TopBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgetsArea/TopBar/TopBar */ "./components/widgetsArea/TopBar/TopBar.js");
/* harmony import */ var _widgetsArea_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgetsArea/Navigation/Navigation */ "./components/widgetsArea/Navigation/Navigation.js");
/* harmony import */ var _includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../includes/Loading/Loading */ "./components/includes/Loading/Loading.js");
/* harmony import */ var _includes_AlertBox_AlertBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../includes/AlertBox/AlertBox */ "./components/includes/AlertBox/AlertBox.js");
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/global.scss */ "./styles/global.scss");
/* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_global_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _includes_AdminTools_AdminTools__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../includes/AdminTools/AdminTools */ "./components/includes/AdminTools/AdminTools.js");
/* harmony import */ var _includes_AdminTools_Console_Console__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../includes/AdminTools/Console/Console */ "./components/includes/AdminTools/Console/Console.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _widgetsArea_WidgetArea_WidgetArea__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../widgetsArea/WidgetArea/WidgetArea */ "./components/widgetsArea/WidgetArea/WidgetArea.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;














const AppLayout = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_11__["AppContext"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!window.GA_INITIALIZED) {
      Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["initGA"])();
      window.GA_INITIALIZED = true;
    }

    Object(_variables_variables__WEBPACK_IMPORTED_MODULE_7__["logPageView"])();
  }, []);
  const GlobalStyle = contextData.siteDesign.customStyles ? styled_components__WEBPACK_IMPORTED_MODULE_10__["createGlobalStyle"]`${contextData.siteDesign.customStyles}` : styled_components__WEBPACK_IMPORTED_MODULE_10__["createGlobalStyle"]``;
  return __jsx("div", {
    className: "app"
  }, __jsx(GlobalStyle, null), __jsx(_widgetsArea_WidgetArea_WidgetArea__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: "top-bar",
    position: "topBar",
    stylesData: contextData.siteDesign.topBarStyle
  }), __jsx(_widgetsArea_WidgetArea_WidgetArea__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: "header",
    position: "header",
    stylesData: contextData.siteDesign.headerStyle
  }), __jsx(_widgetsArea_WidgetArea_WidgetArea__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: "navigation",
    position: "navigation",
    stylesData: contextData.siteDesign.navigationStyle
  }), __jsx("div", {
    className: "App"
  }, props.children), __jsx(_widgetsArea_WidgetArea_WidgetArea__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: "footer",
    position: "footer",
    stylesData: contextData.siteDesign.footerStyle
  }), __jsx(_includes_AdminTools_AdminTools__WEBPACK_IMPORTED_MODULE_8__["default"], null), __jsx(_includes_AdminTools_Console_Console__WEBPACK_IMPORTED_MODULE_9__["default"], null), __jsx(_includes_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__["default"], null), __jsx(_includes_AlertBox_AlertBox__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

/***/ }),

/***/ "./components/widgetsArea/Footer/Footer.js":
/*!*************************************************!*\
  !*** ./components/widgetsArea/Footer/Footer.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../includes/WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Footer = props => {
  return __jsx("div", {
    id: "footer"
  }, __jsx(_includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_1__["default"], props));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./components/widgetsArea/Header/Header.js":
/*!*************************************************!*\
  !*** ./components/widgetsArea/Header/Header.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../includes/WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




let StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div`${props => props.customStyles}`;

const Header = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  return __jsx(StyledDiv, {
    customStyles: contextData.siteDesign.headerStyle ? contextData.siteDesign.headerStyle : '',
    className: "header"
  }, __jsx(_includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    widgets: contextData.siteWidgets,
    position: "header"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/widgetsArea/Navigation/Navigation.js":
/*!*********************************************************!*\
  !*** ./components/widgetsArea/Navigation/Navigation.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../includes/WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





let StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div`${props => props.customStyles}`;

const Navigation = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  return __jsx(StyledDiv, {
    customStyles: contextData.siteDesign.navigationStyle ? contextData.siteDesign.navigationStyle : '',
    className: "navigation"
  }, __jsx(_includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    widgets: contextData.siteWidgets,
    position: "navigation"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_2___default()(Navigation));

/***/ }),

/***/ "./components/widgetsArea/TopBar/TopBar.js":
/*!*************************************************!*\
  !*** ./components/widgetsArea/TopBar/TopBar.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../includes/WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





let StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div`${props => props.customStyles}`;

const TopBar = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(contextData.siteDesign);
  }, [contextData]);

  if (contextData.siteIdentity.topBarVisibility || (contextData.navigationData || []).length > 0 && contextData.state.isMobile) {
    return __jsx(StyledDiv, {
      customStyles: contextData.siteDesign.topBarStyle ? contextData.siteDesign.topBarStyle : '',
      className: "top-bar"
    }, __jsx("div", {
      className: "top-bar-items"
    }, __jsx(_includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      widgets: contextData.siteWidgets,
      position: "topBar"
    })));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(TopBar));

/***/ }),

/***/ "./components/widgetsArea/WidgetArea/WidgetArea.js":
/*!*********************************************************!*\
  !*** ./components/widgetsArea/WidgetArea/WidgetArea.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../includes/WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
/* harmony import */ var _WidgetArea_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WidgetArea.scss */ "./components/widgetsArea/WidgetArea/WidgetArea.scss");
/* harmony import */ var _WidgetArea_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_WidgetArea_scss__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





let StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div`${props => props.stylesData}`;

const WidgetArea = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  if (contextData.siteWidgets.filter(i => i.data.position === props.position).length > 0) {
    return __jsx(StyledDiv, {
      stylesData: props.stylesData,
      className: props.className + ' widget-area'
    }, __jsx(_includes_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      widgets: contextData.siteWidgets,
      position: props.position
    }));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetArea);

/***/ }),

/***/ "./components/widgetsArea/WidgetArea/WidgetArea.scss":
/*!***********************************************************!*\
  !*** ./components/widgetsArea/WidgetArea/WidgetArea.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_7__);
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
    window.innerWidth >= 768 ? dispatchState(_objectSpread({}, state, {
      isMobile: false,
      navigationOpenStatus: true
    })) : dispatchState(_objectSpread({}, state, {
      isMobile: true,
      navigationOpenStatus: false
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
    0: checkOutData,
    1: setCheckOutData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    items: []
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
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(AppContext.Provider, {
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
      setSiteWidgets,
      checkOutData,
      setCheckOutData // adminWidgets,
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

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/swiper/swiper-bundle.css":
/*!***********************************************!*\
  !*** ./node_modules/swiper/swiper-bundle.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var _components_widgetsArea_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/widgetsArea/Footer/Footer */ "./components/widgetsArea/Footer/Footer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Error = props => {
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_2__["default"], props), __jsx("div", {
    className: "error-page"
  }, __jsx("h1", {
    className: "error-page-message"
  }, props.errorCode ? `error ${props.errorCode} occurred on server` : 'An error occurred on client')), __jsx(_components_widgetsArea_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], {
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

/***/ "@react-pdf/renderer":
/*!**************************************!*\
  !*** external "@react-pdf/renderer" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@react-pdf/renderer");

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

/***/ "react-pdf":
/*!****************************!*\
  !*** external "react-pdf" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-pdf");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "swiper":
/*!*************************!*\
  !*** external "swiper" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper");

/***/ }),

/***/ "swiper/react":
/*!*******************************!*\
  !*** external "swiper/react" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper/react");

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