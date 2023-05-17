"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestPostNewComment = exports.clientAPIRequestGetPostComments = exports.clientAPIRequestDeleteCommentByAdmin = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestDeleteCommentByAdmin = (commentsIds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/admin/posts/deleteComments`, {
        commentsIds,
        token: localStorage.wt
    });
});
exports.clientAPIRequestDeleteCommentByAdmin = clientAPIRequestDeleteCommentByAdmin;
const clientAPIRequestGetPostComments = (postId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/posts/getComments?onDocument=${postId}`);
});
exports.clientAPIRequestGetPostComments = clientAPIRequestGetPostComments;
const clientAPIRequestPostNewComment = (commentData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/posts/newComment`, Object.assign({}, commentData));
});
exports.clientAPIRequestPostNewComment = clientAPIRequestPostNewComment;
//# sourceMappingURL=clientComments.js.map