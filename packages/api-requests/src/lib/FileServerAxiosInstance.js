"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
// @ts-nocheck
var axios_1 = tslib_1.__importDefault(require("axios"));
var FileServerAxiosInstance = axios_1["default"].create({
    baseURL: process.env.NEXT_PUBLIC_FILE_SERVER_URL
});
exports["default"] = FileServerAxiosInstance;
