"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../models/settings/settingSchema"));
var clientMainFestController = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var identityData, manifestJsonData, err_1;
    var _a, _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'identity' })];
            case 1:
                identityData = _d.sent();
                manifestJsonData = {
                    "theme_color": identityData.data.themeColor || '#000',
                    "background_color": identityData.data.themeColor || '#000',
                    "name": identityData.data.title || 'React CMS website',
                    "short_name": identityData.data.title || 'React CMS website',
                    "icons": [
                        {
                            "src": ((_a = identityData === null || identityData === void 0 ? void 0 : identityData.data) === null || _a === void 0 ? void 0 : _a.pwa192) || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/192.png',
                            "sizes": "192x192",
                            "type": "image/png",
                            "purpose": "any maskable"
                        },
                        {
                            "src": ((_b = identityData === null || identityData === void 0 ? void 0 : identityData.data) === null || _b === void 0 ? void 0 : _b.pwa384) || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/384.png',
                            "sizes": "384x384",
                            "type": "image/png",
                            "purpose": "image/png"
                        },
                        {
                            "src": ((_c = identityData === null || identityData === void 0 ? void 0 : identityData.data) === null || _c === void 0 ? void 0 : _c.pwa512) || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/512.png',
                            "sizes": "512x512",
                            "type": "image/png",
                            "purpose": "image/png"
                        }
                    ],
                    "display": "standalone",
                    "start_url": "/",
                    "orientation": "portrait"
                };
                res.json(manifestJsonData);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _d.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = clientMainFestController;
//# sourceMappingURL=clientMainFestController.js.map