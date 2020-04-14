module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+wRh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__("A8lN");

// EXTERNAL MODULE: ./node_modules/next/dist/client/with-router.js
var with_router = __webpack_require__("0Bsm");
var with_router_default = /*#__PURE__*/__webpack_require__.n(with_router);

// EXTERNAL MODULE: external "react-fontawesome"
var external_react_fontawesome_ = __webpack_require__("C5Kc");
var external_react_fontawesome_default = /*#__PURE__*/__webpack_require__.n(external_react_fontawesome_);

// CONCATENATED MODULE: ./components/adminIncludes/TopBar/AdminActionMenu/AdminActionMenu.js
var __jsx = external_react_default.a.createElement;


const AdminActionMenu = props => {
  if (props.active) {
    return __jsx("div", {
      className: "AdminActionMenu"
    }, __jsx("button", {
      className: "AdminActionMenuItem"
    }, " My Profile"), __jsx("button", {
      className: "AdminActionMenuItem"
    }, " Edit My Profile"), __jsx("button", {
      className: "AdminActionMenuItem"
    }, " Log Out"));
  } else return null;
};

/* harmony default export */ var AdminActionMenu_AdminActionMenu = (AdminActionMenu);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// CONCATENATED MODULE: ./components/adminIncludes/TopBar/NewItemMenu/NewItemMenu.js
var NewItemMenu_jsx = external_react_default.a.createElement;



const NewItemMenu = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {}, []);

  if (props.active) {
    return NewItemMenu_jsx("div", {
      className: "NewItemMenu"
    }, NewItemMenu_jsx(link_default.a, {
      href: "/admin/post?new=1"
    }, NewItemMenu_jsx("a", {
      className: "SideBarItem"
    }, "New Post")));
  } else return null;
};

/* harmony default export */ var NewItemMenu_NewItemMenu = (NewItemMenu);
// CONCATENATED MODULE: ./components/adminIncludes/TopBar/AdminTopBar.js
var AdminTopBar_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // import { setSprCache } from "next/dist/next-server/server/spr-cache";

const AdminTopBar = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: dispatchState
  } = Object(external_react_["useState"])({
    AdminActionMenu: false,
    NewItemMenu: false
  });

  const AdminSideBarOpenCloseHandler = () => {
    contextData.settings.adminPanelSideBar ? contextData.dispatchSettings(settings => _objectSpread({}, settings, {
      adminPanelSideBar: false
    })) : contextData.dispatchSettings(settings => _objectSpread({}, settings, {
      adminPanelSideBar: true
    }));
  };

  const goToHomePage = () => {
    props.router.push('/');
    console.log(props.router);
  };

  const newAction = () => {
    props.router.push('/admin/post');
  };

  const adminActionHandler = () => {
    state.AdminActionMenu ? dispatchState(_objectSpread({}, state, {
      AdminActionMenu: false
    })) : dispatchState(_objectSpread({}, state, {
      AdminActionMenu: true
    }));
  };

  const newItemMenuHandler = () => {
    state.NewItemMenu ? dispatchState(_objectSpread({}, state, {
      NewItemMenu: false
    })) : dispatchState(_objectSpread({}, state, {
      NewItemMenu: true
    }));
  };

  return AdminTopBar_jsx(external_react_default.a.Fragment, null, AdminTopBar_jsx("div", {
    className: "adminTopBar"
  }, AdminTopBar_jsx("div", {
    className: "adminTopBarControl"
  }, AdminTopBar_jsx("button", {
    className: "adminSideBarMobileBtn adminTopBarItem",
    onClick: () => AdminSideBarOpenCloseHandler()
  }, AdminTopBar_jsx(external_react_fontawesome_default.a, {
    className: "fontawesomeMedium",
    name: "bars"
  })), AdminTopBar_jsx("button", {
    className: "adminGoToHomePageBtn adminTopBarItem",
    onClick: () => goToHomePage()
  }, AdminTopBar_jsx(external_react_fontawesome_default.a, {
    className: "fontawesomeMedium",
    name: "home"
  })), AdminTopBar_jsx("button", {
    className: "adminNewActionBtn adminTopBarItem",
    onClick: () => newItemMenuHandler()
  }, AdminTopBar_jsx(external_react_fontawesome_default.a, {
    className: "fontawesomeMedium",
    name: "plus"
  })), AdminTopBar_jsx(NewItemMenu_NewItemMenu, {
    active: state.NewItemMenu
  })), AdminTopBar_jsx("button", {
    className: "adminActionBtn adminTopBarItem",
    onClick: () => adminActionHandler()
  }, AdminTopBar_jsx(external_react_fontawesome_default.a, {
    className: "fontawesomeMedium",
    name: "user"
  })), AdminTopBar_jsx(AdminActionMenu_AdminActionMenu, {
    active: state.AdminActionMenu
  })));
};

/* harmony default export */ var TopBar_AdminTopBar = (with_router_default()(AdminTopBar));
// EXTERNAL MODULE: ./_variables/_variables.js
var _variables = __webpack_require__("U+0P");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");

// EXTERNAL MODULE: ./static/images/fontawesome/sort-up-solid.svg
var sort_up_solid = __webpack_require__("zGA0");
var sort_up_solid_default = /*#__PURE__*/__webpack_require__.n(sort_up_solid);

// EXTERNAL MODULE: ./static/images/fontawesome/sort-down-solid.svg
var sort_down_solid = __webpack_require__("o2Ts");
var sort_down_solid_default = /*#__PURE__*/__webpack_require__.n(sort_down_solid);

// CONCATENATED MODULE: ./components/adminIncludes/SideBar/SideBar.js
var SideBar_jsx = external_react_default.a.createElement;








const SideBar = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    Dashboard: {
      pathURL: '/admin',
      subItems: []
    },
    Posts: {
      pathURL: '/admin/posts',
      subItems: []
    },
    FileManager: {
      pathURL: '/admin/fileManager',
      subItems: []
    },
    Comments: {
      pathURL: '/admin/comments',
      subItems: []
    },
    Contacts: {
      pathURL: '/admin/contacts',
      subItems: []
    },
    Design: {
      pathURL: '/admin/design',
      subItems: ['topBar', 'header', 'navigation', 'widgets', 'postPage', 'footer', 'customStyle']
    },
    Users: {
      pathURL: '/admin/users',
      subItems: []
    },
    Tools: {
      pathURL: '/admin/tools',
      subItems: ['terminal']
    },
    Settings: {
      pathURL: '/admin/settings',
      subItems: ['customScript']
    }
  });
  const {
    0: hovered,
    1: setHovered
  } = Object(external_react_["useState"])(''); // const generateFakeData = ()=>{
  //     // const body = {
  //     //     type: "Video",
  //     //     size: 1000,
  //     //     pageNo: 1,
  //     //     fields: ["author", "title", "imageUrl", "status", "actors", "tags", "categories"],
  //     //     status: "All",
  //     //     author: "All",
  //     //     keyword: ""
  //     // };
  //     axios.post('http://localhost:4200/server/posts/admin-postsForTest').then(res => {
  //         const posts = res.data.posts;
  //         posts.forEach( async post=>{
  //             let data={
  //                 title :post.title.en,
  //                 categories : post.categories,
  //                 comments :post.comments,
  //                 actors :post.actors ,
  //                 tags :post.tags ,
  //                 author :'5e322f0f8b2a0637dc3b6a16',
  //                 description : post.description.en,
  //                 disLikes : 0,
  //                 mainThumbnail:post.imageUrl,
  //                 videoTrailerUrl :post.imagePreviewUrl,
  //                 videoEmbedCode:post.iframe,
  //                 likes : 0,
  //                 duration:post.duration,
  //                 quality : post.quality,
  //                 status : 'published',
  //                 postType : "video",
  //                 sourceSite : "Xhamster",
  //                 views : 0,
  //                 lastModify:Date.now()
  //             };
  //
  //             // let dataToSave = {
  //             //     title:post.title.en,
  //             //     author:'5e322f0f8b2a0637dc3b6a16',
  //             //     categories:post.categories,
  //             //     actors:post.actors,
  //             //     tags:post.tags,
  //             //     mainThumbnail:post.imageUrl,
  //             //     status:post.status,
  //             //     type:post.type
  //             // };
  //             await contextData.functions.savePosts(data)
  //             // console.log(post. )
  //         })
  //
  //     })
  // };

  const renderItems = Object.keys(state).map(item => {
    const onHoverHandler = state[item].subItems.map(subItem => {
      if (hovered === item) {
        return SideBar_jsx(link_default.a, {
          href: state[item].pathURL + '/' + subItem
        }, SideBar_jsx("a", {
          className: "SideBarItem-SubItem"
        }, Object(_variables["b" /* convertVariableNameToName */])(subItem)));
      } else return null;
    });

    const RenderArrowsForSubMenus = () => {
      if (state[item].subItems.length > 0) {
        return SideBar_jsx("button", {
          onClick: () => hovered === item ? setHovered('') : setHovered(item)
        }, SideBar_jsx("img", {
          className: "fontawesomeSvgVerySmall",
          src: hovered === item ? sort_up_solid_default.a : sort_down_solid_default.a,
          alt: ""
        }));
      } else return null;
    };

    return SideBar_jsx("div", {
      key: item,
      className: "SideBarItemElement"
    }, SideBar_jsx("div", {
      className: "SideBarItemTitle",
      onMouseOver: () => setHovered(item)
    }, SideBar_jsx(link_default.a, {
      href: state[item].pathURL
    }, SideBar_jsx("a", {
      className: "SideBarItem"
    }, Object(_variables["b" /* convertVariableNameToName */])(item))), SideBar_jsx(RenderArrowsForSubMenus, null)), SideBar_jsx("div", {
      className: "SideBarItemElementSubItems"
    }, onHoverHandler));
  });

  if (contextData.settings.adminPanelSideBar) {
    return SideBar_jsx("div", {
      className: "SideBar"
    }, renderItems);
  } else return null;
};

