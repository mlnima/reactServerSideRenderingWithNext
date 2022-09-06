"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _updateSaveMetas_1 = tslib_1.__importDefault(require("../_variables/_updateSaveMetas"));
var adminImportPosts = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var newPosts, newPosts_1, newPosts_1_1, post, newPostData, _a, _b, _c, _d, e_1_1, err_1;
    var _e;
    var e_1, _f;
    return tslib_1.__generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                newPosts = req.body.posts;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 23, , 24]);
                _g.label = 2;
            case 2:
                _g.trys.push([2, 16, 17, 22]);
                newPosts_1 = tslib_1.__asyncValues(newPosts);
                _g.label = 3;
            case 3: return [4 /*yield*/, newPosts_1.next()];
            case 4:
                if (!(newPosts_1_1 = _g.sent(), !newPosts_1_1.done)) return [3 /*break*/, 15];
                post = newPosts_1_1.value;
                _a = [tslib_1.__assign({}, post)];
                _e = { lastModify: Date.now() };
                if (!post.tags) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(post.tags)];
            case 5:
                _b = _g.sent();
                return [3 /*break*/, 7];
            case 6:
                _b = [];
                _g.label = 7;
            case 7:
                _e.tags = _b;
                if (!post.categories) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(post.categories)];
            case 8:
                _c = _g.sent();
                return [3 /*break*/, 10];
            case 9:
                _c = [];
                _g.label = 10;
            case 10:
                _e.categories = _c;
                if (!post.actors) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(post.actors)];
            case 11:
                _d = _g.sent();
                return [3 /*break*/, 13];
            case 12:
                _d = [];
                _g.label = 13;
            case 13:
                newPostData = tslib_1.__assign.apply(void 0, _a.concat([(_e.actors = _d, _e)]));
                _g.label = 14;
            case 14: return [3 /*break*/, 3];
            case 15: return [3 /*break*/, 22];
            case 16:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 22];
            case 17:
                _g.trys.push([17, , 20, 21]);
                if (!(newPosts_1_1 && !newPosts_1_1.done && (_f = newPosts_1.return))) return [3 /*break*/, 19];
                return [4 /*yield*/, _f.call(newPosts_1)];
            case 18:
                _g.sent();
                _g.label = 19;
            case 19: return [3 /*break*/, 21];
            case 20:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 21: return [7 /*endfinally*/];
            case 22:
                res.json({ message: 'All Done' });
                return [3 /*break*/, 24];
            case 23:
                err_1 = _g.sent();
                console.log(err_1);
                res.status(500).send({ message: 'Something Went Wrong While Saving PostsRenderer', err: err_1 });
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.default = adminImportPosts;
//# sourceMappingURL=adminImportPosts.js.map