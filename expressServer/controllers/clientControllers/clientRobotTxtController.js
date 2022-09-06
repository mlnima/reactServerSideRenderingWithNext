"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var clientRobotTxtController = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var robotTxtData;
    return tslib_1.__generator(this, function (_a) {
        res.set('Content-Type', 'text/plain;charset=utf-8');
        robotTxtData = "User-agent: *\nCrawl-delay: 10\nDisallow: /admin\nDisallow: /admin/*\nDisallow: /profile/*\nDisallow: /chatroom/*\nDisallow: /messenger/*\nSitemap: ".concat(process.env.NEXT_PUBLIC_PRODUCTION_URL, "/sitemap.xml\nHost: ").concat(process.env.NEXT_PUBLIC_PRODUCTION_URL, "\n");
        res.send(robotTxtData);
        return [2 /*return*/];
    });
}); };
exports.default = clientRobotTxtController;
//# sourceMappingURL=clientRobotTxtController.js.map