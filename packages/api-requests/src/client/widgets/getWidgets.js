"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getWidgets = function (widgets, locale) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var widgetsQuery;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                widgetsQuery = "?".concat(locale ? "&locale=".concat(locale) : '', "&").concat(widgets.map(function (s) { return 'widget=' + s; }).join('&'));
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/widgets/getWidgets".concat(widgetsQuery))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getWidgets;
