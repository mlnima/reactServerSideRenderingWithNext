"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestStartAConversation = exports.clientAPIRequestLoadOlderMessages = exports.clientAPIRequestGetConversationsList = exports.clientAPIRequestGetAConversation = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestGetAConversation = ({ conversationId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/messenger/getAConversation`, {
        params: { conversationId }
    });
});
exports.clientAPIRequestGetAConversation = clientAPIRequestGetAConversation;
const clientAPIRequestGetConversationsList = ({ limit, skip }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/messenger/getConversationsList`, {
        params: {
            limit,
            skip
        },
    });
});
exports.clientAPIRequestGetConversationsList = clientAPIRequestGetConversationsList;
const clientAPIRequestLoadOlderMessages = ({ limit, skip, conversationId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/messenger/loadOlderMessages`, {
        params: { limit, skip, conversationId }
    });
});
exports.clientAPIRequestLoadOlderMessages = clientAPIRequestLoadOlderMessages;
const clientAPIRequestStartAConversation = ({ users }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/messenger/startAConversation`, {
        users
    });
});
exports.clientAPIRequestStartAConversation = clientAPIRequestStartAConversation;
//# sourceMappingURL=clientMessenger.js.map