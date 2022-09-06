"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var clientGetPageData_1 = tslib_1.__importDefault(require("./clientPagesControllers/clientGetPageData"));
var clientGetPagesData_1 = tslib_1.__importDefault(require("./clientPagesControllers/clientGetPagesData"));
var apiCache_1 = tslib_1.__importDefault(require("../../middlewares/apiCache"));
var router = (0, express_1.Router)();
router.get('/getPageData', apiCache_1.default, clientGetPageData_1.default);
router.get('/getPagesData', apiCache_1.default, clientGetPagesData_1.default);
exports.default = router;
//# sourceMappingURL=clientPagesRouter.js.map