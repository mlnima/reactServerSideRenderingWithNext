"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdateUser = exports.dashboardAPIRequestGetUsers = exports.dashboardAPIRequestGetUser = exports.dashboardAPIRequestGenerateNewAPIKey = exports.dashboardAPIRequestDeleteUser = exports.dashboardAPIRequestChangePassword = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestChangePassword = (oldPass, newPass, newPass2) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/v1/users/resetPassword', { oldPass, newPass, newPass2, token: localStorage.wt });
});
exports.dashboardAPIRequestChangePassword = dashboardAPIRequestChangePassword;
const dashboardAPIRequestDeleteUser = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/users/deleteUser', { id, token: localStorage.wt });
});
exports.dashboardAPIRequestDeleteUser = dashboardAPIRequestDeleteUser;
const dashboardAPIRequestGenerateNewAPIKey = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/users/newAPIKey', { token: localStorage.wt });
});
exports.dashboardAPIRequestGenerateNewAPIKey = dashboardAPIRequestGenerateNewAPIKey;
const dashboardAPIRequestGetUser = ({ _id, username, fields }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';
    return yield AxiosInstance_1.default.get(`/api/admin/users/getUser?${_id ? `&_id=${_id}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetUser = dashboardAPIRequestGetUser;
const dashboardAPIRequestGetUsers = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/users/getUsers${queriesData}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetUsers = dashboardAPIRequestGetUsers;
const dashboardAPIRequestUpdateUser = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/v1/users/updateUser', { data, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateUser = dashboardAPIRequestUpdateUser;
//# sourceMappingURL=dashboardUsers.js.map