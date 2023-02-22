"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var custom_util_1 = require("custom-util");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var data_structures_1 = require("data-structures");
var data_structures_2 = require("data-structures");
var postTypeValidator = function (currentPostType) {
    //@ts-ignore
    return currentPostType ? data_structures_2.postTypes.includes(currentPostType) : false;
};
var getPosts = function (currentQuery, medaId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sort, postType, isValidMetaId, metaId, lang, author, status, keyword, getPostsData, queries;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sort = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort) ? { sort: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort } : { sort: 'updatedAt' };
                postType = postTypeValidator(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.postType) ? { postType: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.postType } : {};
                isValidMetaId = !!medaId ? (0, custom_util_1.mongoIdValidator)(medaId) : false;
                metaId = !!medaId && isValidMetaId ? { metaId: medaId } :
                    medaId && !isValidMetaId ? { metaId: encodeURIComponent(medaId) } : {};
                lang = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang) ? { lang: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang } : {};
                author = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.author) ? { author: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.author } : {};
                status = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.status) ? { status: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.status } : { status: 'published' };
                keyword = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword) ? { keyword: encodeURIComponent((0, custom_util_1.queryUniquer)(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword)) } : {};
                getPostsData = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ size: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.size, page: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page }, status), author), lang), metaId), postType), sort), keyword);
                queries = new URLSearchParams(getPostsData).toString();
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/posts/clientGetPosts?".concat(queries, "&").concat(data_structures_1.postFieldRequestForCards.map(function (f) { return 'field=' + f; }).join('&')))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getPosts;
