"use strict";
exports.__esModule = true;
exports.server = void 0;
var tslib_1 = require("tslib");
var http_1 = tslib_1.__importDefault(require("http"));
var dev = process.env.NODE_ENV !== 'production';
var certPath = dev ? '../../ssl/certificate.crt' : '../../../ssl/certificate.crt';
var keyPath = dev ? '../../ssl/private.key' : '../../../ssl/private.key';
var server = function (_a) {
    var app = _a.app;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_b) {
            return [2 /*return*/, http_1["default"].createServer(app)];
        });
    });
};
exports.server = server;
