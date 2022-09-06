"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var adminPanelGetWidgets = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var widgets, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, widgetSchema_1.default.find({}).exec()];
            case 1:
                widgets = _a.sent();
                Promise.all(widgets).then(function (widgetsWithData) {
                    res.json({ widgets: widgetsWithData });
                }).catch(function (err) {
                    console.log(err);
                    res.end();
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = adminPanelGetWidgets;
//# sourceMappingURL=adminPanelGetWidgets.js.map