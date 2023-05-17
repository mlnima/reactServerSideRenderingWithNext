"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdatePage = exports.dashboardAPIRequestGetPages = exports.dashboardAPIRequestGetPage = exports.dashboardAPIRequestDeletePage = exports.dashboardAPIRequestCreateNewPage = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestCreateNewPage = (pageData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/pages/createNewPage', { pageData, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateNewPage = dashboardAPIRequestCreateNewPage;
const dashboardAPIRequestDeletePage = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/pages/deleteCustomPage', { id, token: localStorage.wt });
});
exports.dashboardAPIRequestDeletePage = dashboardAPIRequestDeletePage;
const dashboardAPIRequestGetPage = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/pages/getPageData', { _id, token: localStorage.wt });
});
exports.dashboardAPIRequestGetPage = dashboardAPIRequestGetPage;
const dashboardAPIRequestGetPages = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/pages/getPagesData', Object.assign(Object.assign({}, queriesData), { token: localStorage.wt }));
});
exports.dashboardAPIRequestGetPages = dashboardAPIRequestGetPages;
const dashboardAPIRequestUpdatePage = (pageData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/pages/updatePage', { pageData, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdatePage = dashboardAPIRequestUpdatePage;
//# sourceMappingURL=dashbioardPages.js.map