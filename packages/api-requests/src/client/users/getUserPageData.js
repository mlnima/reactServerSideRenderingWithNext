"use strict";
//getUserPageData
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getUserPageData = function (_a) {
    var userWhoRequestIt = _a.userWhoRequestIt, username = _a.username, fields = _a.fields;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var fieldsQuery;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fieldsQuery = fields ? "&fields=".concat(fields.join(',')) : '';
                    return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/users/getUserPageData?".concat(userWhoRequestIt ? "userWhoRequestIt=".concat(userWhoRequestIt) : '').concat(username ? "&username=".concat(username) : '').concat(fieldsQuery, "&token=").concat(localStorage.wt))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports["default"] = getUserPageData;
