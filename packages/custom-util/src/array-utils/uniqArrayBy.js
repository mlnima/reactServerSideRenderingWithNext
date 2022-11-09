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
exports.uniqArrayBy = void 0;
var uniqArrayBy = function (dataArray, key) {
    //@ts-ignore
    return __spreadArray([], new Map(dataArray.map(function (item) { return [item[key], item]; })).values(), true);
};
exports.uniqArrayBy = uniqArrayBy;
exports["default"] = exports.uniqArrayBy;
