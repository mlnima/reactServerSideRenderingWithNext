"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdatePost = exports.dashboardAPIRequestScrapYoutubeInfo = exports.dashboardAPIRequestPostDataScrappers = exports.dashboardAPIRequestGetPosts = exports.dashboardAPIRequestGetPost = exports.dashboardAPIRequestGeneratePermaLinkForPosts = exports.dashboardAPIRequestExportPosts = exports.dashboardAPIRequestCreateNewPost = exports.dashboardAPIRequestCheckAndRemoveDeletedVideos = exports.dashboardAPIRequestBulkActionOnPosts = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestBulkActionOnPosts = (ids, status) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/postsBulkAction', { ids, status, token: localStorage.wt });
});
exports.dashboardAPIRequestBulkActionOnPosts = dashboardAPIRequestBulkActionOnPosts;
const dashboardAPIRequestCheckAndRemoveDeletedVideos = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`);
});
exports.dashboardAPIRequestCheckAndRemoveDeletedVideos = dashboardAPIRequestCheckAndRemoveDeletedVideos;
const dashboardAPIRequestCreateNewPost = (postData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/createNewPost', { postData, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateNewPost = dashboardAPIRequestCreateNewPost;
const dashboardAPIRequestExportPosts = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/exportPosts', { data, token: localStorage.wt });
});
exports.dashboardAPIRequestExportPosts = dashboardAPIRequestExportPosts;
const dashboardAPIRequestGeneratePermaLinkForPosts = (type) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/generatePermaLinkForPosts?token=${localStorage.wt}${type ? `&type=${type}` : ''}`);
});
exports.dashboardAPIRequestGeneratePermaLinkForPosts = dashboardAPIRequestGeneratePermaLinkForPosts;
const dashboardAPIRequestGetPost = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetPost = dashboardAPIRequestGetPost;
const dashboardAPIRequestGetPosts = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetPosts = dashboardAPIRequestGetPosts;
const dashboardAPIRequestPostDataScrappers = (urlToScrap) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/postDataScrappers', { urlToScrap, token: localStorage.wt });
});
exports.dashboardAPIRequestPostDataScrappers = dashboardAPIRequestPostDataScrappers;
const dashboardAPIRequestScrapYoutubeInfo = (url) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/scrapper/scrapYoutubeInfo', { url, token: localStorage.wt });
});
exports.dashboardAPIRequestScrapYoutubeInfo = dashboardAPIRequestScrapYoutubeInfo;
const dashboardAPIRequestUpdatePost = (postData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/posts/updatePost', { postData, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdatePost = dashboardAPIRequestUpdatePost;
//# sourceMappingURL=dashboardPosts.js.map