webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./components/includes/Post/PostInfo/PostInfo.js":
/*!*******************************************************!*\
  !*** ./components/includes/Post/PostInfo/PostInfo.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TagsAndCategoriesActors/TagsAndCategoriesActors */ "./components/includes/Post/TagsAndCategoriesActors/TagsAndCategoriesActors.js");
/* harmony import */ var _ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ProgressBar/ProgressBar */ "./components/includes/ProgressBar/ProgressBar.js");
/* harmony import */ var _variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_variables/_variables */ "./_variables/_variables.js");
/* harmony import */ var _variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_variables/ajaxPostsVariables */ "./_variables/ajaxPostsVariables.js");
/* harmony import */ var _DownloadLink_DownloadLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DownloadLink/DownloadLink */ "./components/includes/Post/DownloadLink/DownloadLink.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-fontawesome */ "./node_modules/react-fontawesome/lib/index.js");
/* harmony import */ var react_fontawesome__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_fontawesome__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_images_fontawesome_thumbs_up_solid_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../static/images/fontawesome/thumbs-up-solid.svg */ "./static/images/fontawesome/thumbs-up-solid.svg");
/* harmony import */ var _static_images_fontawesome_thumbs_up_solid_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_static_images_fontawesome_thumbs_up_solid_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _static_images_fontawesome_thumbs_down_solid_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../static/images/fontawesome/thumbs-down-solid.svg */ "./static/images/fontawesome/thumbs-down-solid.svg");
/* harmony import */ var _static_images_fontawesome_thumbs_down_solid_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_static_images_fontawesome_thumbs_down_solid_svg__WEBPACK_IMPORTED_MODULE_8__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








 // import * as socialShare from "react-share"

var PostInfo = function PostInfo(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    likeValue: 0,
    postAbsolutePath: ''
  }),
      state = _useState[0],
      setState = _useState[1]; // useEffect(() => {
  //     setState({
  //         ...state,
  //         likeValue: likeValueCalculator(props.likes, props.disLikes),
  //         postAbsolutePath: window.location.href
  //     });
  //     likeDislikeView(props.id, 'views')
  // }, []);


  return __jsx("div", {
    className: "post-info"
  }, __jsx("div", {
    className: "post-info-head"
  }, __jsx("h1", null, props.title), __jsx("div", {
    className: "like"
  }, __jsx("button", {
    onClick: function onClick() {
      Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__["likeDislikeView"])(props.id, 'likes');
    }
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_6___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-up"
  })), __jsx("button", {
    onClick: function onClick() {
      Object(_variables_ajaxPostsVariables__WEBPACK_IMPORTED_MODULE_4__["likeDislikeView"])(props.id, 'disLikes');
    }
  }, __jsx(react_fontawesome__WEBPACK_IMPORTED_MODULE_6___default.a, {
    className: "fontawesomeMedium",
    name: "thumbs-down"
  })))), __jsx("div", {
    className: "post-info-body"
  }, __jsx("div", {
    className: "views"
  }, __jsx(_DownloadLink_DownloadLink__WEBPACK_IMPORTED_MODULE_5__["default"], {
    downloadLink: props.videoEmbedCode
  }), __jsx("span", null, props.views, " views"), __jsx(_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: state.likeValue,
    percent: false
  }), __jsx("div", {
    className: "post-rate"
  }, __jsx("div", null, state.likeValue, " %"), __jsx("div", {
    className: "like-disLike-count"
  }, __jsx("span", {
    className: "like-disLike-count-items"
  }, __jsx("img", {
    className: "fontawesomeSvgSmall",
    src: _static_images_fontawesome_thumbs_up_solid_svg__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: ""
  }), props.likes), __jsx("span", {
    className: "like-disLike-count-items"
  }, __jsx("img", {
    className: "fontawesomeSvgSmall",
    src: _static_images_fontawesome_thumbs_down_solid_svg__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: ""
  }), props.disLikes)))), __jsx("div", {
    className: "meta-description"
  }, __jsx("div", {
    className: "description"
  }, props.description), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "actors",
    data: props.actors || []
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "actors",
    data: props.actors || []
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "tags",
    data: props.tags || []
  }), __jsx(_TagsAndCategoriesActors_TagsAndCategoriesActors__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "categories",
    data: props.categories || []
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (PostInfo); // {/*<div className="share">*/}
// {/*    <socialShare.FacebookShareButton*/}
// {/*        url={state.postAbsolutePath}*/}
// {/*        quote={props.title}*/}
// {/*        hashtag={'#'+props.title}*/}
// {/*    >*/}
// {/*        <socialShare.FacebookIcon size={40}  />*/}
// {/*    </socialShare.FacebookShareButton>*/}
// {/*    <socialShare.TwitterShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TwitterIcon size={40}  />*/}
// {/*    </socialShare.TwitterShareButton>*/}
// {/*    <socialShare.TelegramShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TelegramIcon size={40}  />*/}
// {/*    </socialShare.TelegramShareButton>*/}
// {/*    <socialShare.RedditShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.RedditIcon size={40}  />*/}
// {/*    </socialShare.RedditShareButton>*/}
// {/*    <socialShare.VKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.VKIcon size={40}  />*/}
// {/*    </socialShare.VKShareButton>*/}
// {/*    <socialShare.ViberShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.ViberIcon size={40}   />*/}
// {/*    </socialShare.ViberShareButton>*/}
// {/*    <socialShare.WhatsappShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.WhatsappIcon size={40}  />*/}
// {/*    </socialShare.WhatsappShareButton>*/}
// {/*    <socialShare.LinkedinShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LinkedinIcon size={40}  />*/}
// {/*    </socialShare.LinkedinShareButton>*/}
// {/*    <socialShare.TumblrShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TumblrIcon size={40}  />*/}
// {/*    </socialShare.TumblrShareButton>*/}
// {/*    <socialShare.EmailShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.EmailIcon size={40}  />*/}
// {/*    </socialShare.EmailShareButton>*/}
// {/*    <socialShare.InstapaperShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.InstapaperIcon size={40}  />*/}
// {/*    </socialShare.InstapaperShareButton>*/}
// {/*    <socialShare.LineShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LineIcon size={40}  />*/}
// {/*    </socialShare.LineShareButton>*/}
// {/*    <socialShare.LivejournalShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LivejournalIcon size={40}  />*/}
// {/*    </socialShare.LivejournalShareButton>*/}
// {/*    <socialShare.MailruShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.MailruIcon size={40}  />*/}
// {/*    </socialShare.MailruShareButton>*/}
// {/*    <socialShare.OKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.OKIcon size={40}  />*/}
// {/*    </socialShare.OKShareButton>*/}
// {/*    <socialShare.OKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.OKIcon size={40}  />*/}
// {/*    </socialShare.OKShareButton>*/}
// {/*    <socialShare.PinterestShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.PinterestIcon size={40}  />*/}
// {/*    </socialShare.PinterestShareButton>*/}
// {/*    <socialShare.PocketShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.PocketIcon size={40}  />*/}
// {/*    </socialShare.PocketShareButton>*/}
// {/*    <socialShare.WorkplaceShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.WorkplaceIcon size={40}  />*/}
// {/*    </socialShare.WorkplaceShareButton>*/}
//
// {/*</div>*/}

/***/ }),

