"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var connectToDatabase_1 = tslib_1.__importDefault(require("../_variables/connectToDatabase"));
var worker_threads_1 = require("worker_threads");
var postSchema_1 = tslib_1.__importDefault(require("../models/postSchema"));
dotenv_1.default.config();
(0, connectToDatabase_1.default)('setMetaThumbnailsAndCount :').finally();
var generatePermaLink = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var findingPostsQuery, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, postSchema_1.default.syncIndexes()];
            case 1:
                _a.sent();
                findingPostsQuery = { permaLink: { $exists: false } };
                return [4 /*yield*/, postSchema_1.default.find(findingPostsQuery).exec().then(function (posts) { var posts_1, posts_1_1; return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var post, permaLink, e_1_1;
                        var e_1, _a;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 6, 7, 12]);
                                    posts_1 = tslib_1.__asyncValues(posts);
                                    _b.label = 1;
                                case 1: return [4 /*yield*/, posts_1.next()];
                                case 2:
                                    if (!(posts_1_1 = _b.sent(), !posts_1_1.done)) return [3 /*break*/, 5];
                                    post = posts_1_1.value;
                                    permaLink = (post === null || post === void 0 ? void 0 : post.title) ? post.title.replaceAll(' ', '-') : null;
                                    return [4 /*yield*/, postSchema_1.default.findByIdAndUpdate(post._id, { $set: { permaLink: permaLink } }, {
                                            new: true,
                                            timestamps: false
                                        }).exec().then(function (updatedPost) {
                                            worker_threads_1.parentPort.postMessage({
                                                type: 'log',
                                                message: "".concat(updatedPost._id, ",").concat(updatedPost.title, ",").concat(updatedPost.permaLink)
                                            });
                                        })];
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
                                case 12:
                                    worker_threads_1.parentPort.postMessage({ type: 'action', message: 'job is done', exit: true });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log('err');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
generatePermaLink().then(function () {
    worker_threads_1.parentPort.on('message', function (data) {
        console.log('message from main process:', data);
        if (data.exit) {
            process.exit(0);
        }
    });
});
//# sourceMappingURL=generatePermaLink.js.map