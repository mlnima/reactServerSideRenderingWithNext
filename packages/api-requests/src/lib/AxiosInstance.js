"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var AxiosInstance = axios_1["default"].create({
    //@ts-ignore
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
    // baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL
});
exports["default"] = AxiosInstance;
