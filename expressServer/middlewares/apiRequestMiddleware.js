"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../models/userSchema"));
var apiRequestMiddleware = function (req, res, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var apiKey, username, userData, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = req.body.apiKey;
                username = req.body.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userSchema_1.default.findOne({ username: username }).exec()];
            case 2:
                userData = _a.sent();
                if (!username || !apiKey || !userData.role || !userData.API_KEY) {
                    // throw new Error('Unauthorized')
                    return [2 /*return*/, res.status(401).json({
                            message: 'Unauthorized'
                        })];
                }
                if (userData.role === 'administrator' && userData.API_KEY === apiKey) {
                    next();
                }
                else {
                    return [2 /*return*/, res.status(401).json({
                            message: 'Unauthorized'
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(401).json({
                        message: 'Unauthorized'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = apiRequestMiddleware;
//# sourceMappingURL=apiRequestMiddleware.js.map