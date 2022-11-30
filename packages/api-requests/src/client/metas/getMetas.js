"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var custom_util_1 = require("custom-util");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getMetas = function (currentQuery, metaType) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sort, keyword, startWith, size, page, lang, dataForGettingMeta;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sort = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort) ? { sort: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort } : {};
                keyword = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword) ? { keyword: encodeURIComponent((0, custom_util_1.queryUniquer)(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword)) } : {};
                startWith = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.startWith) ? { startWith: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.startWith } : {};
                size = currentQuery.size ? { size: currentQuery.size } : {};
                page = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page) ? { page: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page } : {};
                lang = (currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang) ? { lang: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang } : {};
                dataForGettingMeta = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ metaType: metaType }, lang), page), size), startWith), sort), keyword);
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/posts/getMetas?".concat(new URLSearchParams(dataForGettingMeta).toString()))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getMetas;
