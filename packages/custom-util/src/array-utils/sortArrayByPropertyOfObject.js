"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
//GPT4
var sortArrayByPropertyOfObject = function (array, key, order) {
    if (order === void 0) { order = 'asc'; }
    var instanceArray = tslib_1.__spreadArray([], tslib_1.__read(array), false);
    return instanceArray.sort(function (a, b) {
        if (a[key] < b[key])
            return order === 'asc' ? -1 : 1;
        if (a[key] > b[key])
            return order === 'asc' ? 1 : -1;
        return 0;
    });
};
exports["default"] = sortArrayByPropertyOfObject;
