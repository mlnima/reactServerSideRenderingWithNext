webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Posts/Posts.js":
/*!********************************************!*\
  !*** ./components/includes/Posts/Posts.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _VideoElement_VideoElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VideoElement/VideoElement */ "./components/includes/VideoElement/VideoElement.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var Posts = function Posts(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
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
      postsData = _useState[0],
      setPostsData = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      posts = _useState2[0],
      setPosts = _useState2[1];

  var renderPosts = props.posts.map(function (post) {
    return __jsx(_VideoElement_VideoElement__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: post._id,
      state: post
    });
  });
  return __jsx("div", {
    className: "Videos"
  }, __jsx("div", {
    className: "videoContent"
  }, renderPosts));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(Posts));

/***/ }),

/***/ "./components/includes/Sidebar/Sidebar.js":
/*!************************************************!*\
  !*** ./components/includes/Sidebar/Sidebar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WidgetsRenderer/WidgetsRenderer */ "./components/includes/WidgetsRenderer/WidgetsRenderer.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Sidebar = function Sidebar(props) {
  if (props.isActive) {
    return __jsx("aside", {
      id: "site-sidebar"
    }, __jsx(_WidgetsRenderer_WidgetsRenderer__WEBPACK_IMPORTED_MODULE_1__["default"], props));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (Sidebar);

/***/ }),

/***/ "./components/includes/VideoElement/VideoElement.js":
/*!**********************************************************!*\
  !*** ./components/includes/VideoElement/VideoElement.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ProgressBar/ProgressBar */ "./components/includes/ProgressBar/ProgressBar.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_12__);







var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }



 // import {Link} from "react-router-dom";

 // import {withRouter} from "react-router-dom";


 // import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

var VideoElement = function VideoElement(props) {
  var qualityLabel = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])(null);
  var durationLabel = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])(null);
  var viewLabel = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])(null);
  var element = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])(null);
  var videoElement = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])(null);
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_7__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_10__["AppContext"]);
  var path = '/post/' + props.state._id + '/' + props.state.title;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])({
    isHover: false,
    isWatched: false
  }),
      state = _useState[0],
      setState = _useState[1]; // useEffect(()=>{
  //     console.log( props.state)
  // },[ ]);


  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    hoverCleaner();
  }, [state.isHover]);
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    if (contextData.state.videoPreviewID !== props.state._id) {
      setState(_objectSpread({}, state, {
        isHover: false
      }));
    }
  }, [contextData.state.videoPreviewID]);

  var isHoverHandler = function isHoverHandler() {
    if (props.state.videoTrailerUrl) {
      contextData.dispatchState(_objectSpread({}, contextData.state, {
        videoPreviewID: props.state._id
      }));
      state.isHover ? setState(_objectSpread({}, state, {
        isHover: false
      })) : setState(_objectSpread({}, state, {
        isHover: true
      }));
    }
  };

  var hoverCleaner = function hoverCleaner() {
    if (props.state.videoTrailerUrl) {
      if (state.isHover) {
        qualityLabel.current.style.visibility = 'hidden';
        durationLabel.current.style.visibility = 'hidden';
        viewLabel.current.style.visibility = 'hidden';
      } else {
        qualityLabel.current.style.visibility = 'visible';
        durationLabel.current.style.visibility = 'visible';
        viewLabel.current.style.visibility = 'visible';
      }
    }
  };

  var imageContent = function imageContent() {
    var dataToRender = function dataToRender() {
      if (state.isHover && props.state._id === contextData.state.videoPreviewID && props.state.videoTrailerUrl) {
        return __jsx("video", {
          ref: videoElement,
          src: props.state.videoTrailerUrl,
          autoPlay: true,
          loop: true,
          onMouseOut: function onMouseOut(e) {
            isHoverHandler();
          }
        });
      } else if (!state.isHover) {
        return __jsx("img", {
          src: props.state.mainThumbnail,
          alt: props.state.title,
          onError: function onError(err) {
            // deletedVideoAutoRemover(props.state)
            console.log(props.state);
          },
          onMouseEnter: function onMouseEnter() {
            return isHoverHandler();
          }
        });
      }
    };

    return dataToRender();
  };

  var VideoPreviewMobileBtnLogo = function VideoPreviewMobileBtnLogo() {
    var element = __jsx("i", {
      className: "fas fa-fast-forward"
    });

    if (state.isHover) {
      element = __jsx("i", {
        className: "fas fa-stop"
      });
    } else {
      element = __jsx("i", {
        className: "fas fa-fast-forward"
      });
    }

    return element;
  };

  var MobilePreviewBtn = function MobilePreviewBtn() {
    if (props.state.videoTrailerUrl) {
      return __jsx("button", {
        className: "videoPreviewMobile",
        onClick: function onClick() {
          contextData.dispatchState(_objectSpread({}, contextData.state, {
            videoPreviewID: props.state._id
          }));
          state.isHover ? setState(_objectSpread({}, state, {
            isHover: false
          })) : setState(_objectSpread({}, state, {
            isHover: true
          }));
        }
      }, "   ", __jsx(VideoPreviewMobileBtnLogo, null), "  ");
    } else return null;
  };

  return __jsx("div", {
    ref: element,
    className: "videoElementDiv"
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
    as: "/".concat(props.state.title),
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
  }, __jsx("span", {
    ref: qualityLabel,
    className: "quality"
  }, props.state.quality), imageContent(), __jsx("span", {
    ref: viewLabel,
    className: "views"
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_12___default.a, {
    className: "fontawesomeSmall",
    name: "eye"
  }), props.state.views), __jsx("span", {
    ref: durationLabel,
    className: "duration"
  }, props.state.duration)), __jsx(_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_11__["default"], {
    value: contextData.functions.likeValueCalculator(props.state.likes, props.state.disLikes),
    percent: true
  }), __jsx("h3", null, props.state.title)))));
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default()(VideoElement));

