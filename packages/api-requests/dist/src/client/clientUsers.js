"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestUnFollowUser = exports.clientAPIRequestSendPrivateMessage = exports.clientAPIRequestResetPassword = exports.clientAPIRequestRegisterUser = exports.clientAPIRequestGetUsers = exports.clientAPIRequestGetUserPageData = exports.clientAPIRequestGetConversations = exports.clientAPIRequestFollowUser = exports.clientAPIRequestDeleteConversation = exports.clientAPIRequestDeleteChatroomMessage = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestDeleteChatroomMessage = (chatroomId, messageId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.delete(`/api/admin/chatrooms/deleteChatroomMessage?chatroomId=${chatroomId}&messageId=${messageId}&token=${localStorage.wt}`);
});
exports.clientAPIRequestDeleteChatroomMessage = clientAPIRequestDeleteChatroomMessage;
const clientAPIRequestDeleteConversation = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`);
});
exports.clientAPIRequestDeleteConversation = clientAPIRequestDeleteConversation;
const clientAPIRequestFollowUser = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.patch(`/api/v1/users/followUser`, { _id, token: localStorage.wt });
});
exports.clientAPIRequestFollowUser = clientAPIRequestFollowUser;
const clientAPIRequestGetConversations = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/getConversations`, { _id, token: localStorage.wt });
});
exports.clientAPIRequestGetConversations = clientAPIRequestGetConversations;
//** did not find usage possibly socket server handle it
// export const getPrivateMessages = async ({senderId, receiverId, amount,skip}: {
//     senderId: string,
//     receiverId: string,
//     amount?: number,
//     skip?: number
// }): Promise<void> => {
//
//     const token = localStorage.getItem("wt");
//
//     return await AxiosInstance.get(`/api/v1/users/getPrivateMessages`, {
//         params: {
//             senderId,
//             receiverId,
//             amount,
//             skip
//         },
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };
//** did not find usage possibly socket server handle it
// export const getStartConversation = async (_id)=>{
//     return await AxiosInstance.post(`/api/v1/users/getStartConversation`, {_id,token: localStorage.wt})
// }
//
// export const getUser = async ({ _id, username, fields }: {
//     _id?: string;
//     username?: string;
//     fields?: string[];
// }) => {
//     const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';
//
//     return await AxiosInstance.get(
//         `/api/v1/users/getUser?${_id ? `&_id=${_id}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
//     );
// };
const clientAPIRequestGetUserPageData = ({ userWhoRequestIt, username, fields }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';
    return yield AxiosInstance_1.default.get(`/api/v1/users/getUserPageData?${userWhoRequestIt ? `userWhoRequestIt=${userWhoRequestIt}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`);
});
exports.clientAPIRequestGetUserPageData = clientAPIRequestGetUserPageData;
const clientAPIRequestGetUsers = (usersList) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userListQuery = usersList.map((user) => `_id=${user._id}`).join('&');
    return yield AxiosInstance_1.default.get(`/api/v1/users/getUsers?${userListQuery}&token=${localStorage.wt}`);
});
exports.clientAPIRequestGetUsers = clientAPIRequestGetUsers;
const clientAPIRequestRegisterUser = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/register`, data);
});
exports.clientAPIRequestRegisterUser = clientAPIRequestRegisterUser;
const clientAPIRequestResetPassword = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/resetPassword`, { data, token: localStorage.wt });
});
exports.clientAPIRequestResetPassword = clientAPIRequestResetPassword;
//** it is unused and should be removed
const clientAPIRequestSendPrivateMessage = (senderId, receiverId, content) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/users/sendPrivateMessage`, {
        senderId,
        receiverId,
        content,
        token: localStorage.wt
    });
});
exports.clientAPIRequestSendPrivateMessage = clientAPIRequestSendPrivateMessage;
const clientAPIRequestUnFollowUser = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.patch(`/api/v1/users/unFollowUser`, { _id, token: localStorage.wt });
});
exports.clientAPIRequestUnFollowUser = clientAPIRequestUnFollowUser;
//# sourceMappingURL=clientUsers.js.map