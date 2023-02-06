"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getTags = function (queryData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sort, keyword, startWith, size, page, lang, dataForGettingMeta, queries;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sort = (queryData === null || queryData === void 0 ? void 0 : queryData.sort) ? { sort: queryData === null || queryData === void 0 ? void 0 : queryData.sort } : {};
                keyword = (queryData === null || queryData === void 0 ? void 0 : queryData.keyword) ? { keyword: encodeURIComponent(queryData === null || queryData === void 0 ? void 0 : queryData.keyword) } : {};
                startWith = (queryData === null || queryData === void 0 ? void 0 : queryData.startWith) ? { startWith: queryData === null || queryData === void 0 ? void 0 : queryData.startWith } : {};
                size = queryData.size ? { size: queryData.size } : {};
                page = (queryData === null || queryData === void 0 ? void 0 : queryData.page) ? { page: queryData === null || queryData === void 0 ? void 0 : queryData.page } : {};
                lang = (queryData === null || queryData === void 0 ? void 0 : queryData.lang) ? { lang: queryData === null || queryData === void 0 ? void 0 : queryData.lang } : {};
                dataForGettingMeta = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ metaType: 'tags' }, lang), page), size), startWith), sort), keyword);
                queries = new URLSearchParams(dataForGettingMeta).toString();
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/posts/tags?".concat(queries))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getTags;
