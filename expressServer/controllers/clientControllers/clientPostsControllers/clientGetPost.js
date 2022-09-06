"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var mongoIdValidator_1 = tslib_1.__importDefault(require("../../../../_variables/serverUtil/mongoIdValidator"));
var arraySortRandom_1 = tslib_1.__importDefault(require("../../../../_variables/util/arraySortRandom"));
var defaultFieldForPosts = [
    'title',
    'mainThumbnail',
    'quality',
    'likes',
    'disLikes',
    'views',
    'duration',
    'postType',
    'price',
    'translations',
    'videoTrailerUrl',
    'rating',
    'redirectLink',
    'updateAt',
    'createdAt',
];
var populateMeta = [
    { path: 'actors', select: { 'name': 1, 'type': 1 } },
    { path: 'categories', select: { 'name': 1, 'type': 1, 'imageUrl': 1 } },
    { path: 'tags', select: { 'name': 1, 'type': 1 } }
];
var getRelatedPosts = function (relatedByType, relatedIds, currentPostId, postType) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sortOrder, findRelatedPostsQuery, relatedPosts, e_1;
    var _a, _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                sortOrder = (0, arraySortRandom_1.default)(['likes', 'views', 'updateAt', 'createdAt']).reduce(function (final, current) {
                    final[current] = 1;
                    return final;
                }, {});
                findRelatedPostsQuery = {
                    $and: [
                        (_a = {}, _a[relatedByType] = { $in: relatedIds }, _a),
                        { status: 'published' },
                        { _id: { $ne: currentPostId } },
                        { postType: postType }
                    ]
                };
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postSchema_1.default.find(findRelatedPostsQuery, defaultFieldForPosts, { sort: sortOrder }).populate(populateMeta).limit(10).sort('-updatedAt').exec()];
            case 2:
                relatedPosts = _d.sent();
                return [2 /*return*/, (_b = {}, _b["".concat(relatedByType, "RelatedPosts")] = relatedPosts, _b)];
            case 3:
                e_1 = _d.sent();
                return [2 /*return*/, (_c = {}, _c["".concat(relatedByType, "RelatedPosts")] = [], _c)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var clientGetPost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var hasId, decodeTitle, findQuery, post, _a, _b, _c, _d, _e, err_1;
    var _f;
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return tslib_1.__generator(this, function (_s) {
        switch (_s.label) {
            case 0:
                _s.trys.push([0, 9, , 10]);
                hasId = ((_g = req.query) === null || _g === void 0 ? void 0 : _g._id) && (0, mongoIdValidator_1.default)((_h = req.query) === null || _h === void 0 ? void 0 : _h._id);
                decodeTitle = ((_j = req.query) === null || _j === void 0 ? void 0 : _j.title) && decodeURIComponent((_k = req.query) === null || _k === void 0 ? void 0 : _k.title);
                findQuery = hasId ? { _id: req.query._id } :
                    decodeTitle ? { $or: [{ title: decodeTitle }, { permaLink: decodeTitle.replaceAll(' ', '-') }] } : null;
                if (!findQuery) return [3 /*break*/, 7];
                return [4 /*yield*/, postSchema_1.default.findOne(findQuery, '-comments').populate([
                        { path: 'author', select: ['username', 'profileImage', 'role'] },
                        { path: 'categories', select: { 'name': 1, 'type': 1 } },
                        { path: 'tags', select: { 'name': 1, 'type': 1 } },
                        { path: 'actors', select: { 'name': 1, 'type': 1, 'imageUrl': 1 } },
                    ]).exec()];
            case 1:
                post = _s.sent();
                if (!post) return [3 /*break*/, 5];
                _b = (_a = res).json;
                _f = {
                    post: post
                };
                _c = [{}];
                return [4 /*yield*/, getRelatedPosts('actors', 
                    //(post?.actors || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                    (_m = (_l = (0, arraySortRandom_1.default)(((post === null || post === void 0 ? void 0 : post.actors) || []))) === null || _l === void 0 ? void 0 : _l.slice(0, 5)) === null || _m === void 0 ? void 0 : _m.map(function (meta) { return meta._id; }), post._id, post.postType)];
            case 2:
                _d = [tslib_1.__assign.apply(void 0, _c.concat([_s.sent()]))];
                return [4 /*yield*/, getRelatedPosts('categories', 
                    // (post?.categories || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                    (_p = (_o = (0, arraySortRandom_1.default)(((post === null || post === void 0 ? void 0 : post.categories) || []))) === null || _o === void 0 ? void 0 : _o.slice(0, 5)) === null || _p === void 0 ? void 0 : _p.map(function (meta) { return meta._id; }), post._id, post.postType)];
            case 3:
                _e = [tslib_1.__assign.apply(void 0, _d.concat([_s.sent()]))];
                return [4 /*yield*/, getRelatedPosts('tags', 
                    // (post?.tags || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                    (_r = (_q = (0, arraySortRandom_1.default)(((post === null || post === void 0 ? void 0 : post.tags) || [])).reverse()) === null || _q === void 0 ? void 0 : _q.slice(0, 5)) === null || _r === void 0 ? void 0 : _r.map(function (meta) { return meta._id; }), post._id, post.postType)];
            case 4:
                _b.apply(_a, [(_f.relatedPosts = tslib_1.__assign.apply(void 0, _e.concat([_s.sent()])),
                        _f.error = false,
                        _f)]);
                return [3 /*break*/, 6];
            case 5:
                // console.error('we didnt found')
                res.status(404).json({ message: 'not found' });
                _s.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(404).json({ message: 'not found' });
                _s.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _s.sent();
                //  console.error(err,'get post error')
                res.status(500).json({ message: 'Something went wrong please try again later' });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetPost;
//(post?.actors || []).filter((meta, index, arr) => index > (post?.actors || []).length - 6)
// ...await getRelatedPosts('actors',(post?.actors || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('categories',(post?.categories || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('tags',(post?.tags || [])?.slice(0,5)?.map(meta=>meta._id)),
//# sourceMappingURL=clientGetPost.js.map