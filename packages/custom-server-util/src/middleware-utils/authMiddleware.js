"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = req.body.token || req.query.token || (authHeader && authHeader.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        req.userData = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid Or Expired token' });
    }
};
exports["default"] = authMiddleware;