/* harmony default export */ var SideBar_SideBar = (SideBar);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: ./components/includes/Loading/Loading.js
var Loading = __webpack_require__("KOc1");

// EXTERNAL MODULE: ./components/includes/AlertBox/AlertBox.js
var AlertBox = __webpack_require__("UMKl");

// EXTERNAL MODULE: ./_variables/ajaxVariables.js
var ajaxVariables = __webpack_require__("bSV5");

// EXTERNAL MODULE: ./pages/_error.js
var _error = __webpack_require__("Y0NT");

// CONCATENATED MODULE: ./components/layouts/AdminLayout.js
var AdminLayout_jsx = external_react_default.a.createElement;

function AdminLayout_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function AdminLayout_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { AdminLayout_ownKeys(Object(source), true).forEach(function (key) { AdminLayout_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { AdminLayout_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AdminLayout_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // import '../../styles/styles.scss';
// import '../../styles/globalAdminPanel.scss';











const Panel = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const container = Object(external_react_["useRef"])(null);
  const Admin = Object(external_react_["useRef"])(null);
  const {
    0: state,
    1: dispatchState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {
    if (window.innerWidth > 768) {
      contextData.dispatchSettings(settings => AdminLayout_objectSpread({}, settings, {
        adminPanelSideBar: true
      }));
    }
  }, []);
  Object(external_react_["useEffect"])(() => {
    Object(ajaxVariables["g" /* getSetting */])('identity', false, window.location.origin, Date.now()).then(identity => {
      contextData.dispatchSiteIdentity(AdminLayout_objectSpread({}, contextData.siteIdentity, {}, identity.data.setting.data));
    });
    Object(ajaxVariables["g" /* getSetting */])('design', false, window.location.origin, Date.now()).then(design => {
      contextData.dispatchSiteDesign(AdminLayout_objectSpread({}, contextData.siteDesign, {}, design.data.setting.data));
    });
    Object(ajaxVariables["g" /* getSetting */])('navigation', false, window.location.origin, Date.now()).then(navigationData => {
      contextData.dispatchNavigationData([...navigationData.data.setting.data]); // if (res.data.setting) {
      //     setState({
      //         ...state,
      //         data: res.data.setting.data || []
      //     })
      // }
    });
  }, []);

  if (contextData.userData.role === 'administrator') {
    return AdminLayout_jsx(external_react_default.a.Fragment, null, AdminLayout_jsx(head_default.a, null, AdminLayout_jsx("title", null, "Admin Panel"), AdminLayout_jsx("meta", {
      name: "theme-color",
      content: "#000000"
    }), AdminLayout_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }), AdminLayout_jsx("meta", {
      charSet: "utf-8"
    }), AdminLayout_jsx("link", {
      href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
      rel: "stylesheet"
    }), AdminLayout_jsx("link", {
      rel: "icon",
      href: "/favicon.ico"
    })), AdminLayout_jsx(AlertBox["a" /* default */], null), AdminLayout_jsx("div", {
      ref: container,
      className: "container"
    }, AdminLayout_jsx(TopBar_AdminTopBar, null), AdminLayout_jsx(SideBar_SideBar, null), AdminLayout_jsx("div", {
      ref: Admin,
      className: "Admin"
    }, props.children), AdminLayout_jsx(Loading["a" /* default */], null)));
  } else return AdminLayout_jsx("h1", null, "Access Denied");
};

/* harmony default export */ var AdminLayout = __webpack_exports__["a"] = (Object(router_["withRouter"])(Panel));
{
  /*<Error { ...props } />*/
}

/***/ }),

/***/ "/0+H":
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

const react_1 = __importDefault(__webpack_require__("cDcd"));

const amp_context_1 = __webpack_require__("lwAK");

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

/***/ "/jkW":
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

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) { var name; }

  return WithRouterWrapper;
}

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("yu3Q");


/***/ }),

/***/ "1o3S":
/***/ (function(module, exports) {



/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

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

/***/ "3I4S":
/***/ (function(module, exports) {



/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "8Kt/":
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

const react_1 = __importDefault(__webpack_require__("cDcd"));

const side_effect_1 = __importDefault(__webpack_require__("Xuae"));

const amp_context_1 = __webpack_require__("lwAK");

const head_manager_context_1 = __webpack_require__("FYa8");

const amp_1 = __webpack_require__("/0+H");

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

/***/ "97dP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const ProgressBar = props => {
  let valueStyle = {
    width: props.value + '%'
  };
  const textValue = props.percent ? props.value + ' %' : '';

  if (props.value < 1) {
    return __jsx("div", {
      className: "progressParent"
    }, __jsx("div", {
      className: "progressChild",
      style: valueStyle
    }));
  } else return __jsx("div", {
    className: "progressParent"
  }, __jsx("div", {
    className: "progressChild",
    style: valueStyle
  }, " ", textValue));
};

/* harmony default export */ __webpack_exports__["a"] = (ProgressBar);

/***/ }),

/***/ "A8lN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppProviderWithRouter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tlnx");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("tMJi");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("DEwD");
/* harmony import */ var _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SQHE");
/* harmony import */ var _server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_server_tools_dataEncoder__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4Q3z");
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
    videoPreviewID: ''
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
          // dispatchUserData({ ...userData, ...res.data.userData });
          dispatchUserData(_objectSpread({}, userData, {}, _server_tools_dataDecoder__WEBPACK_IMPORTED_MODULE_4___default()(res.data).userData)); // console.log(dataDecoder(res.data) )
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
    setEditingPostData: (name, value) => {
      dispatchEditingPostData(editingPostData => _objectSpread({}, editingPostData, {
        [name]: value
      }));
    },
    bulkActionPost: (ids, status) => {
      dispatchState(_objectSpread({}, state, {
        loading: true
      }));
      const body = {
        ids,
        status,
        token: localStorage.wt
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/v1/posts/postsBulkAction', body).then(() => {
        props.router.push({
          pathname: props.router.pathname,
          query: _objectSpread({}, props.router.query)
        });
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

/***/ "C5Kc":
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),

/***/ "DEwD":
/***/ (function(module, exports, __webpack_require__) {

const jwtDecoder = __webpack_require__("tlnx");

const tokenExpireTime = '1000h';

const dataDecoder = token => {
  return jwtDecoder(token);
};

module.exports = dataDecoder;

/***/ }),

/***/ "DQph":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__("A8lN");

// EXTERNAL MODULE: ./node_modules/next/dist/client/with-router.js
var with_router = __webpack_require__("0Bsm");
var with_router_default = /*#__PURE__*/__webpack_require__.n(with_router);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./components/includes/ProgressBar/ProgressBar.js
var ProgressBar = __webpack_require__("97dP");

// EXTERNAL MODULE: external "react-fontawesome"
var external_react_fontawesome_ = __webpack_require__("C5Kc");
var external_react_fontawesome_default = /*#__PURE__*/__webpack_require__.n(external_react_fontawesome_);

// EXTERNAL MODULE: ./_variables/_variables.js
var _variables = __webpack_require__("U+0P");

// CONCATENATED MODULE: ./components/includes/VideoElement/VideoElement.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // import {Link} from "react-router-dom";

 // import {withRouter} from "react-router-dom";



 // import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const VideoElement = props => {
  let qualityLabel = Object(external_react_["useRef"])(null);
  let durationLabel = Object(external_react_["useRef"])(null);
  let viewLabel = Object(external_react_["useRef"])(null);
  let element = Object(external_react_["useRef"])(null);
  let videoElement = Object(external_react_["useRef"])(null);
  let path = '/post/' + props.state._id + '/' + props.state.title;
  let {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    isHover: false,
    isWatched: false,
    extraClassName: ''
  });
  Object(external_react_["useEffect"])(() => {
    if (props.viewType) {
      setState(_objectSpread({}, state, {
        extraClassName: props.viewType
      }));
    }
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
          onMouseOut: e => {
            isHoverHandler();
          }
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
          onMouseEnter: () => isHoverHandler()
        });
      }
    };

    return dataToRender();
  };

  const RenderDataOnImage = () => {
    if (!state.isHover) {
      return __jsx(external_react_default.a.Fragment, null, __jsx("span", {
        ref: qualityLabel,
        className: "quality"
      }, props.state.quality), __jsx("span", {
        ref: viewLabel,
        className: "views"
      }, __jsx(external_react_fontawesome_default.a, {
        className: "fontawesomeSmall",
        name: "eye"
      }), props.state.views), __jsx("span", {
        ref: durationLabel,
        className: "duration"
      }, props.state.duration));
    } else return null;
  };

  return __jsx("div", {
    ref: element,
    className: 'videoElementDiv ' + (props.viewType ? props.viewType : 'standard')
  }, __jsx(link_default.a, {
    as: `/${props.state.title}`,
    href: {
      pathname: '/post',
      query: {
        postTitle: props.state.title
      }
    }
  }, __jsx("a", null, __jsx("div", {
    className: "VideoElement",
    key: props.state.title
  }, __jsx("div", {
    className: "image"
  }, __jsx(ImageContent, null), __jsx(RenderDataOnImage, null)), __jsx(ProgressBar["a" /* default */], {
    value: Object(_variables["e" /* likeValueCalculator */])(props.state.likes, props.state.disLikes),
    percent: true
  }), __jsx("h3", null, props.state.title)))));
};

/* harmony default export */ var VideoElement_VideoElement = (with_router_default()(VideoElement));
// CONCATENATED MODULE: ./components/includes/Posts/Posts.js
var Posts_jsx = external_react_default.a.createElement;





