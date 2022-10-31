"use strict";
exports.__esModule = true;
var capitalizeFirstLetter = function (str) {
    try {
        return typeof str === 'string' ? str.replace(/^(.)|\s+(.)/g, function (c) { return c.toUpperCase(); }) : str;
    }
    catch (err) {
        return str;
    }
};
exports["default"] = capitalizeFirstLetter;
