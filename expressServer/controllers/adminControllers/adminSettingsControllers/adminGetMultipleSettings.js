"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var adminGetMultipleSettings = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var requestedSettings, settings, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestedSettings = Array.isArray(req.query.setting) ? req.query.setting.map(function (s) {
                    return { type: s };
                }) : { type: req.query.setting };
                return [4 /*yield*/, settingSchema_1.default.find({
                        $or: requestedSettings
                    }).exec()];
            case 1:
                settings = _a.sent();
                if (settings) {
                    res.json({ settings: settings });
                }
                else {
                    res.status(404).json('Not Found');
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(404).json('Not Found');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetMultipleSettings;
//# sourceMappingURL=adminGetMultipleSettings.js.map