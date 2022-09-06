"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminUpdateSettings_1 = tslib_1.__importDefault(require("./adminSettingsControllers/adminUpdateSettings"));
var adminGetSettings_1 = tslib_1.__importDefault(require("./adminSettingsControllers/adminGetSettings"));
var adminGetMultipleSettings_1 = tslib_1.__importDefault(require("./adminSettingsControllers/adminGetMultipleSettings"));
// import adminClearCaches from './adminSettingsControllers/adminClearCaches';
var router = (0, express_1.Router)();
router.post('/update', adminAuthMiddleware_1.default, adminUpdateSettings_1.default);
router.get('/getSetting', adminAuthMiddleware_1.default, adminGetSettings_1.default);
router.get('/getMultipleSetting', adminAuthMiddleware_1.default, adminGetMultipleSettings_1.default);
//router.post('/clearCaches',adminAuthMiddleware,adminClearCaches)
exports.default = router;
//# sourceMappingURL=adminSettingsRouter.js.map