const Posts = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: postsData,
    1: setPostsData
  } = Object(external_react_["useState"])({
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
    0: posts,
    1: setPosts
  } = Object(external_react_["useState"])([]);
  const renderPosts = (props.posts || []).map(post => {
    return Posts_jsx(VideoElement_VideoElement, {
      key: post._id,
      state: post,
      viewType: props.viewType
    });
  });
  return Posts_jsx("div", {
    className: "Videos"
  }, Posts_jsx("div", {
    className: 'videoContent ' + (props.viewType ? props.viewType + 'VideoContent' : 'standard')
  }, renderPosts));
};

/* harmony default export */ var Posts_Posts = __webpack_exports__["a"] = (with_router_default()(Posts));

/***/ }),

/***/ "DbpL":
/***/ (function(module, exports) {

module.exports = require("react-switch");

/***/ }),

/***/ "FYa8":
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

const React = __importStar(__webpack_require__("cDcd"));

exports.HeadManagerContext = React.createContext(null);

/***/ }),

/***/ "Je4V":
/***/ (function(module, exports) {



/***/ }),

/***/ "KOc1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("A8lN");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const Loading = () => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__[/* AppContext */ "a"]);

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

/* harmony default export */ __webpack_exports__["a"] = (Loading);

/***/ }),

/***/ "KYYh":
/***/ (function(module, exports) {

module.exports = require("react-delay-input");

/***/ }),

/***/ "MPUc":
/***/ (function(module, exports) {



/***/ }),

/***/ "OYZn":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJiYXJzIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtYmFycyBmYS13LTE0IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ0OCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE2IDEzMmg0MTZjOC44MzcgMCAxNi03LjE2MyAxNi0xNlY3NmMwLTguODM3LTcuMTYzLTE2LTE2LTE2SDE2QzcuMTYzIDYwIDAgNjcuMTYzIDAgNzZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnptMCAxNjBoNDE2YzguODM3IDAgMTYtNy4xNjMgMTYtMTZ2LTQwYzAtOC44MzctNy4xNjMtMTYtMTYtMTZIMTZjLTguODM3IDAtMTYgNy4xNjMtMTYgMTZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnptMCAxNjBoNDE2YzguODM3IDAgMTYtNy4xNjMgMTYtMTZ2LTQwYzAtOC44MzctNy4xNjMtMTYtMTYtMTZIMTZjLTguODM3IDAtMTYgNy4xNjMtMTYgMTZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnoiPjwvcGF0aD48L3N2Zz4="

/***/ }),

/***/ "SQHE":
/***/ (function(module, exports, __webpack_require__) {

const jwt = __webpack_require__("tMJi");

const tokenExpireTime = '1000h';

const dataEncoder = data => {
  return jwt.sign(data, "secretKey", {
    expiresIn: tokenExpireTime
  });
};

module.exports = dataEncoder;

/***/ }),

/***/ "T3fe":
/***/ (function(module, exports) {



/***/ }),

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "U+0P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return likeValueCalculator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getAbsolutePath; });
/* unused harmony export generateAbsolutePath */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clickPathGenerator; });
/* unused harmony export trimString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return convertVariableNameToName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fileTypeDetector; });
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
  return name.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + name.replace(/([A-Z])/g, " $1").slice(1);
};
const fileTypeDetector = fileName => {
  const splitFileName = fileName.split('.');
  const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase();
  let finalFormat = '';
  const fileFormats = {
    image: ['jpg', 'png', 'jpeg', 'svg'],
    video: ['mp4', '3gp'],
    document: ['js', 'css', 'env', 'scss'],
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

/***/ }),

/***/ "UMKl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("A8lN");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const AlertBox = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__[/* AppContext */ "a"]);
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

/* harmony default export */ __webpack_exports__["a"] = (AlertBox);

/***/ }),

/***/ "WP56":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return updatePost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return savePost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return newComment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateComment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return likeDislikeView; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const queryGeneratorForUnCacheRequest = requestItems => {
  let query = '?';

  for (const item in requestItems) {
    query += `${item}=${requestItems[item]}`;
  }

  return query;
};

const cacheQueryGenerator = cache => {
  return !cache ? Date.now() : '';
};

const getPosts = async (data, cache, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/posts${queryGeneratorForUnCacheRequest(data)}`, body, {
    headers: {
      'cache-control': 'no-cache'
    }
  }); // return await axios.post(domainName +`/api/v1/posts`, body)
};
const getPost = async (data, cache, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + '/api/v1/posts/post', body);
};
const updatePost = async (data, domainName) => {
  const body = {
    postData: data,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/posts/updatePost`, body);
};
const savePost = async (data, domainName) => {
  const body = {
    postData: data,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/posts/createNewPost`, body);
};
const getMeta = async (data, cache, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/posts/getMeta?pageNo=${data.pageNo}&type=${data.type}`, body);
};
const newComment = async data => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + `/api/v1/posts/newComment`, body);
};
const getComments = async (data, cache, domainName) => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/posts/getComments`, body);
};
const updateComment = async data => {
  const body = _objectSpread({}, data);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + `/api/v1/posts/updateComment`, body);
};
const likeDislikeView = async (id, type) => {
  const body = {
    id,
    type
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/posts/likeDislikeView', body);
};

/***/ }),

/***/ "XpSs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("A8lN");
/* harmony import */ var next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("8Kt/");
/* harmony import */ var next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_lib_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("hItm");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0Bsm");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const SiteSettingSetter = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__[/* AppContext */ "a"]);
  const customScriptElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    title: '',
    themeColor: '',
    description: '',
    keywords: [] // customScript: props.identity.data.customScript || 'your Script will be here',

  }); // useEffect(() => {
  //     console.log(props)
  //
  //
  // }, [ props ]);

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
        title: props.identity.data.title || '',
        themeColor: props.design.data.themeColor || '',
        description: props.identity.data.description || '',
        keywords: props.identity.data.keywords || []
      }));
    }

    if (props.widgets) {
      contextData.setSiteWidgets(props.widgets);
    }
  }, [props]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    document.body.style.backgroundColor = contextData.siteDesign.bodyBackgroundColor;
    document.body.style.color = contextData.siteDesign.bodyBackgroundColor;
  }, [contextData.siteDesign]);
  const renderCustomScripts = (props.identity.data.customScripts || []).map(script => {
    return __jsx("script", {
      key: script.scriptName
    }, script.scriptBody);
  }); // const RenderGoogleAnalyticsScript = () => {
  //     if (props.identity.data.googleAnalyticsID) {
  //         console.log( 'there is')
  //         return (
  //             <>
  //                                 <script dangerouslySetInnerHTML={ {
  //                                     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //                     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //                     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //                     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  //                   })(window,document,'script','dataLayer',${ props.identity.data.googleAnalyticsID });`
  //                 } }/>
  //             </>
  //
  //         )
  //     } else return null
  // }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    googleAnalyticsHandler();
  }, [props.router]);

  const googleAnalyticsHandler = () => {
    window.dataLayer = window.dataLayer || [];

    const gTag = () => {
      dataLayer.push(arguments);
    };

    gTag('js', new Date());
    gTag('config', contextData.siteIdentity.googleAnalyticsID);
  };

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
  }), __jsx("script", {
    async: true,
    src: `https://www.googletagmanager.com/gtag/js?id=${contextData.siteIdentity.googleAnalyticsID}`
  }), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico"
  }), __jsx("link", {
    href: "https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap",
    rel: "stylesheet"
  }), __jsx("link", {
    rel: "stylesheet",
    type: "text/css",
    href: "/static/style-sheet/customStyle.css"
  }), renderCustomScripts);
};

/* harmony default export */ __webpack_exports__["a"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_4___default()(SiteSettingSetter));

/***/ }),

/***/ "Xuae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __webpack_require__("cDcd");

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

/***/ "Y0NT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hItm");
/* harmony import */ var _components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XpSs");
/* harmony import */ var _components_includes_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wbII");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Error = props => {
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null, __jsx(_components_includes_SiteSettingsSetter_SiteSettingsSetter__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], props), __jsx("div", {
    className: "error-page"
  }, __jsx("h1", {
    className: "error-page-message"
  }, props.errorCode ? `error ${props.errorCode} occurred on server` : 'An error occurred on client')), __jsx(_components_includes_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
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

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
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

/***/ "bDCP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__("A8lN");

// CONCATENATED MODULE: ./components/includes/Widget/WidgetHeader/WidgetHeader.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const WidgetHeader = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    style: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        widgetHead: {
          backgroundColor: contextData.siteDesign.widgetHeaderBackgroundColor,
          color: contextData.siteDesign.widgetHeaderTextColor
        },
        redirectLink: {
          backgroundColor: contextData.siteDesign.widgetHeaderRedirectLinkBackgroundColor,
          color: contextData.siteDesign.widgetHeaderRedirectLinkTextColor
        }
      }
    }));
  }, [contextData.siteDesign]);

  const RenderTitle = () => {
    if (props.title) {
      return __jsx("p", {
        className: "WidgetHeaderTitle"
      }, props.title);
    } else return null;
  };

  const RenderRedirectLink = () => {
    if (props.redirectLink && props.redirectToTitle) {
      return __jsx(link_default.a, {
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

/* harmony default export */ var WidgetHeader_WidgetHeader = (WidgetHeader);
// CONCATENATED MODULE: ./components/includes/Widget/WidgetFooter/WidgetFooter.js
var WidgetFooter_jsx = external_react_default.a.createElement;



const WidgetFooter = props => {
  if (props.redirectTo && props.redirectToTitle) {
    return WidgetFooter_jsx("div", {
      className: "WidgetFooter"
    }, WidgetFooter_jsx(link_default.a, {
      href: props.redirectTo
    }, WidgetFooter_jsx("a", null, props.redirectToTitle)));
  } else return null;
};

/* harmony default export */ var WidgetFooter_WidgetFooter = (WidgetFooter);
// CONCATENATED MODULE: ./components/includes/Widget/WidgetsModelsComponents/Text/Text.js
var Text_jsx = external_react_default.a.createElement;


const Text = props => {
  const spanElement = Object(external_react_["useRef"])(null);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    textAlign: props.textAlign || 'center',
    style: {
      textAlign: props.textAlign || 'center'
    }
  });
  Object(external_react_["useEffect"])(() => {
    if (spanElement) {
      spanElement.current.innerHTML = props.text;
    }
  }, []);
  return Text_jsx("span", {
    className: "widgetText",
    ref: spanElement,
    style: state.style
  }, props.text);
};

/* harmony default export */ var Text_Text = (Text);
// CONCATENATED MODULE: ./components/includes/Widget/WidgetText/WidgetText.js
var WidgetText_jsx = external_react_default.a.createElement;



const WidgetText = props => {
  if (props.text) {
    return WidgetText_jsx(Text_Text, {
      text: props.text,
      textAlign: props.textAlign
    });
  } else return null;
};

/* harmony default export */ var WidgetText_WidgetText = (WidgetText);
// CONCATENATED MODULE: ./components/includes/Widget/WidgetPagination/WidgetPagination.js
var WidgetPagination_jsx = external_react_default.a.createElement;


const WidgetPagination = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {
    console.log(props);
  }, []);

  if (props.pagination) {
    return WidgetPagination_jsx("div", {
      className: "widget-pagination"
    }, "1");
  } else return null;
};

