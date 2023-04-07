"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var models_1 = require("models");
var adminAuthMiddleware = function (req, res, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var token, verifiedToken_1, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.body.token || req.query.token;
                verifiedToken_1 = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
                return [4 /*yield*/, models_1.userSchema.findById(verifiedToken_1._id).exec().then(function (user) {
                        if (user.role === 'administrator') {
                            req.userData = verifiedToken_1;
                            next();
                        }
                        else {
                            return res.status(401).json({
                                message: 'Unauthorized'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(401).json({
                        message: 'Unauthorized'
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports["default"] = adminAuthMiddleware;
