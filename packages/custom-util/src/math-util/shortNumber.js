"use strict";
exports.__esModule = true;
var shortNumber = function (count) {
    //@ts-ignore
    var formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(count);
};
exports["default"] = shortNumber;