/* harmony default export */ var WidgetPagination_WidgetPagination = (WidgetPagination);
// CONCATENATED MODULE: ./components/includes/Widget/Widget.js
var Widget_jsx = external_react_default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Widget_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Widget_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Widget_ownKeys(Object(source), true).forEach(function (key) { Widget_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Widget_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Widget_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Widget = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    style: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(Widget_objectSpread({}, state, {
      style: {
        backgroundColor: contextData.siteDesign.widgetBodyBackgroundColor,
        color: contextData.siteDesign.widgetBodyTextColor,
        border: contextData.siteDesign.widgetBodyBorder
      }
    }));
  }, [contextData.siteDesign]);

  const RenderComponent = () => {
    if (props.component) {
      return Widget_jsx(props.component, _extends({}, props, {
        widget: true
      }));
    } else return null;
  };

  return Widget_jsx("div", {
    className: "Widget",
    style: state.style
  }, Widget_jsx(WidgetHeader_WidgetHeader, props), Widget_jsx(WidgetText_WidgetText, props), Widget_jsx(RenderComponent, null), Widget_jsx(WidgetFooter_WidgetFooter, props));
};

/* harmony default export */ var Widget_Widget = (Widget);
// EXTERNAL MODULE: ./components/includes/Posts/Posts.js + 1 modules
var Posts = __webpack_require__("DQph");

// CONCATENATED MODULE: ./components/includes/RecentComments/RecentComments.js
var RecentComments_jsx = external_react_default.a.createElement;


const RecentComments = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {}, []);
  const renderComments = props.data.map(comment => {
    return RecentComments_jsx("div", {
      key: props.data.indexOf(comment),
      className: "recent-comments-item"
    }, RecentComments_jsx("strong", null, comment.author), RecentComments_jsx("p", null, comment.body));
  });
  return RecentComments_jsx("div", {
    className: "recent-comments"
  }, renderComments);
};

/* harmony default export */ var RecentComments_RecentComments = (RecentComments);
// EXTERNAL MODULE: ./components/includes/MetaWidget/MetaWidget.scss
var MetaWidget = __webpack_require__("fvR1");

// CONCATENATED MODULE: ./components/includes/MetaWidget/MetaWidget.js
var MetaWidget_jsx = external_react_default.a.createElement;




const MetaWidget_MetaWidget = props => {
  const renderMeta = (props.data || []).map(meta => {
    return MetaWidget_jsx(link_default.a, {
      key: meta.name,
      href: `posts?${meta.type}=${meta.name}`
    }, MetaWidget_jsx("a", {
      className: "meta-widget-item"
    }, meta.name));
  });
  return MetaWidget_jsx("div", {
    className: "meta-widget"
  }, renderMeta);
};

/* harmony default export */ var includes_MetaWidget_MetaWidget = (MetaWidget_MetaWidget);
// EXTERNAL MODULE: ./components/includes/SearchInputComponent/SearchInputComponent.scss
var SearchInputComponent = __webpack_require__("yvAJ");

// EXTERNAL MODULE: ./node_modules/next/dist/client/with-router.js
var with_router = __webpack_require__("0Bsm");
var with_router_default = /*#__PURE__*/__webpack_require__.n(with_router);

// CONCATENATED MODULE: ./components/includes/SearchInputComponent/SearchInputComponent.js
var SearchInputComponent_jsx = external_react_default.a.createElement;

function SearchInputComponent_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function SearchInputComponent_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { SearchInputComponent_ownKeys(Object(source), true).forEach(function (key) { SearchInputComponent_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { SearchInputComponent_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SearchInputComponent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const SearchInputComponent_SearchInputComponent = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    pathURL: '',
    keyword: '',
    queries: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(SearchInputComponent_objectSpread({}, state, {
      pathURL: props.pathURL || '/posts'
    }));
  }, []);

  const onChangeHandler = e => {
    setState(SearchInputComponent_objectSpread({}, state, {
      keyword: e.target.value
    }));
  };

  return SearchInputComponent_jsx("div", {
    className: "search-bar"
  }, SearchInputComponent_jsx("input", {
    className: "search-input",
    name: "keyword",
    onChange: e => onChangeHandler(e)
  }), SearchInputComponent_jsx(link_default.a, {
    href: {
      pathname: state.pathURL,
      query: SearchInputComponent_objectSpread({}, state.queries, {
        keyword: state.keyword
      })
    }
  }, SearchInputComponent_jsx("a", {
    className: "search-bar-btn"
  }, "Search")));
};

/* harmony default export */ var includes_SearchInputComponent_SearchInputComponent = (with_router_default()(SearchInputComponent_SearchInputComponent));
// CONCATENATED MODULE: ./components/includes/Logo/Logo.js
var Logo_jsx = external_react_default.a.createElement;

function Logo_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Logo_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Logo_ownKeys(Object(source), true).forEach(function (key) { Logo_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Logo_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Logo_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const Logo = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    logoText: 'Logo',
    headLine: 'Head Line',
    logoTextStyle: {},
    headLineStyle: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(Logo_objectSpread({}, state, {
      logoText: contextData.siteIdentity.logoText,
      headLine: contextData.siteIdentity.headLine,
      logoTextStyle: {
        color: contextData.siteDesign.textLogoColor,
        fontSize: contextData.siteDesign.textLogoSize
      },
      headLineStyle: {
        color: contextData.siteDesign.headLineColor,
        fontSize: contextData.siteDesign.headLineSize
      }
    }));
  }, [contextData.siteIdentity]);

  const RenderLogo = () => {
    if (props.LogoUrl) {
      return Logo_jsx("img", {
        src: props.LogoUrl
      });
    } else return null;
  };

  return Logo_jsx(link_default.a, {
    href: props.redirectLink
  }, Logo_jsx("a", {
    className: "Logo"
  }, Logo_jsx(RenderLogo, null), Logo_jsx("span", {
    style: state.logoTextStyle,
    className: "logoText"
  }, props.LogoText), Logo_jsx("p", {
    style: state.headLineStyle,
    className: "headLine"
  }, props.headLine)));
};

/* harmony default export */ var Logo_Logo = (Logo);
// CONCATENATED MODULE: ./components/includes/WidgetsRenderer/WidgetsRenderer.js
var WidgetsRenderer_jsx = external_react_default.a.createElement;








const WidgetsRenderer = props => {
  // useEffect(() => {
  //     console.log(props)
  // }, [ props ]);
  const renderWidgets = props.widgets.filter(widget => widget.position === props.position).map(widget => {
    switch (widget.type) {
      case 'posts':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: widget._id,
          propsKey: widget._id,
          viewType: widget.viewType,
          text: widget.text,
          textAlign: widget.textAlign,
          component: Posts["a" /* default */],
          posts: widget.posts,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle,
          pagination: widget.pagination
        });
        break;

      case 'text':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle
        });
        break;

      case 'recentComments':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          component: RecentComments_RecentComments,
          data: widget.comments,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle
        });
        break;

      case 'meta':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          component: includes_MetaWidget_MetaWidget,
          data: widget.metaData,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle
        });
        break;

      case 'searchBar':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          text: widget.text,
          component: includes_SearchInputComponent_SearchInputComponent,
          pathURL: widget.pathURL,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle
        });
        break;

      case 'logo':
        return WidgetsRenderer_jsx(Widget_Widget, {
          key: props.widgets.indexOf(widget),
          propsKey: widget._id,
          LogoText: widget.LogoText,
          viewType: widget.viewType,
          headLine: widget.headLine,
          LogoUrl: widget.LogoUrl,
          component: Logo_Logo,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle
        });
        break;

      default:
        return null;
    }
  });
  return WidgetsRenderer_jsx(external_react_default.a.Fragment, null, renderWidgets);
};

/* harmony default export */ var WidgetsRenderer_WidgetsRenderer = __webpack_exports__["a"] = (WidgetsRenderer);

/***/ }),

