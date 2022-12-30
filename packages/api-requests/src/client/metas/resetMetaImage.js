"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var resetMetaImage = function (_id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var body;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    _id: _id,
                    token: localStorage.wt
                };
                return [4 /*yield*/, AxiosInstance_1["default"].post('/api/v1/posts/resetMetaImage', body)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = resetMetaImage;