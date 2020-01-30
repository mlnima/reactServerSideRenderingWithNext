webpackHotUpdate("static\\development\\pages\\_app.js",{

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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ "./node_modules/jsonwebtoken/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;




var AppContext = react__WEBPACK_IMPORTED_MODULE_2___default.a.createContext();

var AppProvider = function AppProvider(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      state = _useState[0],
      dispatchState = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    adminPanelSideBar: false,
    test: false
  }),
      settings = _useState2[0],
      dispatchSettings = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    username: undefined
  }),
      userData = _useState3[0],
      dispatchUserData = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    getAndSetUserInfo: function getAndSetUserInfo() {
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.async(function getAndSetUserInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_5___default.a.post('/api/v1/users/getUserInfo', {
                token: localStorage.wt
              }));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }),
      functions = _useState4[0],
      dispatchFunctions = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (localStorage.wt) {
      functions.getAndSetUserInfo().then(function (res) {
        dispatchUserData.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(res.data.userData));
        console.log(res);
      })["catch"](function (err) {
        console.log(err);
        localStorage.removeItem('wt');
      });
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(userData);
  }, [userData]); // useEffect(() => {
  //     if (localStorage.wt) {
  //         functions.getUserInfo().then(res => {
  //             functions.setUserInfo(res)
  //             state.functions.requestForGoingOnline();
  //             props.history.push('/chat')
  //         }).catch(() => {
  //             localStorage.removeItem('wt');
  //             if (props.location.pathname === '/chat' ){
  //                 props.history.push('/')
  //             }
  //         })
  //     }else {
  //         if (props.location.pathname === '/chat' ){
  //             props.history.push('/')
  //         }
  //     }
  // }, [props.location.pathname]);

  return __jsx("div", null, __jsx(AppContext.Provider, {
    value: {
      state: state,
      dispatchState: dispatchState,
      settings: settings,
      dispatchSettings: dispatchSettings,
      userData: userData,
      dispatchUserData: dispatchUserData,
      functions: functions
    }
  }, props.children));
};

var AppProviderWithRouter = AppProvider;

/***/ })

})
//# sourceMappingURL=_app.js.250670787ae17f7c4962.hot-update.js.map