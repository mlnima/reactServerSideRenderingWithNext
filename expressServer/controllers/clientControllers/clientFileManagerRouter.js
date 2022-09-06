"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var authMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/authMiddleware"));
var clientUserImageUpload_1 = tslib_1.__importDefault(require("./clientFileManagerControllers/clientUserImageUpload"));
var clientUserPostImageUpload_1 = tslib_1.__importDefault(require("./clientFileManagerControllers/clientUserPostImageUpload"));
var router = (0, express_1.Router)();
router.post('/userImageUpload', authMiddleware_1.default, clientUserImageUpload_1.default);
router.post('/userPostImageUpload', clientUserPostImageUpload_1.default);
exports.default = router;
//# sourceMappingURL=clientFileManagerRouter.js.map