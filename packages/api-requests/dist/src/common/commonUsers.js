"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonAPIRequestLoginUser = exports.commonAPIRequestGetSignedInUserData = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const commonAPIRequestGetSignedInUserData = (fields) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/getSignedInUserData`, { fields, token: localStorage.wt });
});
exports.commonAPIRequestGetSignedInUserData = commonAPIRequestGetSignedInUserData;
const commonAPIRequestLoginUser = (username, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/login`, { username, password, token: localStorage.wt });
});
exports.commonAPIRequestLoginUser = commonAPIRequestLoginUser;
//# sourceMappingURL=commonUsers.js.map