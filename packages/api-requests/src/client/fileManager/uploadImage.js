"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var FileServerAxiosInstance_1 = tslib_1.__importDefault(require("../../lib/FileServerAxiosInstance"));
var uploadImage = function (formData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, FileServerAxiosInstance_1["default"].post("/files/v1/upload/uploadImage", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer ".concat(localStorage.wt)
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = uploadImage;
