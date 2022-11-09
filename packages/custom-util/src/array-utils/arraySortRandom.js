"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var arraySortRandom = function (arrayData) {
    var _a;
    if (Array === null || Array === void 0 ? void 0 : Array.isArray(arrayData)) {
        try {
            return (_a = (__spreadArray([], arrayData, true) || [])) === null || _a === void 0 ? void 0 : _a.sort(function () { return Math.random() - 0.5; });
        }
        catch (err) {
            return arrayData;
        }
    }
    else
        return arrayData;
};
exports["default"] = arraySortRandom;
