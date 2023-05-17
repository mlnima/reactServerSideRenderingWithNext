"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestGetTags = exports.clientAPIRequestResetMetaImage = exports.clientAPIRequestGetMetaSuggestion = exports.clientAPIRequestGetMetas = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const custom_util_1 = require("custom-util");
const clientAPIRequestGetMetas = (currentQuery, metaType) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const sort = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort) ? { sort: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort } : {};
    const keyword = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword) ? { keyword: encodeURIComponent((0, custom_util_1.queryUniquer)(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword)) } : {};
    const startWith = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.startWith) ? { startWith: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.startWith } : {};
    const size = currentQuery.size ? { size: currentQuery.size } : {};
    const page = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page) ? { page: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page } : {};
    const lang = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang) ? { lang: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang } : {};
    const dataForGettingMeta = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ metaType }, lang), page), size), startWith), sort), keyword);
    return yield AxiosInstance_1.default.get(`/api/v1/posts/getMetas?${new URLSearchParams(dataForGettingMeta).toString()}`);
});
exports.clientAPIRequestGetMetas = clientAPIRequestGetMetas;
const clientAPIRequestGetMetaSuggestion = (type, startWith) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/posts/metaSuggestion?metaType=${type}&startWith=${startWith}`);
});
exports.clientAPIRequestGetMetaSuggestion = clientAPIRequestGetMetaSuggestion;
const clientAPIRequestResetMetaImage = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const body = {
        _id,
        token: localStorage.wt
    };
    return yield AxiosInstance_1.default.post('/api/v1/posts/resetMetaImage', body);
});
exports.clientAPIRequestResetMetaImage = clientAPIRequestResetMetaImage;
const clientAPIRequestGetTags = (queryData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const sort = (queryData === null || queryData === void 0 ? void 0 : queryData.sort) ? { sort: queryData === null || queryData === void 0 ? void 0 : queryData.sort } : {};
    const keyword = (queryData === null || queryData === void 0 ? void 0 : queryData.keyword) ? { keyword: encodeURIComponent(queryData === null || queryData === void 0 ? void 0 : queryData.keyword) } : {};
    const startWith = (queryData === null || queryData === void 0 ? void 0 : queryData.startWith) ? { startWith: queryData === null || queryData === void 0 ? void 0 : queryData.startWith } : {};
    const size = queryData.size ? { size: queryData.size } : {};
    const page = (queryData === null || queryData === void 0 ? void 0 : queryData.page) ? { page: queryData === null || queryData === void 0 ? void 0 : queryData.page } : {};
    const lang = (queryData === null || queryData === void 0 ? void 0 : queryData.lang) ? { lang: queryData === null || queryData === void 0 ? void 0 : queryData.lang } : {};
    const dataForGettingMeta = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ metaType: 'tags' }, lang), page), size), startWith), sort), keyword);
    const queries = new URLSearchParams(dataForGettingMeta).toString();
    return yield AxiosInstance_1.default.get(`/api/v1/posts/tags?${queries}`);
});
exports.clientAPIRequestGetTags = clientAPIRequestGetTags;
//# sourceMappingURL=clientMetas.js.map