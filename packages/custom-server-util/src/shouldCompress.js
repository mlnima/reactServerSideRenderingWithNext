"use strict";
exports.__esModule = true;
// @ts-ignore
var compression_1 = require("compression");
//@ts-ignore
var shouldCompress = function (req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression_1["default"].filter(req, res);
};
exports["default"] = shouldCompress;
