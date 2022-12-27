"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
//getForms
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getForms = function (queriesData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AxiosInstance_1["default"].post('/api/admin/forms/getFormsData', tslib_1.__assign(tslib_1.__assign({}, queriesData), { token: localStorage.wt }))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getForms;
