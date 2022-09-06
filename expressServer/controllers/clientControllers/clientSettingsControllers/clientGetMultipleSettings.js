"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var clientGetMultipleSettings = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var requestedSettings, settingRequestPromises;
    return tslib_1.__generator(this, function (_a) {
        try {
            requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];
            settingRequestPromises = requestedSettings.map(function (setting) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, settingSchema_1.default.findOne({ type: setting }).exec()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            Promise.all(settingRequestPromises).then(function (settings) {
                res.json({ settings: settings });
            }).catch(function (err) {
                console.log(err);
                res.status(404).json('Not Found');
            });
        }
        catch (err) {
            console.log(err);
            res.status(404).json('Not Found');
        }
        return [2 /*return*/];
    });
}); };
exports.default = clientGetMultipleSettings;
//# sourceMappingURL=clientGetMultipleSettings.js.map