"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var loadOlderMessages = function (_a) {
    var amount = _a.amount, skip = _a.skip, conversationId = _a.conversationId;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var token;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = localStorage.getItem("wt");
                    return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/messenger/loadOlderMessages", {
                            params: { amount: amount, skip: skip, conversationId: conversationId },
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports["default"] = loadOlderMessages;
