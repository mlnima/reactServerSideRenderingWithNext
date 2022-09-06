"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminCreateNewPage_1 = tslib_1.__importDefault(require("./adminPagesControllers/adminCreateNewPage"));
var adminUpdatePage_1 = tslib_1.__importDefault(require("./adminPagesControllers/adminUpdatePage"));
var adminGetPagesData_1 = tslib_1.__importDefault(require("./adminPagesControllers/adminGetPagesData"));
var adminDeleteCustomPage_1 = tslib_1.__importDefault(require("./adminPagesControllers/adminDeleteCustomPage"));
var adminGetPageData_1 = tslib_1.__importDefault(require("./adminPagesControllers/adminGetPageData"));
var router = (0, express_1.Router)();
router.post('/createNewPage', adminAuthMiddleware_1.default, adminCreateNewPage_1.default);
router.post('/updatePage', adminAuthMiddleware_1.default, adminUpdatePage_1.default);
router.post('/getPagesData', adminAuthMiddleware_1.default, adminGetPagesData_1.default);
router.post('/deleteCustomPage', adminAuthMiddleware_1.default, adminDeleteCustomPage_1.default);
router.post('/getPageData', adminAuthMiddleware_1.default, adminGetPageData_1.default);
exports.default = router;
//# sourceMappingURL=adminPagesRouter.js.map