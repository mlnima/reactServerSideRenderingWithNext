"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var deleteFiles = function (ids) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var params;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = new URLSearchParams({ ids: ids.join(',') });
                return [4 /*yield*/, AxiosInstance_1["default"]["delete"]('/files/admin/fileManager/deleteFile', {
                        params: params,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer ".concat(localStorage.wt)
                        }
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = deleteFiles;
