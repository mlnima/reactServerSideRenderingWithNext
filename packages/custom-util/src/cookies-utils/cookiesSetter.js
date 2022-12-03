"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var cookiesSetter = function (_a) {
    var name = _a.name, value = _a.value, days = _a.days;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var date;
        return tslib_1.__generator(this, function (_b) {
            try {
                date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
};
exports["default"] = cookiesSetter;
