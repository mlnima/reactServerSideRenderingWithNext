"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
// @ts-ignore
var compression_1 = tslib_1.__importDefault(require("compression"));
//@ts-ignore
var shouldCompress = function (req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression_1["default"].filter(req, res);
};
exports["default"] = shouldCompress;