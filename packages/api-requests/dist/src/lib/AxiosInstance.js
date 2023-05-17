"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = void 0;
const tslib_1 = require("tslib");
// @ts-nocheck
const axios_1 = tslib_1.__importDefault(require("axios"));
const createAxiosInstance = (useUrl) => {
    const baseURL = useUrl === 'fileServer' ? process.env.NEXT_PUBLIC_FILE_SERVER_URL : process.env.NEXT_PUBLIC_API_SERVER_URL;
    const instance = axios_1.default.create({
        baseURL,
    });
    instance.interceptors.request.use((config) => {
        if (typeof window !== 'undefined') {
            const jwt = localStorage.getItem('wt');
            if (jwt) {
                config.headers.Authorization = `Bearer ${jwt}`;
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return instance;
};
// Default AxiosInstance
const AxiosInstance = createAxiosInstance();
// Function to get AxiosInstance with custom base URL
const getAxiosInstance = (useUrl) => {
    if (useUrl) {
        return createAxiosInstance(useUrl);
    }
    return AxiosInstance;
};
exports.getAxiosInstance = getAxiosInstance;
exports.default = AxiosInstance;
//# sourceMappingURL=AxiosInstance.js.map