"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminGetOrders_1 = tslib_1.__importDefault(require("./adminOdersControllers/adminGetOrders"));
var router = (0, express_1.Router)();
router.post('/getOrders', adminAuthMiddleware_1.default, adminGetOrders_1.default);
exports.default = router;
//# sourceMappingURL=adminOrdersRouter.js.map