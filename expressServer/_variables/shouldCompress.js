"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var compression_1 = tslib_1.__importDefault(require("compression"));
var shouldCompress = function (req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression_1.default.filter(req, res);
};
exports.default = shouldCompress;
//# sourceMappingURL=shouldCompress.js.map