/***/ "bSV5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return updateSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return saveCustomStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addNewWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getMultipleWidgetWithData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getMultipleSetting; });
/* unused harmony export getWidgetsWithData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return updateWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deleteWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return executor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fileUpload; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
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
const getSetting = async (type, cache, domainName, whichPage) => {
  const body = {
    type
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/get?type=${type}&position=${whichPage}`, body);
};
const addNewWidget = async data => {
  const body = {
    data,
    token: localStorage.wt
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/addWidget', body);
};
const getWidgets = async (position, cache, domainName) => {
  const body = {
    position
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + '/api/v1/settings/getWidget', body);
};
const getMultipleWidgetWithData = async (widgets, cache, domainName, whichPage) => {
  const body = _objectSpread({}, widgets);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getMultipleWidgetWithData?whichPage=${whichPage}`, body);
};
const getMultipleSetting = async (settings, cache, domainName, whichPage) => {
  // const isCache = cache ? '' : `?cache=${ Date.now() }`
  const body = _objectSpread({}, settings);

  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getMultiple?whichPage=${whichPage}`, body);
};
const getWidgetsWithData = async (position, domainName) => {
  const body = {
    position
  };
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(domainName + `/api/v1/settings/getWidgetsWithData`, body);
};
const updateWidgets = async (id, data) => {
  const body = {
    id,
    data,
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
const fileUpload = async (image, type) => {
  //    token: localStorage.wt
  return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.location.origin + '/api/v1/settings/fileManagerControllers-uploadFile', image);
};

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cDf5":
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

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

var _interopRequireWildcard = __webpack_require__("284h");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _url = __webpack_require__("bzos");

var _utils = __webpack_require__("g/15");

var _router = _interopRequireDefault(__webpack_require__("nOHt"));

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

    if (false) {}

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
      if (false) {}
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

if (false) { var exact, PropTypes, warn; }

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
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

/***/ "elyg":
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

const url_1 = __webpack_require__("bzos");

const mitt_1 = __importDefault(__webpack_require__("dZ6Y"));

const utils_1 = __webpack_require__("g/15");

const is_dynamic_1 = __webpack_require__("/jkW");

const route_matcher_1 = __webpack_require__("gguc");

const route_regex_1 = __webpack_require__("YTqd");

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

      if (false) {}

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  true && this.sdc[pathname] ? Promise.resolve(this.sdc[pathname]) : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
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
        if (false) {}

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
            if (false) {}

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

        if (false) {}

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
    if (false) {}

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

      if (false) {}

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
        if (false) {}

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (false) {}

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

/***/ "fvR1":
/***/ (function(module, exports) {



/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");
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

  if (false) {} // when called from _app `ctx` is nested in `ctx`


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

  if (false) {}

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (false) {}

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "gguc":
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

/***/ "hItm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__("A8lN");

// EXTERNAL MODULE: ./components/includes/WidgetsRenderer/WidgetsRenderer.js + 10 modules
var WidgetsRenderer = __webpack_require__("bDCP");

// CONCATENATED MODULE: ./components/includes/Header/Header.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const Header = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    style: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(_objectSpread({}, state, {
      style: {
        backgroundColor: contextData.siteDesign.headerBackgroundColor,
        color: contextData.siteDesign.headerTextColor
      }
    }));
  }, [contextData.siteDesign]);
  return __jsx("div", {
    className: "Header",
    style: state.style
  }, __jsx(WidgetsRenderer["a" /* default */], {
    widgets: contextData.siteWidgets,
    position: "header"
  }));
};

/* harmony default export */ var Header_Header = (Header);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./components/includes/TopBar/TopBar.js
var TopBar_jsx = external_react_default.a.createElement;

function TopBar_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function TopBar_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { TopBar_ownKeys(Object(source), true).forEach(function (key) { TopBar_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { TopBar_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TopBar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const TopBar = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    style: {}
  });
  Object(external_react_["useEffect"])(() => {
    setState(TopBar_objectSpread({}, state, {
      style: {
        backgroundColor: contextData.siteDesign.topBarBackgroundColor,
        color: contextData.siteDesign.topBarTextColor
      }
    }));
  }, [contextData.siteDesign]);

  if (contextData.userData.username) {
    if (contextData.userData.role === 'administrator') {
      return TopBar_jsx("div", {
        className: "TopBar",
        style: state.style
      }, TopBar_jsx("button", {
        style: state.style,
        onClick: () => contextData.functions.logOutUser()
      }, "Log Out"), TopBar_jsx("button", {
        style: state.style,
        onClick: () => contextData.functions.goToAdminPanel()
      }, "Admin Panel"));
    } else {
      return TopBar_jsx("div", {
        className: "TopBar",
        style: state.style
      }, TopBar_jsx("button", {
        style: state.style,
        onClick: () => contextData.functions.logOutUser()
      }, "Log Out"));
    }
  } else {
    return TopBar_jsx("div", {
      className: "TopBar",
      style: state.style
    }, TopBar_jsx(link_default.a, {
      href: "/auth/login"
    }, TopBar_jsx("a", null, "Login")), TopBar_jsx("span", null, "Or"), TopBar_jsx(link_default.a, {
      href: "/auth/register"
    }, TopBar_jsx("a", null, "Register")));
  }
};

/* harmony default export */ var TopBar_TopBar = (Object(router_["withRouter"])(TopBar));
// EXTERNAL MODULE: external "react-fontawesome"
var external_react_fontawesome_ = __webpack_require__("C5Kc");

// EXTERNAL MODULE: ./static/images/fontawesome/bars-solid.svg
var bars_solid = __webpack_require__("OYZn");
var bars_solid_default = /*#__PURE__*/__webpack_require__.n(bars_solid);

// CONCATENATED MODULE: ./components/includes/Header/Navigation/Navigation.js
var Navigation_jsx = external_react_default.a.createElement;

function Navigation_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Navigation_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Navigation_ownKeys(Object(source), true).forEach(function (key) { Navigation_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Navigation_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Navigation_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 // import  BarsIcon from '../../../../styles/icons/bars-solid.svg'

const Navigation = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const navigation = Object(external_react_["useRef"])(null);
  const navigationMobileBtn = Object(external_react_["useRef"])(null);
  const {
    0: navigationData,
    1: setNavigationData
  } = Object(external_react_["useState"])({
    isOpen: false,
    items: [],
    style: {}
  });
  Object(external_react_["useEffect"])(() => {
    setNavigationData(Navigation_objectSpread({}, navigationData, {
      style: {
        backgroundColor: contextData.siteDesign.navigationBackgroundColor,
        color: contextData.siteDesign.navigationTextColor
      }
    }));
  }, [contextData.siteDesign]);
  Object(external_react_["useEffect"])(() => {
    if (window.innerWidth < 768) {
      setNavigationData(Navigation_objectSpread({}, navigationData, {
        isOpen: false
      }));
    } else {
      setNavigationData(Navigation_objectSpread({}, navigationData, {
        isOpen: true
      }));
    }
  }, []);
  Object(external_react_["useEffect"])(() => {
    if (navigation.current) {
      if (navigationData.isOpen) {
        navigation.current.style.display = 'flex';
        navigationMobileBtn.current.style.transform = 'rotate(-90deg)';
      } else {
        navigation.current.style.display = 'none';
        navigationMobileBtn.current.style.transform = 'rotate(0deg)';
      }
    }
  }, [navigationData.isOpen]);
  Object(external_react_["useEffect"])(() => {
    setNavigationData(navigationData => Navigation_objectSpread({}, navigationData, {
      items: contextData.navigationData || []
    }));
  }, [contextData.navigationData]);

  const onNavigationMobileBtnClickHandler = () => {
    navigationData.isOpen ? setNavigationData(Navigation_objectSpread({}, navigationData, {
      isOpen: false
    })) : setNavigationData(Navigation_objectSpread({}, navigationData, {
      isOpen: true
    }));
  };

  const renderNavigationItems = contextData.navigationData.map(item => {
    return Navigation_jsx(link_default.a, {
      key: item.title,
      href: item.url
    }, Navigation_jsx("a", {
      style: navigationData.style
    }, item.title));
  });
  return Navigation_jsx(external_react_default.a.Fragment, null, Navigation_jsx("button", {
    ref: navigationMobileBtn,
    className: "navigationMobileBtn",
    onClick: () => onNavigationMobileBtnClickHandler()
  }, "   ", Navigation_jsx("img", {
    className: "fontawesomeSvgMedium",
    src: bars_solid_default.a,
    alt: ""
  })), Navigation_jsx("div", {
    ref: navigation,
    className: "Navigation",
    style: navigationData.style
  }, renderNavigationItems));
};

/* harmony default export */ var Navigation_Navigation = (Navigation);
// EXTERNAL MODULE: ./components/includes/Loading/Loading.js
var Loading = __webpack_require__("KOc1");

// EXTERNAL MODULE: ./components/includes/AlertBox/AlertBox.js
var AlertBox = __webpack_require__("UMKl");

// CONCATENATED MODULE: ./components/layouts/AppLayout.js
var AppLayout_jsx = external_react_default.a.createElement;






 // import Router from "next/router";
// import withGA from "next-ga";

const AppLayout = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  Object(external_react_["useEffect"])(() => {
    console.log(contextData.userData);
  }, [contextData.userData]);
  return AppLayout_jsx(external_react_default.a.Fragment, null, AppLayout_jsx(TopBar_TopBar, null), AppLayout_jsx(Header_Header, null), AppLayout_jsx(Navigation_Navigation, null), AppLayout_jsx(Loading["a" /* default */], null), AppLayout_jsx(AlertBox["a" /* default */], null), AppLayout_jsx("div", {
    className: "App"
  }, props.children));
};

/* harmony default export */ var layouts_AppLayout = __webpack_exports__["a"] = (AppLayout);

/***/ }),

/***/ "hxlC":
/***/ (function(module, exports) {



/***/ }),

/***/ "lwAK":
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

const React = __importStar(__webpack_require__("cDcd"));

exports.AmpStateContext = React.createContext({});

/***/ }),

/***/ "mYZM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("bSV5");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const UploadFileBtn = props => {
  const uploadInputElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null); // const labelOutputElement = useRef(null)

  const onUploadHandler = e => {
    const filesData = new FormData();
    filesData.append('uploadingFile', e.target.files[0]);
    Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_1__[/* fileUpload */ "d"])(filesData, 'test').then(res => {
      // labelOutputElement.current.value =res.data.path
      props.setFunction(props.name, res.data.path.replace('./', '/')); // if (props.returnElement){
      //     props.returnElement.current.value = res.data.path.replace('./','/')
      //     // props.returnElement.current.next()
      // }

      console.log(res.data);
    }).catch(err => {
      console.log(err);
      props.returnElemen.current.value = 'Something went Wrong';
    });
  };

  return __jsx("div", {
    className: "upload-file-btn"
  }, __jsx("input", {
    ref: uploadInputElement,
    type: "file",
    style: {
      display: 'none'
    },
    onChange: e => onUploadHandler(e)
  }), __jsx("button", {
    onClick: () => uploadInputElement.current.click()
  }, "Upload"));
};

