webpackHotUpdate("static\\development\\pages\\admin\\post.js",{

/***/ "./components/adminIncludes/SideBar/SideBar.js":
/*!*****************************************************!*\
  !*** ./components/adminIncludes/SideBar/SideBar.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SideBar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar.scss */ "./components/adminIncludes/SideBar/SideBar.scss");
/* harmony import */ var _SideBar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SideBar_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var SideBar = function SideBar(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);

  if (contextData.settings.adminPanelSideBar) {
    return __jsx("div", {
      className: "SideBar"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/posts"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Posts")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/media"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Media")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/psges"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Pages")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/comments"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Comments")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/feedback"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Feedback")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/design"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Design")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/plugins"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Plugins")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/users"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Users")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "/admin/setting"
    }, __jsx("a", {
      className: "SideBarItem"
    }, "Settings")));
  } else return null;
};

/* harmony default export */ __webpack_exports__["default"] = (SideBar);

/***/ })

})
//# sourceMappingURL=post.js.ad4ba91e5de71bf9ec28.hot-update.js.map