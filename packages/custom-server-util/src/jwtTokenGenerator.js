"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var jwtTokenGenerator = function (expiresIn, data) {
    return jsonwebtoken_1["default"].sign(data || {}, process.env.JWT_KEY, { expiresIn: expiresIn });
};
exports["default"] = jwtTokenGenerator;
