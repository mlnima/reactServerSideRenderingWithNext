"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestGetChatroom = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestGetChatroom = (identifier) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/chatrooms/getChatroom?identifier=${identifier}`);
});
exports.clientAPIRequestGetChatroom = clientAPIRequestGetChatroom;
//# sourceMappingURL=clientChatrooms.js.map