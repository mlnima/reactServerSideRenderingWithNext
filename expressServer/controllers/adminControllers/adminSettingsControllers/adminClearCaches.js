"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apicache_1 = tslib_1.__importDefault(require("apicache"));
var adminClearCaches = function (req, res) {
    apicache_1.default.clear(req.params.collection);
    console.log('api cache cleared');
    res.end();
};
exports.default = adminClearCaches;
//# sourceMappingURL=adminClearCaches.js.map