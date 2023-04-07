"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getEditingPost = function (postId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var queries;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queries = new URLSearchParams({ _id: postId }).toString();
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/posts/getEditingPost?".concat(queries))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getEditingPost;
