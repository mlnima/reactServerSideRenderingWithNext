"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var arraySortRandom = function (arrayData) {
    var _a;
    if (Array === null || Array === void 0 ? void 0 : Array.isArray(arrayData)) {
        try {
            return (_a = (tslib_1.__spreadArray([], tslib_1.__read(arrayData), false) || [])) === null || _a === void 0 ? void 0 : _a.sort(function () { return Math.random() - 0.5; });
        }
        catch (err) {
            return arrayData;
        }
    }
    else
        return arrayData;
};
exports["default"] = arraySortRandom;
