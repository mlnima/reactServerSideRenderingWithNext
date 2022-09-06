"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var adminScrapYoutubeInfo_1 = tslib_1.__importDefault(require("./adminDataScrappersControllers/adminScrapYoutubeInfo"));
var router = (0, express_1.Router)();
router.post('/scrapYoutubeInfo', adminAuthMiddleware_1.default, adminScrapYoutubeInfo_1.default);
exports.default = router;
//# sourceMappingURL=adminDataScrappersRouter.js.map