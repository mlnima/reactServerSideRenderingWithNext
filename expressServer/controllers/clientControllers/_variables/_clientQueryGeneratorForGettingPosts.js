"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postFieldRequestForCards_1 = tslib_1.__importDefault(require("../../../../_dataStructures/postFieldRequestForCards"));
var _clientQueryGeneratorForGettingPosts = function (data, metaId) {
    var _a, _b, _c;
    var excludeContent = (process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : []).map(function (excludeWord) {
        var expression = ".*".concat(excludeWord, ".*");
        return { 'videoEmbedCode': { $not: new RegExp(expression, "g") } };
    });
    var excludeQuery = process.env.EXCLUDE_POSTS_SOURCE ? [{ $or: excludeContent }] : [];
    var size = parseInt((data === null || data === void 0 ? void 0 : data.size) || (data === null || data === void 0 ? void 0 : data.count) || '20') || 20;
    var sort = (data === null || data === void 0 ? void 0 : data.sort) || (data === null || data === void 0 ? void 0 : data.sortBy);
    var metaQuery = metaId ? [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
    var keyword = data.keyword ? decodeURIComponent(data.keyword) : '';
    var searchQuery = !keyword ? [] :
        !data.lang || data.lang === 'default' ?
            [{
                    $or: [
                        { title: new RegExp(keyword, 'i') },
                        { description: new RegExp(keyword, 'i') }
                    ]
                }] :
            [{
                    $or: [
                        { title: new RegExp(keyword, 'i') },
                        { description: new RegExp(keyword, 'i') },
                        (_a = {}, _a["translations.".concat(data.lang, ".title")] = new RegExp(keyword, 'i'), _a),
                        (_b = {}, _b["translations.".concat(data.lang, ".description")] = new RegExp(keyword, 'i'), _b),
                    ]
                }];
    var postTypeQuery = (data === null || data === void 0 ? void 0 : data.postType) ? [{ postType: data.postType }] : [];
    var authorQuery = data.author ? [{ author: data.author }] : [];
    var sortQuery = sort === 'createdAt' || sort === 'random' || !sort ? {} :
        sort === 'updatedAt' ? { updatedAt: -1, createdAt: -1 } : (_c = {}, _c[sort] = -1, _c);
    return {
        findPostsQueries: {
            $and: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(postTypeQuery), false), tslib_1.__read(authorQuery), false), tslib_1.__read(excludeQuery), false), tslib_1.__read(searchQuery), false), tslib_1.__read(metaQuery), false), [
                { status: 'published' }
            ], false)
        },
        size: size > 1000 ? 1000 : size,
        page: (data === null || data === void 0 ? void 0 : data.page) ? parseInt(data === null || data === void 0 ? void 0 : data.page) : 1,
        selectedFields: postFieldRequestForCards_1.default,
        sortQuery: sortQuery
    };
};
exports.default = _clientQueryGeneratorForGettingPosts;
// const excludesPostFromSources = process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : [];
//
// postTypeQuery: data?.postType ? {postType: data.postType} : {},
// statusQuery: {status: 'published'},
// authorQuery: data.author ? data.author === 'all' ? {} : {author: data.author} : {},
// excludeQuery: process.env.EXCLUDE_POSTS_SOURCE ? excludeQuery : {},
// metaQuery,
// searchQuery,
// const meta = metaId
//|| data.metaId || data?.selectedMetaForPosts;
// const validateId = meta ? isValidObjectId(meta) && meta?.match(/^[0-9a-fA-F]{24}$/) : false;
//const metaQuery = validateId ? [{$or: [{categories: {$in: meta}}, {tags: {$in: meta}}, {actors: {$in: meta}}]}] : [];.
//{name:{$regex:decodeURIComponent(meta),$options:'i'}}
// const searchQuery = !keyword ? [] :
//       !data.lang || data.lang === 'default' ? [{$or: [{title: new RegExp(keyword, 'i')}]}] :
//       [{$or: [{title: new RegExp(keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(keyword, 'i')}]}]
//# sourceMappingURL=_clientQueryGeneratorForGettingPosts.js.map