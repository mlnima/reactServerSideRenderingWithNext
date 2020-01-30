webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AppContext */ "./context/AppContext.js");
/* harmony import */ var _components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layouts/AppLayout */ "./components/layouts/AppLayout.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// import React, { Component } from 'react';
// import Router from "../components/layouts/AppLayout";
//
// import './index.scss'
//
// class Home extends Component {
//     static async getInitialProps(context) {
//         const posts = [{title:'title1',body:'body1'}]
//
//         return {
//             posts
//         }
//     }
//     render() {
//
//         return (
//             <>
//                 <Router>
//                     <div className='HomePage'>
//                         <h1>Header 1</h1>
//                     </div>
//                 </Router>
//             </>
//         );
//     }
// }
// export default Home;



Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
  console.log(props.router);
}, [props.router]);

var Home = function Home(props) {
  var contextData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_1__["AppContext"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      state = _useState[0],
      setState = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {}, []);
  console.log(contextData.userData);
  return __jsx(_components_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, __jsx("div", {
    className: "HomePage"
  }, __jsx("h1", null, "Header 1")));
}; // Home.getInitialProps = async (context)=>{
//
// };


/* harmony default export */ __webpack_exports__["default"] = (Home); //create-next-app

/***/ })

})
//# sourceMappingURL=index.js.08d2ec5ca4e934bc410b.hot-update.js.map