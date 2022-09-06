"use strict";
//clientGetPosts
// import postSchema from '../../../models/postSchema'
// import metaSchema from '../../../models/metaSchema'
// import settingSchema from '../../../models/settings/settingSchema'
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var searchKeywordSchema_1 = tslib_1.__importDefault(require("../../../models/searchKeywordSchema"));
var _clientQueryGeneratorForGettingPosts_1 = tslib_1.__importDefault(require("../_variables/_clientQueryGeneratorForGettingPosts"));
var mongoIdValidator_1 = tslib_1.__importDefault(require("../../../../_variables/serverUtil/mongoIdValidator"));
//import postSchema from '@expressServer/models/postSchema'
// const postSchema = require('../../../models/postSchema');
// const metaSchema = require('../../../models/metaSchema');
// const searchKeywordSchema = require('../../../models/searchKeywordSchema');
// const _clientQueryGeneratorForGettingPosts = require('../_variables/_clientQueryGeneratorForGettingPosts');
// const mongoIdValidator = require('../../../util/mongoIdValidator');
// const settingSchema = require("../../../models/settings/settingSchema");
// const {Worker, isMainThread,parentPort} = require('worker_threads');
// import path from 'path';
// import getPostsWorker from '../../../workers/ApiWorkers/clientRequests/posts/getPosts';
var saveSearchedKeyword = function (keyword, count) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!keyword) return [3 /*break*/, 2];
                return [4 /*yield*/, searchKeywordSchema_1.default.findOneAndUpdate({ name: keyword }, { name: keyword, count: count }, { upsert: true }).exec()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var getMetaForGettingPostsRequest = function (meta) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(0, mongoIdValidator_1.default)(meta)) return [3 /*break*/, 2];
                return [4 /*yield*/, metaSchema_1.default.findById(meta).exec()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, metaSchema_1.default.findOne({ name: { $regex: decodeURIComponent(meta), $options: 'i' } })];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [2 /*return*/, {}];
            case 6: return [2 /*return*/];
        }
    });
}); };
var clientGetPosts = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var identitySetting, meta, _a, findingPostsOptions, totalCount, posts, err_2;
    var _b, _c, _d, _e, _f, _g, _h;
    return tslib_1.__generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 9, , 10]);
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'identity' }).exec()];
            case 1:
                identitySetting = _j.sent();
                if (!(((_b = req.query) === null || _b === void 0 ? void 0 : _b.metaId) || ((_c = req.query) === null || _c === void 0 ? void 0 : _c.selectedMetaForPosts))) return [3 /*break*/, 3];
                return [4 /*yield*/, getMetaForGettingPostsRequest(((_d = req.query) === null || _d === void 0 ? void 0 : _d.metaId) || ((_e = req.query) === null || _e === void 0 ? void 0 : _e.selectedMetaForPosts))];
            case 2:
                _a = (_j.sent()) || {};
                return [3 /*break*/, 4];
            case 3:
                _a = {};
                _j.label = 4;
            case 4:
                meta = _a;
                findingPostsOptions = (0, _clientQueryGeneratorForGettingPosts_1.default)(tslib_1.__assign(tslib_1.__assign({}, req.query), { 
                    //@ts-ignore
                    size: req.query.size === 'undefined' ? (_f = identitySetting === null || identitySetting === void 0 ? void 0 : identitySetting.data) === null || _f === void 0 ? void 0 : _f.postsCountPerPage : parseInt(req.query.size), page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page) }), meta === null || meta === void 0 ? void 0 : meta._id);
                return [4 /*yield*/, postSchema_1.default.countDocuments(findingPostsOptions.findPostsQueries).exec()];
            case 5:
                totalCount = _j.sent();
                return [4 /*yield*/, postSchema_1.default.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields, {
                        skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                        limit: findingPostsOptions.size,
                        sort: findingPostsOptions.sortQuery
                    })
                        // .populate(populateMeta)
                        .exec()];
            case 6:
                posts = _j.sent();
                if (!((_g = req.query) === null || _g === void 0 ? void 0 : _g.keyword)) return [3 /*break*/, 8];
                return [4 /*yield*/, saveSearchedKeyword((_h = req.query) === null || _h === void 0 ? void 0 : _h.keyword, totalCount)];
            case 7:
                _j.sent();
                _j.label = 8;
            case 8:
                res.json({ posts: posts, totalCount: totalCount, meta: meta });
                return [3 /*break*/, 10];
            case 9:
                err_2 = _j.sent();
                console.log(err_2.stack);
                return [2 /*return*/, res.status(404).json({
                        message: 'Server Error'
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetPosts;
// const meta = req.query?.metaId || req.query?.selectedMetaForPosts ? await metaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}
//const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
// const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
//skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),
// const identitySetting = await settingSchema.findOne({type:'identity'}).exec()
//
// const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
//     await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}
//
// const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
//     ...req.query,
//     size: req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size),
//     page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
// },meta?._id)
//
// // console.log(JSON.stringify(findingPostsOptions, null, '\t'))
// const populateMeta = [
//     {path: 'actors', select: {'name': 1, 'type': 1}},
//     {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
//     {path: 'tags', select: {'name': 1, 'type': 1}}
// ]
//
// const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();
// const posts = await postSchema.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
//     {
//         skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
//         limit: findingPostsOptions.size,
//         sort: findingPostsOptions.sortQuery
//     })
//     .populate(populateMeta)
//     .exec()
//
// if (req.query?.keyword) {
//     await saveSearchedKeyword(req.query?.keyword, totalCount)
// }
//
// res.json({posts, totalCount, meta})
// } catch (err) {
//     console.log(err.stack)
//     return res.status(404).json({
//         message: 'Server Error'
//     })
// }
//# sourceMappingURL=clientGetPosts.js.map