/***/ }),

/***/ "./components/includes/Widget/Widget.js":
/*!**********************************************!*\
  !*** ./components/includes/Widget/Widget.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WidgetHeader_WidgetHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WidgetHeader/WidgetHeader */ "./components/includes/Widget/WidgetHeader/WidgetHeader.js");
/* harmony import */ var _WidgetFooter_WidgetFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WidgetFooter/WidgetFooter */ "./components/includes/Widget/WidgetFooter/WidgetFooter.js");
/* harmony import */ var _WidgetText_WidgetText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WidgetText/WidgetText */ "./components/includes/Widget/WidgetText/WidgetText.js");
/* harmony import */ var _WidgetPagination_WidgetPagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WidgetPagination/WidgetPagination */ "./components/includes/Widget/WidgetPagination/WidgetPagination.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var Widget = function Widget(props) {
  var RenderComponent = function RenderComponent() {
    if (props.component) {
      return __jsx(props.component, props);
    } else return null;
  };

  return __jsx("div", {
    className: "Widget"
  }, __jsx(_WidgetHeader_WidgetHeader__WEBPACK_IMPORTED_MODULE_1__["default"], props), __jsx(_WidgetText_WidgetText__WEBPACK_IMPORTED_MODULE_3__["default"], props), __jsx(RenderComponent, null), __jsx(_WidgetFooter_WidgetFooter__WEBPACK_IMPORTED_MODULE_2__["default"], props));
};

/* harmony default export */ __webpack_exports__["default"] = (Widget);

/***/ }),

/***/ "./components/includes/Widget/WidgetFooter/WidgetFooter.js":
/*!*****************************************************************!*\
  !*** ./components/includes/Widget/WidgetFooter/WidgetFooter.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var WidgetFooter = function WidgetFooter(props) {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var WidgetHeader = function WidgetHeader(props) {
  var RenderTitle = function RenderTitle() {
    if (props.title) {
      return __jsx("p", {
        className: "WidgetHeaderTitle"
      }, props.title);
    } else return null;
  };

  var RenderRedirectLink = function RenderRedirectLink() {
    if (props.redirectLink && props.redirectToTitle) {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: props.redirectLink
      }, __jsx("a", null, props.redirectToTitle));
    } else return null;
  };

  if (props.title) {
    return __jsx("div", {
      className: "WidgetHeader"
    }, __jsx(RenderTitle, null), __jsx(RenderRedirectLink, null));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetHeader);

/***/ }),

/***/ "./components/includes/Widget/WidgetPagination/WidgetPagination.js":
/*!*************************************************************************!*\
  !*** ./components/includes/Widget/WidgetPagination/WidgetPagination.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var WidgetPagination = function WidgetPagination(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, []);

  if (props.pagination) {
    return __jsx("div", {
      className: "widget-pagination"
    }, "1");
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetPagination);

/***/ }),

/***/ "./components/includes/Widget/WidgetText/WidgetText.js":
/*!*************************************************************!*\
  !*** ./components/includes/Widget/WidgetText/WidgetText.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WidgetsModelsComponents_Text_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WidgetsModelsComponents/Text/Text */ "./components/includes/Widget/WidgetsModelsComponents/Text/Text.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var WidgetText = function WidgetText(props) {
  if (props.text) {
    return __jsx(_WidgetsModelsComponents_Text_Text__WEBPACK_IMPORTED_MODULE_1__["default"], {
      text: props.text,
      textAlign: props.textAlign
    });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var Text = function Text(props) {
  var spanElement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    textAlign: props.textAlign || 'center',
    style: {
      textAlign: props.textAlign || 'center'
    }
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (spanElement) {
      spanElement.current.innerHTML = props.text;
    }
  }, []);
  return __jsx("span", {
    className: "widgetText",
    ref: spanElement,
    style: state.style
  }, props.text);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Widget_Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Widget/Widget */ "./components/includes/Widget/Widget.js");
/* harmony import */ var _Posts_Posts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Posts/Posts */ "./components/includes/Posts/Posts.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var WidgetsRenderer = function WidgetsRenderer(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props);
  }, [props]);
  var renderWidgets = props.widgets.filter(function (widget) {
    return widget.position === props.position;
  }).map(function (widget) {
    switch (widget.type) {
      case 'posts':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: widget._id,
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          component: _Posts_Posts__WEBPACK_IMPORTED_MODULE_2__["default"],
          posts: widget.posts,
          title: widget.title,
          redirectLink: widget.redirectLink,
          redirectToTitle: widget.redirectToTitle,
          pagination: widget.pagination
        });
        break;

      case 'text':
        return __jsx(_Widget_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: widget._id,
          propsKey: widget._id,
          text: widget.text,
          textAlign: widget.textAlign,
          title: widget.title,
          mainLinkUrl: "/posts/",
          redirectToTitle: "More videos"
        });
        break;

      default:
        return null;
    }
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, renderWidgets);
};

/* harmony default export */ __webpack_exports__["default"] = (WidgetsRenderer);

/***/ }),

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
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_variables_ajaxVariables__WEBPACK_IMPORTED_MODULE_11__["getWidgetsWithData"])('all'));

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
          return _context.abrupt("return", {
            post: post,
            query: query,
            navigation: navigation,
            identity: identity,
            widgets: widgets
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_8___default()(Post));

/***/ })

})
//# sourceMappingURL=post.js.f7c97a006f1457db57ef.hot-update.js.map