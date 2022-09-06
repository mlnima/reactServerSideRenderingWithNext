"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminGetFormsData_1 = tslib_1.__importDefault(require("./adminFormsControllers/adminGetFormsData"));
var adminGetFormData_1 = tslib_1.__importDefault(require("./adminFormsControllers/adminGetFormData"));
var adminDeleteFormData_1 = tslib_1.__importDefault(require("./adminFormsControllers/adminDeleteFormData"));
var router = (0, express_1.Router)();
router.post('/getFormsData', adminAuthMiddleware_1.default, adminGetFormsData_1.default);
router.post('/getFormData', adminAuthMiddleware_1.default, adminGetFormData_1.default);
router.post('/deleteFormData', adminAuthMiddleware_1.default, adminDeleteFormData_1.default);
exports.default = router;
//# sourceMappingURL=adminFormsRouter.js.map