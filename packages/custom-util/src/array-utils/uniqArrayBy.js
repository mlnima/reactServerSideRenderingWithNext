"use strict";
// import {isArray} from "lodash";
exports.__esModule = true;
exports.uniqArrayBy = void 0;
var tslib_1 = require("tslib");
var uniqArrayBy = function (dataArray, key) {
    try {
        if (Array.isArray(dataArray)) {
            return tslib_1.__spreadArray([], tslib_1.__read(new Map(dataArray.map(function (item) { return [item[key], item]; })).values()), false);
        }
        else {
            return dataArray || [];
        }
    }
    catch (error) {
        console.log(error);
        return dataArray || [];
    }
    //@ts-ignore
};
exports.uniqArrayBy = uniqArrayBy;
exports["default"] = exports.uniqArrayBy;
