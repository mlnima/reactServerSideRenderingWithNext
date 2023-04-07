"use strict";
exports.__esModule = true;
var touchDeviceDetector = function () {
    if (typeof window === 'undefined')
        return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
exports["default"] = touchDeviceDetector;
