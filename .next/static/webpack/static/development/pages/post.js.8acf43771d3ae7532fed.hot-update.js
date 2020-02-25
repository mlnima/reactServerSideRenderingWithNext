webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./_variables/_variables.js":
/*!**********************************!*\
  !*** ./_variables/_variables.js ***!
  \**********************************/
/*! exports provided: likeValueCalculator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "likeValueCalculator", function() { return likeValueCalculator; });
var likeValueCalculator = function likeValueCalculator(likes, dislikes) {
  var finalValue = 0;
  finalValue = likes > 0 && dislikes > 0 ? Math.round(likes * 100 / (likes + dislikes)) : likes === 0 && dislikes === 0 ? 0 : likes === 0 && dislikes > 0 ? 0 : likes > 0 && dislikes === 0 ? 100 : 0;

  if (likes > 0 && dislikes > 0) {
    var total = likes + dislikes;
    var likesTo100 = likes * 100;
    var value = Math.round(likesTo100 / total);
    finalValue = value;
  }

  if (likes === 0 && dislikes === 0) {
    finalValue = 0;
  }

  if (likes === 0 && dislikes > 0) {
    finalValue = 0;
  }

  if (likes > 0 && dislikes === 0) {
    finalValue = 100;
  }

  return finalValue;
};

/***/ })

})
//# sourceMappingURL=post.js.8acf43771d3ae7532fed.hot-update.js.map