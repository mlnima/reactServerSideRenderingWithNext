webpackHotUpdate("static\\development\\pages\\auth\\login.js",{

/***/ "./components/includes/TopBar/TopBar.js":
/*!**********************************************!*\
  !*** ./components/includes/TopBar/TopBar.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TopBar_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TopBar.scss */ "./components/includes/TopBar/TopBar.scss");
/* harmony import */ var _TopBar_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_TopBar_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var TopBar = function TopBar(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log(props.router);
  }, [props.router]);

  if (contextData.userData.username) {
    if (contextData.userData.role === 'administrator') {
      return __jsx("div", {
        className: "TopBar"
      }, __jsx("button", {
        onClick: function onClick() {
          return contextData.functions.logOutUser();
        }
      }, "Log Out"), __jsx("button", {
        onClick: function onClick() {
          return contextData.functions.goToAdminPanel();
        }
      }, "Admin Panel"));
    } else {
      return __jsx("div", {
        className: "TopBar"
      }, __jsx("button", {
        onClick: function onClick() {
          return contextData.functions.logOutUser();
        }
      }, "Log Out"));
    }
  } else {
    return __jsx("div", {
      className: "TopBar"
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: "/auth/login"
    }, __jsx("a", null, "Login")), __jsx("span", null, "Or"), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: "/auth/register"
    }, __jsx("a", null, "Register")));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(TopBar));

/***/ })

})
//# sourceMappingURL=login.js.c2277bf8c768d6a62992.hot-update.js.map