/* harmony default export */ __webpack_exports__["a"] = (UploadFileBtn);

/***/ }),

/***/ "mnmB":
/***/ (function(module, exports) {



/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("qOIg");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

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

/***/ "o2Ts":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LWRvd24iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1zb3J0LWRvd24gZmEtdy0xMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MSAyODhoMjM4YzIxLjQgMCAzMi4xIDI1LjkgMTcgNDFMMTc3IDQ0OGMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMMjQgMzI5Yy0xNS4xLTE1LjEtNC40LTQxIDE3LTQxeiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),

/***/ "qOIg":
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

const React = __importStar(__webpack_require__("cDcd"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "tMJi":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "tlnx":
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "wbII":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3I4S");
/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Footer_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("A8lN");
/* harmony import */ var _WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("bDCP");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const Footer = props => {
  const contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__[/* AppContext */ "a"]);
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
  }, __jsx(_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], props));
};

/* harmony default export */ __webpack_exports__["a"] = (Footer);

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "yu3Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./_variables/ajaxPostsVariables.js
var ajaxPostsVariables = __webpack_require__("WP56");

// EXTERNAL MODULE: ./_variables/_variables.js
var _variables = __webpack_require__("U+0P");

// EXTERNAL MODULE: ./components/layouts/AdminLayout.js + 4 modules
var AdminLayout = __webpack_require__("+wRh");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/TitleDescription/TitleDescription.js
var __jsx = external_react_default.a.createElement;


const TitleDescription = props => {
  return __jsx("div", {
    className: "TitleDescription"
  }, __jsx("input", {
    name: "title",
    value: props.postData.title,
    className: "TitleDescriptionTitle",
    placeholder: "Enter The Title Here",
    onChange: e => {
      props.onChangeHandler(e);
    }
  }), __jsx("textarea", {
    name: "description",
    value: props.postData.description,
    className: "TitleDescriptionDescription",
    onChange: e => {
      props.onChangeHandler(e);
    }
  }));
};

/* harmony default export */ var TitleDescription_TitleDescription = (TitleDescription);
// EXTERNAL MODULE: external "react-fontawesome"
var external_react_fontawesome_ = __webpack_require__("C5Kc");
var external_react_fontawesome_default = /*#__PURE__*/__webpack_require__.n(external_react_fontawesome_);

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget.js
var DropDownWidget_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const DropDownWidget = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    open: true,
    icon: 'sort-up'
  });
  Object(external_react_["useEffect"])(() => {
    state.open ? setState(_objectSpread({}, state, {
      icon: 'sort-up'
    })) : setState(_objectSpread({}, state, {
      icon: 'sort-down'
    }));
  }, [state.open]);

  const openCloseHandler = () => {
    state.open ? setState(_objectSpread({}, state, {
      open: false
    })) : setState(_objectSpread({}, state, {
      open: true
    }));
  };

  const RenderTheComponent = () => {
    if (state.open) {
      return DropDownWidget_jsx(props.component, props);
    } else return null;
  };

  return DropDownWidget_jsx("div", {
    className: "DropDownWidget"
  }, DropDownWidget_jsx("div", {
    className: "DropDownWidgetHead"
  }, DropDownWidget_jsx("p", {
    className: "DropDownWidgetHeadTitle"
  }, props.title), DropDownWidget_jsx("button", {
    className: "DropDownWidgetHeadOpenCloseBtn",
    onClick: () => openCloseHandler()
  }, DropDownWidget_jsx(external_react_fontawesome_default.a, {
    className: "fontawesomeMedium",
    name: state.icon
  }))), DropDownWidget_jsx("div", {
    className: "DropDownWidgetComponent"
  }, DropDownWidget_jsx(RenderTheComponent, null)));
};

/* harmony default export */ var DropDownWidget_DropDownWidget = (DropDownWidget);
// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__("A8lN");

// EXTERNAL MODULE: ./node_modules/next/dist/client/with-router.js
var with_router = __webpack_require__("0Bsm");
var with_router_default = /*#__PURE__*/__webpack_require__.n(with_router);

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost.js
var ActionOnPost_jsx = external_react_default.a.createElement;

function ActionOnPost_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ActionOnPost_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ActionOnPost_ownKeys(Object(source), true).forEach(function (key) { ActionOnPost_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ActionOnPost_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ActionOnPost_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const ActionOnPost = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);

  const onSaveHandler = () => {
    contextData.dispatchState(ActionOnPost_objectSpread({}, contextData.state, {
      loading: true
    }));

    if (props.postData._id) {
      // contextData.functions.updatePost(contextData.editingPostData)
      Object(ajaxPostsVariables["i" /* updatePost */])(props.postData, window.location.origin).then(() => {
        contextData.dispatchState(ActionOnPost_objectSpread({}, contextData.state, {
          loading: false
        }));
      }).catch(err => {
        console.log(err);
        contextData.dispatchState(ActionOnPost_objectSpread({}, contextData.state, {
          loading: false
        }));
      });
    } else {
      Object(ajaxPostsVariables["g" /* savePost */])(props.postData, window.location.origin).then(res => {
        props.router.push('/admin/post?id=' + res.data.savedPostData._id);
        contextData.dispatchState(ActionOnPost_objectSpread({}, contextData.state, {
          loading: false
        }));
      }).catch(err => {
        contextData.dispatchAlert(ActionOnPost_objectSpread({}, contextData.alert, {
          active: true,
          alertMessage: err.response.data.error,
          type: 'error'
        }));
        contextData.dispatchState(ActionOnPost_objectSpread({}, contextData.state, {
          loading: false
        }));
      });
    }
  };

  const onViewHandler = () => {
    window.open('/' + props.postData.title, '_blank');
  };

  return ActionOnPost_jsx("div", {
    className: "ActionOnPost"
  }, ActionOnPost_jsx("div", {
    className: "ActionOnPostItem"
  }, ActionOnPost_jsx("button", {
    className: "previewBtn",
    onClick: () => onViewHandler()
  }, "View")), ActionOnPost_jsx("div", {
    className: "ActionOnPostItem"
  }, ActionOnPost_jsx("select", {
    name: "status",
    value: props.postData.status,
    onChange: e => props.onChangeHandler(e)
  }, ActionOnPost_jsx("option", {
    value: "published"
  }, "Published"), ActionOnPost_jsx("option", {
    value: "draft"
  }, "Draft"), ActionOnPost_jsx("option", {
    value: "trash"
  }, "Trash"))), ActionOnPost_jsx("div", {
    className: "ActionOnPostItem"
  }, ActionOnPost_jsx("button", {
    className: "SaveBtn",
    onClick: () => onSaveHandler()
  }, "Save")));
};

ActionOnPost.getInitialProps = async ({
  query
}) => {
  return {
    query
  };
};

/* harmony default export */ var ActionOnPost_ActionOnPost = (with_router_default()(ActionOnPost));
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/Format/Format.js
var Format_jsx = external_react_default.a.createElement;


const Format = props => {
  return Format_jsx("div", {
    className: "Format"
  }, Format_jsx("select", {
    name: "postType",
    value: props.postData.postType,
    onChange: e => props.onChangeHandler(e)
  }, Format_jsx("option", {
    value: "standard"
  }, "Standard"), Format_jsx("option", {
    value: "video"
  }, "Video")));
};

Format.getInitialProps = ({
  req
}) => {
  return {};
};

/* harmony default export */ var Format_Format = (Format);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors.js
var PostCategoriesTagsActors_jsx = external_react_default.a.createElement;




const PostCategoriesTagsActors = props => {
  let newItemsElement = Object(external_react_["useRef"])(null);

  const deleteItem = e => {
    const deletedItemFromType = props.postData[props.type].filter(i => {
      return i !== e.currentTarget.name;
    });
    props.onPostMetaChangeHandler(props.type, deletedItemFromType);
  };

  const addNewItem = () => {
    if (newItemsElement.current.value.includes(',')) {
      let newItems = newItemsElement.current.value.split(',');
      const addedItemFromType = [...props.postData[props.type], ...newItems.map(item => item.trim())];
      props.onPostMetaChangeHandler(props.type, addedItemFromType);
    } else {
      const addedItemFromType = [...props.postData[props.type], newItemsElement.current.value.trim()];
      props.onPostMetaChangeHandler(props.type, addedItemFromType);
    }
  };

  const addedItems = props.postData[props.type].map(item => {
    let icon = props.type === 'tags' ? 'tags' : props.type === 'actors' ? 'star' : props.type === 'categories' ? 'folder' : '';
    return PostCategoriesTagsActors_jsx("div", {
      key: item,
      className: "item"
    }, PostCategoriesTagsActors_jsx("p", null, item), PostCategoriesTagsActors_jsx("button", {
      name: item,
      onClick: e => deleteItem(e)
    }, PostCategoriesTagsActors_jsx(external_react_fontawesome_default.a, {
      className: "fontawesomeMedium",
      name: "times"
    })));
  });
  return PostCategoriesTagsActors_jsx("div", {
    className: "PostCategoriesTagsActors"
  }, PostCategoriesTagsActors_jsx("div", {
    className: "addNewTag"
  }, PostCategoriesTagsActors_jsx("input", {
    ref: newItemsElement,
    type: "text"
  }), PostCategoriesTagsActors_jsx("button", {
    className: "addBtn",
    onClick: () => addNewItem()
  }, " Add")), PostCategoriesTagsActors_jsx("span", {
    className: "small-info"
  }, "Separate tags with commas"), PostCategoriesTagsActors_jsx("div", {
    className: "items"
  }, addedItems));
};

