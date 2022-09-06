"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var adminGetSettings = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var setting;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, settingSchema_1.default.findOne({ type: req.query.type }).exec()];
            case 1:
                setting = _a.sent();
                res.json({ setting: setting });
                return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetSettings;
//# sourceMappingURL=adminGetSettings.js.map