"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var models_1 = require("models");
var fetchUserData = function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.userSchema.findById({ _id: userId }).exec()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports["default"] = fetchUserData;
