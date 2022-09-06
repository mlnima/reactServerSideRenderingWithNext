"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminAddNewWidget_1 = tslib_1.__importDefault(require("./adminWidgetsControllers/adminAddNewWidget"));
var adminUpdateWidget_1 = require("./adminWidgetsControllers/adminUpdateWidget");
var adminDeleteWidget_1 = tslib_1.__importDefault(require("./adminWidgetsControllers/adminDeleteWidget"));
var adminGetWidgets_1 = tslib_1.__importDefault(require("./adminWidgetsControllers/adminGetWidgets"));
var adminPanelGetWidgets_1 = tslib_1.__importDefault(require("./adminWidgetsControllers/adminPanelGetWidgets"));
var router = (0, express_1.Router)();
router.post('/adminAddNewWidget', adminAuthMiddleware_1.default, adminAddNewWidget_1.default);
router.post('/adminUpdateWidget', adminAuthMiddleware_1.default, adminUpdateWidget_1.adminUpdateWidget);
router.post('/adminDeleteWidget', adminAuthMiddleware_1.default, adminDeleteWidget_1.default);
router.get('/adminGetWidgets', adminAuthMiddleware_1.default, adminGetWidgets_1.default);
router.get('/adminPanelGetWidgets', adminAuthMiddleware_1.default, adminPanelGetWidgets_1.default);
exports.default = router;
//# sourceMappingURL=adminWidgetsRouter.js.map