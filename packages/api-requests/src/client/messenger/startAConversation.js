"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var startAConversation = function (_a) {
    var users = _a.users;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, AxiosInstance_1["default"].post("/api/v1/messenger/getAConversation", {
                        users: users
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports["default"] = startAConversation;
