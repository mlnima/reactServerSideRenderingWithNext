"use strict";
exports.__esModule = true;
var headerSizeCalculator = function () {
    var topbarElement = document.querySelector('.topbar');
    var topbarHeight = (topbarElement === null || topbarElement === void 0 ? void 0 : topbarElement.offsetHeight) || 0;
    var headerElement = document.querySelector('.header');
    var headerHeight = (headerElement === null || headerElement === void 0 ? void 0 : headerElement.offsetHeight) || 0;
    var navigationElement = document.querySelector('.navigation');
    var navigationHeight = (navigationElement === null || navigationElement === void 0 ? void 0 : navigationElement.offsetHeight) || 0;
    return topbarHeight + headerHeight + navigationHeight;
};
exports["default"] = headerSizeCalculator;
