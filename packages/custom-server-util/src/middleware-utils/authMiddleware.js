"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var authMiddleware = function (req, res, next) {
    try {
        var token = req.body.token || req.query.token;
        req.userData = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports["default"] = authMiddleware;