/* harmony default export */ var PostCategoriesTagsActors_PostCategoriesTagsActors = (PostCategoriesTagsActors);
// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.scss
var IsInSlideShow = __webpack_require__("mnmB");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/IsInSlideShow/IsInSlideShow.js
var IsInSlideShow_jsx = external_react_default.a.createElement;



const IsInSlideShow_IsInSlideShow = props => {
  return IsInSlideShow_jsx("div", {
    className: "IsInSlideShow VideoInformationSection"
  }, IsInSlideShow_jsx("div", {
    className: "title"
  }, IsInSlideShow_jsx("p", null, "Slide Show")), IsInSlideShow_jsx("div", {
    className: "editor "
  }, IsInSlideShow_jsx("select", {
    name: "inSlideShow",
    onChange: e => props.onChangeHandler(e),
    defaultValue: props.postData.inSlideShow
  }, IsInSlideShow_jsx("option", {
    value: "true"
  }, "Yes"), IsInSlideShow_jsx("option", {
    value: "false"
  }, "No"))));
};

/* harmony default export */ var VideoInformation_IsInSlideShow_IsInSlideShow = (IsInSlideShow_IsInSlideShow);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/Quality/Quality.js
var Quality_jsx = external_react_default.a.createElement;


const Quality = props => {
  return Quality_jsx("div", {
    className: "Quality VideoInformationSection"
  }, Quality_jsx("div", {
    className: "title"
  }, Quality_jsx("p", null, "Quality")), Quality_jsx("div", {
    className: "editor"
  }, Quality_jsx("div", {
    className: "option"
  }, Quality_jsx("select", {
    defaultValue: props.postData.quality,
    name: "quality",
    onChange: e => props.onChangeHandler(e)
  }, Quality_jsx("option", {
    value: "240p"
  }, "240p"), Quality_jsx("option", {
    value: "360p"
  }, "360p"), Quality_jsx("option", {
    value: "480p"
  }, "480p"), Quality_jsx("option", {
    value: "720p"
  }, "720p"), Quality_jsx("option", {
    value: "1080p"
  }, "1080p"), Quality_jsx("option", {
    value: "1440p"
  }, "1440p"), Quality_jsx("option", {
    value: "2160p"
  }, "2160p"), Quality_jsx("option", {
    value: "4120p"
  }, "4120p")))));
};

/* harmony default export */ var Quality_Quality = (Quality);
// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.scss
var VideoInformation = __webpack_require__("1o3S");

// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.scss
var VideoUrls = __webpack_require__("MPUc");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoUrls/VideoUrls.js
var VideoUrls_jsx = external_react_default.a.createElement;



const VideoUrls_VideoUrls = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {}, []);
  return VideoUrls_jsx("div", {
    className: "VideoUrls VideoInformationSection"
  }, VideoUrls_jsx("div", {
    className: "title"
  }, VideoUrls_jsx("p", null, "Video URL")), VideoUrls_jsx("div", {
    className: "editor"
  }, VideoUrls_jsx("input", {
    className: "textInput"
  })));
};

/* harmony default export */ var VideoInformation_VideoUrls_VideoUrls = (VideoUrls_VideoUrls);
// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.scss
var VideoEmbedCode = __webpack_require__("T3fe");

// EXTERNAL MODULE: external "react-delay-input"
var external_react_delay_input_ = __webpack_require__("KYYh");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoEmbedCode/VideoEmbedCode.js
var VideoEmbedCode_jsx = external_react_default.a.createElement;




