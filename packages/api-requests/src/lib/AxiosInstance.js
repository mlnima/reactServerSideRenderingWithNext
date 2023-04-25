"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
// @ts-nocheck
var axios_1 = tslib_1.__importDefault(require("axios"));
var AxiosInstance = axios_1["default"].create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
});
// Request interceptor to add JWT to headers if it exists
AxiosInstance.interceptors.request.use(function (config) {
    if (typeof window !== 'undefined') {
        // Check if JWT exists in local storage
        var jwt = localStorage.getItem('wt');
        if (jwt) {
            // Include JWT in Authorization header
            config.headers.Authorization = "Bearer ".concat(jwt);
        }
    }
    return config;
}, function (error) {
    // Handle request error
    return Promise.reject(error);
});
exports["default"] = AxiosInstance;
// // @ts-nocheck
// import axios from "axios";
//
// const AxiosInstance = axios.create({
//         baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
//     });
//
// export default AxiosInstance;
