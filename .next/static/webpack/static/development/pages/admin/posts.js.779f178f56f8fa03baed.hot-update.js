webpackHotUpdate("static\\development\\pages\\admin\\posts.js",{

/***/ "./components/adminIncludes/PostsComponents/PostsDataTable/BodyTable.js":
/*!******************************************************************************!*\
  !*** ./components/adminIncludes/PostsComponents/PostsDataTable/BodyTable.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/client/with-router */ "./node_modules/next/dist/client/with-router.js");
/* harmony import */ var next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var BodyTable = function BodyTable(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);
  var selectBoxes = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(contextData.adminPosts.map(function () {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
  }));

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    hoveredId: '',
    isMobile: false
  }),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (window.innerWidth < 768) {
      setState(_objectSpread({}, state, {
        isMobile: true
      }));
    }
  }, []);

  var onDeletePermanentlyHandler = function onDeletePermanentlyHandler() {// deletePost(state.hoveredId).then(res => {
    //     const posts = contextData.postsData.posts.filter(post => {
    //         return post._id !== state.hoveredId
    //     });
    //     const report = contextData.state.reports.push(res.data.message)
    //     contextData.setPostsData({
    //         ...contextData.postsData,
    //         posts
    //     });
    //     contextData.setState({
    //         ...contextData.state,
    //         report
    //     })
    // })
  };

  var HoverOnTitle = function HoverOnTitle(props) {
    if (props.post._id === state.hoveredId) {
      var editPostPath = "/admin/post?id=".concat(props.post._id);

      if (props.post.status === 'trash') {
        return __jsx("th", {
          className: "postControlOptions"
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
          href: editPostPath
        }, __jsx("a", null, __jsx("button", null, "Edit"))), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'delete');
          }
        }, "Delete"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'draft');
          }
        }, "Draft"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'pending');
          }
        }, "Pending"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'published');
          }
        }, "Publish"), __jsx("button", null, "View"));
      } else if (props.post.status === 'published') {
        return __jsx("th", {
          className: "postControlOptions"
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
          href: editPostPath
        }, __jsx("a", null, __jsx("button", null, "Edit"))), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'trash');
          }
        }, "Trash"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'draft');
          }
        }, "Draft"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'pending');
          }
        }, "Pending"), __jsx("button", null, "View"));
      } else {
        return __jsx("th", {
          className: "postControlOptions"
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
          href: editPostPath
        }, __jsx("a", null, __jsx("button", null, "Edit"))), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'draft');
          }
        }, "Draft"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'pending');
          }
        }, "Pending"), __jsx("button", null, "View"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'trash');
          }
        }, "Trash"), __jsx("button", {
          onClick: function onClick() {
            return contextData.functions.bulkActionPost([state.hoveredId], 'published');
          }
        }, "Publish"));
      }
    } else return null;
  };

  var onCheckHandler = function onCheckHandler(e) {//
    // if (e.target.checked) {
    //     if (!contextData.postsData.checkedPosts.includes(e.target.name)) {
    //         let pushedItemArr = contextData.postsData.checkedPosts;
    //         pushedItemArr.push(e.target.name);
    //         pushedItemArr = [...new Set(pushedItemArr)]
    //         contextData.setPostsData({
    //             ...contextData.postsData,
    //             checkedPosts: pushedItemArr
    //         });
    //     }
    //
    // } else {
    //     if (contextData.postsData.checkedPosts.includes(e.target.name)) {
    //         let pushedItemArr = contextData.postsData.checkedPosts.filter(id => {
    //             return id !== e.target.name
    //         });
    //         pushedItemArr = [...new Set(pushedItemArr)];
    //         contextData.setPostsData({
    //             ...contextData.postsData,
    //             checkedPosts: pushedItemArr
    //         });
    //     }
    // }
  };

  var renderPosts = props.postsSource.posts.map(function (post) {
    var renderTags = post.tags.map(function (item) {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
        href: "/",
        key: item
      }, " ", __jsx("a", {
        className: "tagPreviewItem"
      }, item), ",");
    });
    var author = post.author;

    if (post.author === contextData.userData._id) {
      author = contextData.userData.username;
    }

    var isChecked = contextData.adminPostsData.checkedPosts.includes(post._id);
    return __jsx("tr", {
      key: post._id,
      className: "BodyTableItems",
      onTouchStart: function onTouchStart() {
        setState(_objectSpread({}, state, {
          hoveredId: post._id
        }));
      },
      onMouseEnter: function onMouseEnter() {
        setState(_objectSpread({}, state, {
          hoveredId: post._id
        }));
      }
    }, __jsx("td", {
      className: "postColumn"
    }, __jsx("div", null, __jsx("input", {
      name: post._id,
      className: " BodyTableItemCheckBox",
      type: "checkbox",
      ref: function ref(e) {
        return selectBoxes.current[contextData.adminPosts.indexOf(post)] = e;
      },
      checked: isChecked,
      onChange: function onChange(e) {
        return onCheckHandler(e);
      }
    })), __jsx("div", null, __jsx("p", {
      className: "BodyTableItem"
    }, post.title)), __jsx("div", null, __jsx("p", {
      className: "BodyTableItem author noMobile"
    }, author)), __jsx("div", {
      className: "tagCategoriesActorsPreview BodyTableItem noMobile"
    }, __jsx("span", null, "   ", post.categories + ' , ')), __jsx("div", {
      className: "tagCategoriesActorsPreview BodyTableItem noMobile"
    }, __jsx("span", null, "   ", post.tags + ' , ')), __jsx("div", {
      className: "tagCategoriesActorsPreview BodyTableItem noMobile"
    }, __jsx("span", null, "      ", post.actors + ' , ')), __jsx("div", null, __jsx("p", {
      className: "BodyTableItem noMobile"
    }, post.status)), __jsx("div", null, __jsx("img", {
      className: "BodyTableItem noMobile",
      src: post.mainThumbnail
    }))), __jsx(HoverOnTitle, {
      post: post
    }));
  });
  return __jsx("tbody", {
    className: "BodyTable"
  }, renderPosts);
};

/* harmony default export */ __webpack_exports__["default"] = (next_dist_client_with_router__WEBPACK_IMPORTED_MODULE_3___default()(BodyTable));

/***/ })

})
//# sourceMappingURL=posts.js.779f178f56f8fa03baed.hot-update.js.map