"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminAuthMiddleware_2 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var router = (0, express_1.Router)();
router.post('/commandExecutor', adminAuthMiddleware_1.default, adminAuthMiddleware_2.default);
exports.default = router;
//# sourceMappingURL=adminTerminalRouter.js.map