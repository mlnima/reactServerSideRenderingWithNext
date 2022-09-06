"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose_1 = require("mongoose");
var _adminQueryGeneratorForGettingPosts = function (data) {
    var _a, _b;
    var excludeContent = (process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : []).map(function (excludeWord) {
        var expression = ".*".concat(excludeWord, ".*");
        return { 'videoEmbedCode': { $not: new RegExp(expression, "g") } };
    });
    var excludeQuery = process.env.EXCLUDE_POSTS_SOURCE ? [{ $or: excludeContent }] : [];
    var size = data === null || data === void 0 ? void 0 : data.size;
    var sort = (data === null || data === void 0 ? void 0 : data.sort) || (data === null || data === void 0 ? void 0 : data.sortBy);
    var meta = data.metaId || (data === null || data === void 0 ? void 0 : data.selectedMetaForPosts);
    var validateId = meta ? (0, mongoose_1.isValidObjectId)(meta) && (meta === null || meta === void 0 ? void 0 : meta.match(/^[0-9a-fA-F]{24}$/)) : false;
    var metaQuery = validateId ? [{ $or: [{ categories: { $in: meta } }, { tags: { $in: meta } }, { actors: { $in: meta } }] }] : [];
    var keyword = data.keyword ? decodeURIComponent(data.keyword) : '';
    var searchQuery = !keyword ? [] :
        !data.lang || data.lang === 'default' ? [{ $or: [{ title: new RegExp(keyword, 'i') }] }] :
            [{ $or: [{ title: new RegExp(keyword, 'i') }, (_a = {}, _a["translations.".concat(data.lang, ".title")] = new RegExp(keyword, 'i'), _a)] }];
    var sortQuery = sort === 'createdAt' || sort === 'random' || !sort ? {} :
        sort === 'updatedAt' ? { updatedAt: -1, createdAt: -1 } : (_b = {}, _b[sort] = -1, _b);
    var statusQuery = (data === null || data === void 0 ? void 0 : data.status) ?
        (data === null || data === void 0 ? void 0 : data.status) === 'all' ? [{ status: { $ne: 'trash' } }] : [{ status: data.status }]
        : [{ status: 'published' }];
    var postTypeQuery = (data === null || data === void 0 ? void 0 : data.postType) ? [{ postType: data.postType }] : [];
    var authorQuery = data.author ? [{ author: data.author }] : [];
    return {
        findPostsQueries: { $and: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(postTypeQuery), false), tslib_1.__read(authorQuery), false), tslib_1.__read(excludeQuery), false), tslib_1.__read(searchQuery), false), tslib_1.__read(metaQuery), false), tslib_1.__read(statusQuery), false)
        },
        size: size > 1000 ? 1000 : size,
        page: (data === null || data === void 0 ? void 0 : data.page) ? parseInt(data === null || data === void 0 ? void 0 : data.page) : 1,
        selectedFields: (data === null || data === void 0 ? void 0 : data.field) || [],
        sortQuery: sortQuery,
    };
};
exports.default = _adminQueryGeneratorForGettingPosts;
//# sourceMappingURL=_adminQueryGeneratorForGettingPosts.js.map