/***/ "./static/images/fontawesome/thumbs-down-solid.svg":
/*!*********************************************************!*\
  !*** ./static/images/fontawesome/thumbs-down-solid.svg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJ0aHVtYnMtZG93biIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXRodW1icy1kb3duIGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMCA1NnYyNDBjMCAxMy4yNTUgMTAuNzQ1IDI0IDI0IDI0aDgwYzEzLjI1NSAwIDI0LTEwLjc0NSAyNC0yNFY1NmMwLTEzLjI1NS0xMC43NDUtMjQtMjQtMjRIMjRDMTAuNzQ1IDMyIDAgNDIuNzQ1IDAgNTZ6bTQwIDIwMGMwLTEzLjI1NSAxMC43NDUtMjQgMjQtMjRzMjQgMTAuNzQ1IDI0IDI0LTEwLjc0NSAyNC0yNCAyNC0yNC0xMC43NDUtMjQtMjR6bTI3MiAyNTZjLTIwLjE4MyAwLTI5LjQ4NS0zOS4yOTMtMzMuOTMxLTU3Ljc5NS01LjIwNi0yMS42NjYtMTAuNTg5LTQ0LjA3LTI1LjM5My01OC45MDItMzIuNDY5LTMyLjUyNC00OS41MDMtNzMuOTY3LTg5LjExNy0xMTMuMTExYTExLjk4IDExLjk4IDAgMCAxLTMuNTU4LTguNTIxVjU5LjkwMWMwLTYuNTQxIDUuMjQzLTExLjg3OCAxMS43ODMtMTEuOTk4IDE1LjgzMS0uMjkgMzYuNjk0LTkuMDc5IDUyLjY1MS0xNi4xNzhDMjU2LjE4OSAxNy41OTggMjk1LjcwOS4wMTcgMzQzLjk5NSAwaDIuODQ0YzQyLjc3NyAwIDkzLjM2My40MTMgMTEzLjc3NCAyOS43MzcgOC4zOTIgMTIuMDU3IDEwLjQ0NiAyNy4wMzQgNi4xNDggNDQuNjMyIDE2LjMxMiAxNy4wNTMgMjUuMDYzIDQ4Ljg2MyAxNi4zODIgNzQuNzU3IDE3LjU0NCAyMy40MzIgMTkuMTQzIDU2LjEzMiA5LjMwOCA3OS40NjlsLjExLjExYzExLjg5MyAxMS45NDkgMTkuNTIzIDMxLjI1OSAxOS40MzkgNDkuMTk3LS4xNTYgMzAuMzUyLTI2LjE1NyA1OC4wOTgtNTkuNTUzIDU4LjA5OEgzNTAuNzIzQzM1OC4wMyAzNjQuMzQgMzg0IDM4OC4xMzIgMzg0IDQzMC41NDggMzg0IDUwNCAzMzYgNTEyIDMxMiA1MTJ6Ij48L3BhdGg+PC9zdmc+"

/***/ })

})
//# sourceMappingURL=post.js.cf20c9450086ebfdf930.hot-update.js.map