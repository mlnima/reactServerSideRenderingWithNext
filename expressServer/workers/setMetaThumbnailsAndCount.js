"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var connectToDatabase_1 = tslib_1.__importDefault(require("../_variables/connectToDatabase"));
var worker_threads_1 = require("worker_threads");
var metaSchema_1 = tslib_1.__importDefault(require("../models/metaSchema"));
var postSchema_1 = tslib_1.__importDefault(require("../models/postSchema"));
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
dotenv_1.default.config();
(0, connectToDatabase_1.default)('setMetaThumbnailsAndCount :').finally();
var randomNumberGenerator = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
};
var setMetaThumbnailsAndCount = function (workerData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var excludesPostFromSources, excludeContent, excludeQuery_1, type, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                excludesPostFromSources = process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : [];
                excludeContent = excludesPostFromSources.map(function (excludeWord) {
                    var expression = ".*".concat(excludeWord, ".*");
                    return { 'videoEmbedCode': { $not: new RegExp(expression, "g") } };
                });
                excludeQuery_1 = { $or: excludeContent };
                return [4 /*yield*/, metaSchema_1.default.syncIndexes()];
            case 1:
                _a.sent();
                type = workerData.type ? { type: workerData.type } : {};
                return [4 /*yield*/, metaSchema_1.default.find(type).exec().then(function (metas) { var metas_1, metas_1_1; return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var _loop_1, e_1_1;
                        var e_1, _a;
                        var _b, _c;
                        return tslib_1.__generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 6, 7, 12]);
                                    _loop_1 = function () {
                                        var meta, metaCount, totalSumData, updateData_1, skipDocuments, randomPost;
                                        var _e, _f, _g, _h, _j;
                                        return tslib_1.__generator(this, function (_k) {
                                            switch (_k.label) {
                                                case 0:
                                                    meta = metas_1_1.value;
                                                    return [4 /*yield*/, postSchema_1.default.countDocuments({ $and: [(_e = {}, _e[meta === null || meta === void 0 ? void 0 : meta.type] = { $in: meta === null || meta === void 0 ? void 0 : meta._id }, _e), { status: 'published' }, excludeQuery_1] }).exec()];
                                                case 1:
                                                    metaCount = _k.sent();
                                                    if (!(metaCount > 0 && (meta === null || meta === void 0 ? void 0 : meta._id))) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, postSchema_1.default.aggregate([
                                                            {
                                                                $match: {
                                                                    $and: [
                                                                        { status: "published" },
                                                                        (_f = {}, _f[meta === null || meta === void 0 ? void 0 : meta.type] = { $exists: true }, _f),
                                                                        (_g = {}, _g[meta === null || meta === void 0 ? void 0 : meta.type] = { $in: [new mongoose_1.default.Types.ObjectId(meta._id)] }, _g),
                                                                    ]
                                                                }
                                                            },
                                                            { $project: (_h = { likes: 1, views: 1 }, _h[meta === null || meta === void 0 ? void 0 : meta.type] = 1, _h) },
                                                            {
                                                                $group: {
                                                                    _id: null,
                                                                    likes: { $sum: { $add: ["$likes"] } },
                                                                    views: { $sum: { $add: ["$views"] } }
                                                                }
                                                            }
                                                        ])
                                                        //***************************
                                                    ];
                                                case 2:
                                                    totalSumData = _k.sent();
                                                    updateData_1 = {
                                                        count: metaCount,
                                                        name: meta === null || meta === void 0 ? void 0 : meta.name.toLowerCase(),
                                                        status: 'published',
                                                        likes: ((_b = totalSumData === null || totalSumData === void 0 ? void 0 : totalSumData[0]) === null || _b === void 0 ? void 0 : _b.likes) || 0,
                                                        views: ((_c = totalSumData === null || totalSumData === void 0 ? void 0 : totalSumData[0]) === null || _c === void 0 ? void 0 : _c.views) || 0,
                                                    };
                                                    if (!!(meta === null || meta === void 0 ? void 0 : meta.imageUrlLock)) return [3 /*break*/, 4];
                                                    skipDocuments = randomNumberGenerator(1, 10);
                                                    return [4 /*yield*/, postSchema_1.default.findOne({ $and: [(_j = {}, _j[meta === null || meta === void 0 ? void 0 : meta.type] = meta === null || meta === void 0 ? void 0 : meta._id, _j), { status: 'published' }, excludeQuery_1] }).sort({ updatedAt: -1 }).skip(skipDocuments).exec()];
                                                case 3:
                                                    randomPost = _k.sent();
                                                    if (randomPost === null || randomPost === void 0 ? void 0 : randomPost.mainThumbnail) {
                                                        //@ts-ignore
                                                        updateData_1.imageUrl = randomPost.mainThumbnail;
                                                    }
                                                    _k.label = 4;
                                                case 4: return [4 /*yield*/, metaSchema_1.default.findByIdAndUpdate(meta === null || meta === void 0 ? void 0 : meta._id, { $set: tslib_1.__assign({}, updateData_1) }, { timestamps: false }).exec().finally(function () {
                                                        console.log("".concat(meta === null || meta === void 0 ? void 0 : meta.type, " ").concat(meta === null || meta === void 0 ? void 0 : meta.name, " set to ").concat(JSON.stringify(updateData_1, null, '\t')));
                                                    })];
                                                case 5:
                                                    _k.sent();
                                                    return [3 /*break*/, 8];
                                                case 6: return [4 /*yield*/, metaSchema_1.default.findByIdAndUpdate(meta === null || meta === void 0 ? void 0 : meta._id, { $set: { status: 'draft' } }, { timestamps: false }).exec()];
                                                case 7:
                                                    _k.sent();
                                                    console.log(meta === null || meta === void 0 ? void 0 : meta.name, "drafted");
                                                    _k.label = 8;
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    metas_1 = tslib_1.__asyncValues(metas);
                                    _d.label = 1;
                                case 1: return [4 /*yield*/, metas_1.next()];
                                case 2:
                                    if (!(metas_1_1 = _d.sent(), !metas_1_1.done)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_1()];
                                case 3:
                                    _d.sent();
                                    _d.label = 4;
                                case 4: return [3 /*break*/, 1];
                                case 5: return [3 /*break*/, 12];
                                case 6:
                                    e_1_1 = _d.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 12];
                                case 7:
                                    _d.trys.push([7, , 10, 11]);
                                    if (!(metas_1_1 && !metas_1_1.done && (_a = metas_1.return))) return [3 /*break*/, 9];
                                    return [4 /*yield*/, _a.call(metas_1)];
                                case 8:
                                    _d.sent();
                                    _d.label = 9;
                                case 9: return [3 /*break*/, 11];
                                case 10:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 11: return [7 /*endfinally*/];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log('ERROR', err_1.stack);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
setMetaThumbnailsAndCount(worker_threads_1.workerData).then(function (res) {
    worker_threads_1.parentPort.postMessage(res);
    process.exit(0);
});
//# sourceMappingURL=setMetaThumbnailsAndCount.js.map