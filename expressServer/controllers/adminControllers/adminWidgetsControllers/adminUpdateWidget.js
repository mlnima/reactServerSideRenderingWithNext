"use strict";
// const widgetSchema = require('../../../models/widgetSchema');
// const metaSchema = require('../../../models/metaSchema');
// const postSchema = require('../../../models/postSchema');
// const _clientQueryGeneratorForGettingPosts = require('../../clientControllers/_variables/_clientQueryGeneratorForGettingPosts')
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateWidget = exports.updatePostWidgetData = void 0;
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var _clientQueryGeneratorForGettingPosts_1 = tslib_1.__importDefault(require("../../clientControllers/_variables/_clientQueryGeneratorForGettingPosts"));
var updatePostWidgetData = function (widgetData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var findingPostsOptions, totalCount, posts, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!widgetData) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                findingPostsOptions = (0, _clientQueryGeneratorForGettingPosts_1.default)(widgetData, widgetData === null || widgetData === void 0 ? void 0 : widgetData.selectedMetaForPosts);
                return [4 /*yield*/, postSchema_1.default.countDocuments(findingPostsOptions.findPostsQueries).exec()];
            case 2:
                totalCount = _a.sent();
                return [4 /*yield*/, postSchema_1.default.find(findingPostsOptions.findPostsQueries, ['_id'], {
                        skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                        limit: findingPostsOptions.size,
                        sort: findingPostsOptions.sortQuery
                    }).exec()];
            case 3:
                posts = _a.sent();
                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, widgetData), { uniqueData: tslib_1.__assign(tslib_1.__assign({}, ((widgetData === null || widgetData === void 0 ? void 0 : widgetData.uniqueData) || {})), { posts: posts.map(function (post) { return post === null || post === void 0 ? void 0 : post._id; }), totalCount: totalCount }) })];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, null];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, null];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updatePostWidgetData = updatePostWidgetData;
var updateMetaWidgetData = function (widgetData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sortQuery, countQuery, typeQuery, statusQuery, totalCount, metas, err_2;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                sortQuery = widgetData.sort === 'createdAt' || !widgetData.sort ?
                    { 'rank': 1, 'likes': -1, 'views': -1, 'count': -1, 'updatedAt': -1, 'createdAt': -1 } :
                    widgetData.sort === 'rank' ? { 'rank': 1 } : (_a = {}, _a[widgetData.sort] = -1, _a);
                countQuery = { count: { $gt: 0 } };
                typeQuery = { type: (widgetData === null || widgetData === void 0 ? void 0 : widgetData.metaType) || 'categories' };
                statusQuery = { status: 'published' };
                return [4 /*yield*/, metaSchema_1.default.countDocuments({ $and: [countQuery, typeQuery, statusQuery] }).exec()];
            case 1:
                totalCount = _b.sent();
                return [4 /*yield*/, metaSchema_1.default.find({ $and: [countQuery, typeQuery, statusQuery] }, {}, {
                        sort: sortQuery,
                        limit: (widgetData === null || widgetData === void 0 ? void 0 : widgetData.count) || 20
                    }).select('_id').exec()];
            case 2:
                metas = _b.sent();
                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, widgetData), { uniqueData: {
                            metaData: metas.map(function (meta) { return meta._id; }),
                            totalCount: totalCount
                        } })];
            case 3:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var adminUpdateWidget = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var widgetData, widgetId;
    var _a, _b, _c, _d, _e;
    return tslib_1.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                widgetData = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.widgetData) === null || _b === void 0 ? void 0 : _b.data;
                widgetId = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.widgetData) === null || _d === void 0 ? void 0 : _d._id;
                if (!(widgetData.type === 'posts' || widgetData.type === 'postsSlider' || widgetData.type === 'postsSwiper')) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.updatePostWidgetData)(widgetData).then(function (updatedWidget) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!updatedWidget) return [3 /*break*/, 2];
                                    return [4 /*yield*/, widgetSchema_1.default.findByIdAndUpdate(widgetId, { data: updatedWidget }, { new: true }).exec().then(function (updatedWidget) {
                                            res.json({ updatedWidget: updatedWidget });
                                        }).catch(function (err) {
                                            console.log(err);
                                            res.status(503).json({ message: 'something went wrong please try again later' });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    res.status(503).json({ message: 'something went wrong please try again later' });
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _f.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!(widgetData.type === 'meta' || widgetData.type === 'metaWithImage')) return [3 /*break*/, 4];
                return [4 /*yield*/, updateMetaWidgetData(widgetData).then(function (updatedWidget) {
                        if (updatedWidget) {
                            widgetSchema_1.default.findByIdAndUpdate(widgetId, { data: updatedWidget }, { new: true }).exec().then(function (updatedWidget) {
                                res.json({ updatedWidget: updatedWidget });
                            }).catch(function (err) {
                                console.log(err);
                                res.status(503).json({ message: 'something went wrong please try again later' });
                            });
                        }
                        else {
                            res.status(503).json({ message: 'something went wrong please try again later' });
                        }
                    })];
            case 3:
                _f.sent();
                return [3 /*break*/, 5];
            case 4:
                widgetSchema_1.default.findByIdAndUpdate((_e = req.body) === null || _e === void 0 ? void 0 : _e.widgetData._id, { data: widgetData }, { new: true }).exec().then(function (updatedWidget) {
                    res.json({ updatedWidget: updatedWidget });
                }).catch(function (err) {
                    console.log(err);
                });
                _f.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adminUpdateWidget = adminUpdateWidget;
// module.exports = {adminUpdateWidget, updatePostWidgetData}
// const countQuery = {count: {$gt: 0}}
// const typeQuery = {type: widgetData.metaType}
// const statusQuery = {status: 'published'}
// let totalCount = await metaSchema.countDocuments({$and: [countQuery, typeQuery, statusQuery]}).exec()
//
// const metas = widgetData.metaType ? await metaSchema.find(
//     {$and: [countQuery, typeQuery, statusQuery]},
//     {},
//     {
//         sort: widgetData.sort === 'createdAt' || !widgetData.sort ?
//             {'rank': 1, 'likes': -1, 'views': -1, 'count': -1, 'updatedAt': -1, 'createdAt': -1} :
//             widgetData.sort === 'rank' ? {'rank': 1} : {[widgetData.sort]: -1},
//     }
// ).select('_id').limit(parseInt(widgetData?.count || 20)).sort(sortMethod).exec() : []
// const dateForUpdateWidget = {
//     ...widgetData,
//     uniqueData: {
//         metaData: metas.map(meta => meta._id),
//         totalCount
//     }
// }
// widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: dateForUpdateWidget}, {new: true}).exec().then(updatedWidget => {
//     res.json({updatedWidget})
// }).catch(err => {
//     console.log(err)
// })
//# sourceMappingURL=adminUpdateWidget.js.map