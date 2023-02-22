"use strict";
exports.__esModule = true;
var convertSecondsToTimeString = function (seconds) {
    return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
};
exports["default"] = convertSecondsToTimeString;
