"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getSettings = function (requireSettings) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var settingsQuery;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                settingsQuery = requireSettings.map(function (setting) { return "setting=".concat(setting); }).join('&');
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/settings/getMultipleSettings?".concat(settingsQuery))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getSettings;
