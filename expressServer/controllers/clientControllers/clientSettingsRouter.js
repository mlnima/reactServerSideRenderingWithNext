"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var apiCache_1 = tslib_1.__importDefault(require("../../middlewares/apiCache"));
var clientGetMultipleSettings_1 = tslib_1.__importDefault(require("./clientSettingsControllers/clientGetMultipleSettings"));
var router = (0, express_1.Router)();
router.get('/getMultipleSettings', apiCache_1.default, clientGetMultipleSettings_1.default);
exports.default = router;
//# sourceMappingURL=clientSettingsRouter.js.map