const VideoEmbedCode_VideoEmbedCode = props => {
  return VideoEmbedCode_jsx("div", {
    className: "VideoEmbedCode VideoInformationSection"
  }, VideoEmbedCode_jsx("div", {
    className: "title"
  }, VideoEmbedCode_jsx("p", null, "Video Embed Code")), VideoEmbedCode_jsx("div", {
    className: "editor"
  }, VideoEmbedCode_jsx(external_react_delay_input_["DelayInput"], {
    element: "textarea",
    className: "textareaInput",
    name: "videoEmbedCode",
    value: props.postData.videoEmbedCode,
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ var VideoInformation_VideoEmbedCode_VideoEmbedCode = (VideoEmbedCode_VideoEmbedCode);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/Duration/Duration.js
var Duration_jsx = external_react_default.a.createElement;



const Duration = props => {
  return Duration_jsx("div", {
    className: "Duration VideoInformationSection"
  }, Duration_jsx("div", {
    className: "title"
  }, Duration_jsx("p", null, "Duration")), Duration_jsx("div", {
    className: "editor"
  }, Duration_jsx(external_react_delay_input_["DelayInput"], {
    name: "duration",
    value: props.postData.duration,
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ var Duration_Duration = (Duration);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/ViewsLikesDisLikes/ViewsLikesDisLikes.js
var ViewsLikesDisLikes_jsx = external_react_default.a.createElement;




const ViewsLikesDisLikes = props => {
  const inputElement = Object(external_react_["useRef"])(null);
  Object(external_react_["useEffect"])(() => {
    if (inputElement.current) {
      inputElement.current.value = props.postData[props.name];
    }
  }, [props.postData[props.name]]);
  return ViewsLikesDisLikes_jsx("div", {
    className: "ViewsLikesDisLikes VideoInformationSection"
  }, ViewsLikesDisLikes_jsx("div", {
    className: "title"
  }, ViewsLikesDisLikes_jsx("p", null, Object(_variables["b" /* convertVariableNameToName */])(props.name))), ViewsLikesDisLikes_jsx("div", {
    className: "editor"
  }, ViewsLikesDisLikes_jsx(external_react_delay_input_["DelayInput"], {
    inputRef: inputElement,
    type: "number",
    className: "numberInput",
    name: props.name,
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ var ViewsLikesDisLikes_ViewsLikesDisLikes = (ViewsLikesDisLikes);
// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/TextInputWithUploadBtn/TextInputWithUploadBtn.scss
var TextInputWithUploadBtn = __webpack_require__("hxlC");

// EXTERNAL MODULE: ./components/adminIncludes/UploadFileBtn/uploadFileBtn.js
var uploadFileBtn = __webpack_require__("mYZM");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/TextInputWithUploadBtn/TextInputWithUploadBtn.js
var TextInputWithUploadBtn_jsx = external_react_default.a.createElement;






const TextInputWithUploadBtn_TextInputWithUploadBtn = props => {
  const inputElement = Object(external_react_["useRef"])(null);

  const onSetHandler = (key, value) => {
    const e = {
      target: {
        name: key,
        value: value
      }
    };
    props.onChangeHandler(e);
  };

  return TextInputWithUploadBtn_jsx("div", {
    className: "TextInputWithUploadBtn VideoInformationSection"
  }, TextInputWithUploadBtn_jsx("div", {
    className: "title"
  }, TextInputWithUploadBtn_jsx("p", null, Object(_variables["b" /* convertVariableNameToName */])(props.name))), TextInputWithUploadBtn_jsx("div", {
    className: "editor"
  }, TextInputWithUploadBtn_jsx(external_react_delay_input_["DelayInput"], {
    inputRef: inputElement,
    className: "textInputWithUpload",
    name: props.name,
    value: props.postData[props.name],
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  }), TextInputWithUploadBtn_jsx(uploadFileBtn["a" /* default */], {
    setFunction: onSetHandler,
    name: props.name
  })));
};

/* harmony default export */ var PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn = (TextInputWithUploadBtn_TextInputWithUploadBtn);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/TextInput/TextInput.js
var TextInput_jsx = external_react_default.a.createElement;




const TextInput = props => {
  return TextInput_jsx("div", {
    className: "TextInput VideoInformationSection"
  }, TextInput_jsx("div", {
    className: "title"
  }, TextInput_jsx("p", null, Object(_variables["b" /* convertVariableNameToName */])(props.name))), TextInput_jsx("div", {
    className: "editor"
  }, TextInput_jsx(external_react_delay_input_["DelayInput"], {
    className: "TextInput",
    name: props.name,
    value: props.postData[props.name],
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ var TextInput_TextInput = (TextInput);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/RenderIframe/RenderIframe.js
var RenderIframe_jsx = external_react_default.a.createElement;

function RenderIframe_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function RenderIframe_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { RenderIframe_ownKeys(Object(source), true).forEach(function (key) { RenderIframe_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { RenderIframe_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function RenderIframe_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const RenderIframe = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    open: false
  });

  if (!state.open && props.postData.videoEmbedCode) {
    return RenderIframe_jsx("button", {
      onClick: () => state.open ? setState(RenderIframe_objectSpread({}, state, {
        open: false
      })) : setState(RenderIframe_objectSpread({}, state, {
        open: true
      }))
    }, "Preview Embed Video");
  } else if (state.open && props.postData.videoEmbedCode) {
    return RenderIframe_jsx("div", {
      className: "VideoEmbedCode VideoInformationSection"
    }, RenderIframe_jsx("div", {
      className: "title"
    }, RenderIframe_jsx("p", null, "Video Iframe Preview"), RenderIframe_jsx("button", {
      onClick: () => state.open ? setState(RenderIframe_objectSpread({}, state, {
        open: false
      })) : setState(RenderIframe_objectSpread({}, state, {
        open: true
      }))
    }, "Hide Embed Video")), RenderIframe_jsx("div", {
      className: "editor"
    }, RenderIframe_jsx("iframe", {
      src: props.postData.videoEmbedCode
    })));
  } else return null;
};

/* harmony default export */ var RenderIframe_RenderIframe = (RenderIframe);
// EXTERNAL MODULE: external "react-switch"
var external_react_switch_ = __webpack_require__("DbpL");
var external_react_switch_default = /*#__PURE__*/__webpack_require__.n(external_react_switch_);

// EXTERNAL MODULE: ./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.scss
var ImagePreview = __webpack_require__("Je4V");

// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/ImagePreview/ImagePreview.js
var ImagePreview_jsx = external_react_default.a.createElement;

function ImagePreview_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ImagePreview_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ImagePreview_ownKeys(Object(source), true).forEach(function (key) { ImagePreview_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ImagePreview_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ImagePreview_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const ImagePreview_ImagePreview = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    open: false
  });

  if (props.postData.mainThumbnail) {
    if (state.open) {
      return ImagePreview_jsx("div", {
        className: "ImagePreview VideoInformationSection"
      }, ImagePreview_jsx("p", null, "Image Preview"), ImagePreview_jsx(external_react_switch_default.a, {
        onChange: () => state.open ? setState(ImagePreview_objectSpread({}, state, {
          open: false
        })) : setState(ImagePreview_objectSpread({}, state, {
          open: true
        })),
        checked: state.open
      }), ImagePreview_jsx("div", {
        className: "title"
      }), ImagePreview_jsx("div", {
        className: "editor"
      }, ImagePreview_jsx("img", {
        src: props.postData.mainThumbnail
      })));
    } else return ImagePreview_jsx(external_react_default.a.Fragment, null, ImagePreview_jsx("p", null, "Image Preview"), ImagePreview_jsx(external_react_switch_default.a, {
      onChange: () => state.open ? setState(ImagePreview_objectSpread({}, state, {
        open: false
      })) : setState(ImagePreview_objectSpread({}, state, {
        open: true
      })),
      checked: state.open
    }));
  } else return null;
};

/* harmony default export */ var PostComponents_ImagePreview_ImagePreview = (ImagePreview_ImagePreview);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/TextAreaComponent/TextAreaComponent.js
var TextAreaComponent_jsx = external_react_default.a.createElement;




const TextAreaComponent = props => {
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({});
  Object(external_react_["useEffect"])(() => {}, []);
  return TextAreaComponent_jsx("div", {
    className: "text-area-component VideoInformationSection"
  }, TextAreaComponent_jsx("div", {
    className: "title"
  }, TextAreaComponent_jsx("p", null, Object(_variables["b" /* convertVariableNameToName */])(props.name))), TextAreaComponent_jsx("div", {
    className: "editor"
  }, TextAreaComponent_jsx(external_react_delay_input_["DelayInput"], {
    element: "textarea",
    className: "textareaInput",
    name: props.name,
    value: props.postData[props.name],
    delayTimeout: 1000,
    onChange: e => props.onChangeHandler(e)
  })));
};

/* harmony default export */ var TextAreaComponent_TextAreaComponent = (TextAreaComponent);
// CONCATENATED MODULE: ./components/adminIncludes/PostComponents/VideoInformation/VideoInformation.js
var VideoInformation_jsx = external_react_default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function VideoInformation_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function VideoInformation_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { VideoInformation_ownKeys(Object(source), true).forEach(function (key) { VideoInformation_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { VideoInformation_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function VideoInformation_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















const VideoInformation_VideoInformation = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    inSlideShow: false
  });

  const onSaveChanges = () => {
    contextData.dispatchEditingPostData(VideoInformation_objectSpread({}, contextData.editingPostData, {}, state));
  };

  const onDurationChangeHandler = value => {
    setState(VideoInformation_objectSpread({}, state, {
      duration: value
    }));
  };

  const onIsInSlideShowChangeHandler = e => {
    setState(VideoInformation_objectSpread({}, state, {
      inSlideShow: e
    }));
  };

  if (props.postData.postType === 'video') {
    return VideoInformation_jsx("div", {
      className: "VideoInformation"
    }, VideoInformation_jsx(VideoInformation_IsInSlideShow_IsInSlideShow, _extends({}, props, {
      onIsInSlideShowChangeHandler: onIsInSlideShowChangeHandler,
      isChecked: state.inSlideShow
    })), VideoInformation_jsx(Quality_Quality, props), VideoInformation_jsx(PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn, _extends({}, props, {
      name: "videoUrl",
      title: "Video Url"
    })), VideoInformation_jsx(TextInput_TextInput, _extends({}, props, {
      name: "videoEmbedCode"
    })), VideoInformation_jsx(TextAreaComponent_TextAreaComponent, _extends({}, props, {
      name: "videoScriptCode"
    })), VideoInformation_jsx(RenderIframe_RenderIframe, props), VideoInformation_jsx(Duration_Duration, _extends({}, props, {
      onDurationChangeHandler: onDurationChangeHandler
    })), VideoInformation_jsx(ViewsLikesDisLikes_ViewsLikesDisLikes, _extends({}, props, {
      name: 'views',
      value: state.views || 0
    })), VideoInformation_jsx(ViewsLikesDisLikes_ViewsLikesDisLikes, _extends({}, props, {
      name: 'likes',
      value: state.likes || 0
    })), VideoInformation_jsx(ViewsLikesDisLikes_ViewsLikesDisLikes, _extends({}, props, {
      name: 'disLikes',
      value: state.disLikes || 0
    })), VideoInformation_jsx(PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn, _extends({}, props, {
      name: "VideoTrailerUrl",
      title: "Video Trailer Url"
    })), VideoInformation_jsx(TextInput_TextInput, _extends({}, props, {
      name: "downloadLink",
      title: "Download Link"
    })));
  } else {
    return VideoInformation_jsx("h3", null, "This Post Type Does not Support this Feature ");
  }
};

/* harmony default export */ var PostComponents_VideoInformation_VideoInformation = (VideoInformation_VideoInformation);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./server/tools/dataDecoder.js
var dataDecoder = __webpack_require__("DEwD");
var dataDecoder_default = /*#__PURE__*/__webpack_require__.n(dataDecoder);

// CONCATENATED MODULE: ./pages/admin/post/index.js
var post_jsx = external_react_default.a.createElement;

function post_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function post_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { post_ownKeys(Object(source), true).forEach(function (key) { post_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { post_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function post_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


















const Index = props => {
  const contextData = Object(external_react_["useContext"])(AppContext["a" /* AppContext */]);
  const {
    0: state,
    1: setState
  } = Object(external_react_["useState"])({
    tags: [],
    categories: [],
    actors: [],
    inSlideShow: false
  });

  const onChangeHandler = e => {
    setState(post_objectSpread({}, state, {
      [e.target.name]: e.target.value
    }));
  };

  const onPostMetaChangeHandler = (type, data) => {
    setState(post_objectSpread({}, state, {
      [type]: data
    }));
  };

  Object(external_react_["useEffect"])(() => {
    if (props.router.query.new && state._id) {
      props.router.reload();
    } else {
      setState(props.post);
    }
  }, [props]);
  Object(external_react_["useEffect"])(() => {
    console.log(props.router);
  }, [props]);
  return post_jsx(external_react_default.a.Fragment, null, post_jsx(AdminLayout["a" /* default */], null, post_jsx(link_default.a, {
    href: "/admin/post?new=1"
  }, post_jsx("a", {
    className: "newPostLinkAdminPanel"
  }, "New Post")), post_jsx("div", {
    className: "Post"
  }, post_jsx("div", {
    className: "content"
  }, post_jsx(TitleDescription_TitleDescription, {
    postData: state,
    onChangeHandler: onChangeHandler
  }), post_jsx(PostComponents_TextInputWithUploadBtn_TextInputWithUploadBtn, {
    postData: state,
    onChangeHandler: onChangeHandler,
    name: "mainThumbnail",
    title: "Main thumbnail"
  }), post_jsx(PostComponents_ImagePreview_ImagePreview, {
    postData: state
  }), post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    component: PostComponents_VideoInformation_VideoInformation,
    title: "Video Information",
    onChangeHandler: onChangeHandler
  })), post_jsx("div", {
    className: "side"
  }, post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    component: ActionOnPost_ActionOnPost,
    title: state.status,
    onChangeHandler: onChangeHandler
  }), post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    component: Format_Format,
    title: "Format",
    onChangeHandler: onChangeHandler
  }), post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    isNewPost: props.query.new === 'true',
    component: PostCategoriesTagsActors_PostCategoriesTagsActors,
    type: "categories",
    title: "Post Category",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  }), post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    isNewPost: props.query.new === 'true',
    component: PostCategoriesTagsActors_PostCategoriesTagsActors,
    type: "tags",
    title: "Post Tags",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  }), post_jsx(DropDownWidget_DropDownWidget, {
    postData: state,
    isNewPost: props.query.new === 'true',
    component: PostCategoriesTagsActors_PostCategoriesTagsActors,
    type: "actors",
    title: "Post Actors",
    onChangeHandler: onChangeHandler,
    onPostMetaChangeHandler: onPostMetaChangeHandler
  })))));
};

Index.getInitialProps = async ({
  query,
  req
}) => {
  const domainName = req ? await Object(_variables["d" /* getAbsolutePath */])(req) : '';
  let post;
  let postData;
  let requestBody;
  const newPostData = {
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

  if (query.new) {
    post = newPostData;
  } else if (query.postTitle || query.id) {
    requestBody = {
      postTitle: query.postTitle,
      _id: query.id
    };
    postData = await Object(ajaxPostsVariables["c" /* getPost */])(requestBody, true, domainName);
    post = postData.data ? dataDecoder_default()(postData.data.post).post : newPostData;
  }

  return {
    post,
    query
  };
};

/* harmony default export */ var admin_post = __webpack_exports__["default"] = (with_router_default()(Index));

/***/ }),

/***/ "yvAJ":
/***/ (function(module, exports) {



/***/ }),

/***/ "zGA0":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LXVwIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtc29ydC11cCBmYS13LTEwIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyMCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTI3OSAyMjRINDFjLTIxLjQgMC0zMi4xLTI1LjktMTctNDFMMTQzIDY0YzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDExOSAxMTljMTUuMiAxNS4xIDQuNSA0MS0xNi45IDQxeiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });