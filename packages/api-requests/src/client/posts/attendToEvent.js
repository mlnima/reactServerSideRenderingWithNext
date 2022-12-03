"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var attendToEvent = function (postId, userId, actionType) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var body;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    id: postId,
                    userId: userId,
                    actionType: actionType
                };
                return [4 /*yield*/, AxiosInstance_1["default"].post('/api/v1/posts/attendToEvent', body)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = attendToEvent;
