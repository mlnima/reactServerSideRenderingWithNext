"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../../lib/AxiosInstance"));
var UploadPostImages = function (uploadData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, AxiosInstance_1["default"].post('/api/v1/fileManager/ugc_postImagesUpload', uploadData)];
    });
}); };
exports["default"] = UploadPostImages;
