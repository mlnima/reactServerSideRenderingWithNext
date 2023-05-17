"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdateChatroom = exports.dashboardAPIRequestGetChatrooms = exports.dashboardAPIRequestGetChatroom = exports.dashboardAPIRequestDeleteChatroom = exports.dashboardAPIRequestCreateChatroom = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestCreateChatroom = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/admin/chatrooms/createChatroom`, {
        data,
        token: localStorage.wt
    });
});
exports.dashboardAPIRequestCreateChatroom = dashboardAPIRequestCreateChatroom;
const dashboardAPIRequestDeleteChatroom = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.delete(`/api/admin/chatrooms/deleteChatroom?_id=${_id}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestDeleteChatroom = dashboardAPIRequestDeleteChatroom;
const dashboardAPIRequestGetChatroom = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/chatrooms/getChatroom?_id=${_id}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetChatroom = dashboardAPIRequestGetChatroom;
const dashboardAPIRequestGetChatrooms = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/chatrooms/getChatrooms?token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetChatrooms = dashboardAPIRequestGetChatrooms;
const dashboardAPIRequestUpdateChatroom = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.patch(`/api/admin/chatrooms/updateChatroom`, { data, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateChatroom = dashboardAPIRequestUpdateChatroom;
//# sourceMappingURL=dashboardChatrooms.js.map