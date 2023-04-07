"use strict";
exports.__esModule = true;
var mobileDeviceDetector = function (userAgent) {
    var mobileRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
    return mobileRegex.test(userAgent);
};
exports["default"] = mobileDeviceDetector;
