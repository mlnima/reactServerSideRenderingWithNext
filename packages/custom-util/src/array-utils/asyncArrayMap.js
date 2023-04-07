"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
function asyncFunction(value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(value * 2);
                    }, 1000);
                })];
        });
    });
}
var asyncArrayMap = function (array, callback) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var results, array_1, array_1_1, item, result, e_1_1;
    var e_1, _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                results = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                array_1 = tslib_1.__values(array), array_1_1 = array_1.next();
                _b.label = 2;
            case 2:
                if (!!array_1_1.done) return [3 /*break*/, 5];
                item = array_1_1.value;
                return [4 /*yield*/, asyncFunction(item)];
            case 3:
                result = _b.sent();
                results.push(result);
                _b.label = 4;
            case 4:
                array_1_1 = array_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (array_1_1 && !array_1_1.done && (_a = array_1["return"])) _a.call(array_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, results];
        }
    });
}); };
exports["default"] = asyncArrayMap;
