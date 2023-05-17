"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestDeleteComments = exports.dashboardAPIRequestGetComments = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestGetComments = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/getComments${queriesData}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetComments = dashboardAPIRequestGetComments;
const dashboardAPIRequestDeleteComments = (commentsIds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/admin/posts/deleteComments`, {
        commentsIds: commentsIds,
        token: localStorage.wt
    });
});
exports.dashboardAPIRequestDeleteComments = dashboardAPIRequestDeleteComments;
//# sourceMappingURL=dashboardComments.js.map