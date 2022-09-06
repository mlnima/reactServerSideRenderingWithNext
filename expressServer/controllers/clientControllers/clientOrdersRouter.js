"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var authMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/authMiddleware"));
var clientCreateOrder_1 = tslib_1.__importDefault(require("./clientOrdersControllers/clientCreateOrder"));
var router = (0, express_1.Router)();
router.post('/create/payPal', authMiddleware_1.default, clientCreateOrder_1.default);
exports.default = router;
//# sourceMappingURL=clientOrdersRouter.js.map