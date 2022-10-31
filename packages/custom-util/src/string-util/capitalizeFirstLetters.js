"use strict";
exports.__esModule = true;
var capitalizeFirstLetters = function (str) {
    try {
        return typeof str === 'string' ?
            str.split(' ')
                .map(function (word) { return word.replace(/^(.)|\s+(.)/g, function (c) { return c.toUpperCase(); }); })
                .join(' ')
            :
                str;
    }
    catch (err) {
        return str;
    }
};
exports["default"] = capitalizeFirstLetters;
