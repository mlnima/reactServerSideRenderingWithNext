"use strict";
exports.__esModule = true;
exports.uniqArrayBy = void 0;
var tslib_1 = require("tslib");
var uniqArrayBy = function (dataArray, key) {
    //@ts-ignore
    return tslib_1.__spreadArray([], tslib_1.__read(new Map(dataArray.map(function (item) { return [item[key], item]; })).values()), false);
};
exports.uniqArrayBy = uniqArrayBy;
exports["default"] = exports.uniqArrayBy;
