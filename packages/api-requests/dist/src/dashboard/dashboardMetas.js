"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdateMeta = exports.dashboardAPIRequestSetMetaThumbnailsAndCount = exports.dashboardAPIRequestGetMetas = exports.dashboardAPIRequestGetMeta = exports.dashboardAPIRequestDeleteMeta = exports.dashboardAPIRequestBulkActionOnMetas = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestBulkActionOnMetas = (type, status, ids) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/bulkAction', { type, status, ids, token: localStorage.wt });
});
exports.dashboardAPIRequestBulkActionOnMetas = dashboardAPIRequestBulkActionOnMetas;
const dashboardAPIRequestDeleteMeta = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/deleteMeta', { _id, token: localStorage.wt });
});
exports.dashboardAPIRequestDeleteMeta = dashboardAPIRequestDeleteMeta;
const dashboardAPIRequestGetMeta = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetMeta = dashboardAPIRequestGetMeta;
const dashboardAPIRequestGetMetas = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/getMetas${queriesData}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetMetas = dashboardAPIRequestGetMetas;
const dashboardAPIRequestSetMetaThumbnailsAndCount = (type) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`);
});
exports.dashboardAPIRequestSetMetaThumbnailsAndCount = dashboardAPIRequestSetMetaThumbnailsAndCount;
const dashboardAPIRequestUpdateMeta = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/updateMeta', { data, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateMeta = dashboardAPIRequestUpdateMeta;
//# sourceMappingURL=dashboardMetas.js.map