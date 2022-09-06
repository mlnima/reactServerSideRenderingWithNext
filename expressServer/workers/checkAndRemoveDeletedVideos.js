"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var connectToDatabase_1 = tslib_1.__importDefault(require("../_variables/connectToDatabase"));
var worker_threads_1 = require("worker_threads");
var metaSchema_1 = tslib_1.__importDefault(require("../models/metaSchema"));
var postSchema_1 = tslib_1.__importDefault(require("../models/postSchema"));
var axios_1 = tslib_1.__importDefault(require("axios"));
dotenv_1.default.config();
(0, connectToDatabase_1.default)().finally();
var checkAndRemoveDeletedVideos = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, metaSchema_1.default.syncIndexes()];
            case 1:
                _a.sent();
                return [4 /*yield*/, postSchema_1.default.syncIndexes()];
            case 2:
                _a.sent();
                return [4 /*yield*/, postSchema_1.default.find({ $and: [{ type: 'video' }, { status: 'published' }] }).exec().then(function (posts) { var posts_1, posts_1_1; return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var _loop_1, e_1_1;
                        var e_1, _a;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 6, 7, 12]);
                                    _loop_1 = function () {
                                        var post;
                                        return tslib_1.__generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    post = posts_1_1.value;
                                                    if (!(post === null || post === void 0 ? void 0 : post.videoEmbedCode)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, axios_1.default.get(post.videoEmbedCode).then(function () {
                                                            console.log("".concat(process.env.NEXT_PUBLIC_PRODUCTION_URL, "/post/video/").concat(post._id, " is ok"));
                                                        }).catch(function (err) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                                            var _a, _b;
                                                            return tslib_1.__generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        if (!(((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 410 || ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) === 404)) return [3 /*break*/, 2];
                                                                        return [4 /*yield*/, postSchema_1.default.findByIdAndUpdate(post._id, { $set: { status: 'trash' } }, { new: true }).exec().then(function (trashedPost) {
                                                                                var metas = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(((trashedPost === null || trashedPost === void 0 ? void 0 : trashedPost.tags) || [])), false), tslib_1.__read(((trashedPost === null || trashedPost === void 0 ? void 0 : trashedPost.categories) || [])), false), tslib_1.__read(((trashedPost === null || trashedPost === void 0 ? void 0 : trashedPost.categories) || [])), false);
                                                                                metas.forEach(function (meta) {
                                                                                    metaSchema_1.default.findByIdAndUpdate(meta, { $inc: { count: -1 } }).exec();
                                                                                });
                                                                                console.log("http://localhost:3000/post/video/".concat(post._id, " trashed"));
                                                                            })];
                                                                    case 1:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 3];
                                                                    case 2:
                                                                        console.log(err.stack);
                                                                        _c.label = 3;
                                                                    case 3: return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })];
                                                case 1:
                                                    _c.sent();
                                                    _c.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    posts_1 = tslib_1.__asyncValues(posts);
                                    _b.label = 1;
                                case 1: return [4 /*yield*/, posts_1.next()];
                                case 2:
                                    if (!(posts_1_1 = _b.sent(), !posts_1_1.done)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_1()];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [3 /*break*/, 1];
                                case 5: return [3 /*break*/, 12];
                                case 6:
                                    e_1_1 = _b.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 12];
                                case 7:
                                    _b.trys.push([7, , 10, 11]);
                                    if (!(posts_1_1 && !posts_1_1.done && (_a = posts_1.return))) return [3 /*break*/, 9];
                                    return [4 /*yield*/, _a.call(posts_1)];
                                case 8:
                                    _b.sent();
                                    _b.label = 9;
                                case 9: return [3 /*break*/, 11];
                                case 10:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 11: return [7 /*endfinally*/];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [2 /*return*/, null];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
checkAndRemoveDeletedVideos().then(function (res) {
    worker_threads_1.parentPort.postMessage(res);
    process.exit(0);
});
//# sourceMappingURL=checkAndRemoveDeletedVideos.js.map