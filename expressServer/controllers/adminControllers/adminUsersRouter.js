"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminUpdateUserData_1 = tslib_1.__importDefault(require("./adminUsersControllers/adminUpdateUserData"));
var adminNewApiKey_1 = tslib_1.__importDefault(require("./adminUsersControllers/adminNewApiKey"));
var adminGetUsersList_1 = tslib_1.__importDefault(require("./adminUsersControllers/adminGetUsersList"));
var adminDeleteUser_1 = tslib_1.__importDefault(require("./adminUsersControllers/adminDeleteUser"));
var adminGetUser_1 = tslib_1.__importDefault(require("./adminUsersControllers/adminGetUser"));
var router = (0, express_1.Router)();
router.post('/newAPIKey', adminAuthMiddleware_1.default, adminNewApiKey_1.default);
router.post('/getUsersList', adminAuthMiddleware_1.default, adminGetUsersList_1.default);
router.post('/deleteUser', adminAuthMiddleware_1.default, adminDeleteUser_1.default);
router.post('/getUser', adminAuthMiddleware_1.default, adminGetUser_1.default);
router.post('/adminUpdateUserData', adminAuthMiddleware_1.default, adminUpdateUserData_1.default);
exports.default = router;
//# sourceMappingURL=adminUsersRouter.js.map