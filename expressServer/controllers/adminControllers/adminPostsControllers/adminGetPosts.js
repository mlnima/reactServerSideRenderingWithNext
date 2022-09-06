"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var _adminQueryGeneratorForGettingPosts_1 = tslib_1.__importDefault(require("../_variables/_adminQueryGeneratorForGettingPosts"));
var adminGetPosts = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var identitySetting, findingPostsOptions, populateMeta, totalCount, posts, meta, _a, err_1;
    var _b, _c, _d, _e, _f;
    return tslib_1.__generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 7, , 8]);
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'identity' }).exec()];
            case 1:
                identitySetting = _g.sent();
                findingPostsOptions = (0, _adminQueryGeneratorForGettingPosts_1.default)(tslib_1.__assign(tslib_1.__assign({}, req.query), { size: req.query.size === 'undefined' ? (_b = identitySetting === null || identitySetting === void 0 ? void 0 : identitySetting.data) === null || _b === void 0 ? void 0 : _b.postsCountPerPage : parseInt(req.query.size), page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page) }));
                populateMeta = [
                    { path: 'author', select: ['username', 'profileImage', 'role'] },
                    { path: 'actors', select: { 'name': 1, 'type': 1 } },
                    { path: 'categories', select: { 'name': 1, 'type': 1, 'imageUrl': 1 } },
                    { path: 'tags', select: { 'name': 1, 'type': 1 } }
                ];
                return [4 /*yield*/, postSchema_1.default.countDocuments(findingPostsOptions.findPostsQueries).exec()];
            case 2:
                totalCount = _g.sent();
                return [4 /*yield*/, postSchema_1.default.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields, {
                        skip: (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                        limit: findingPostsOptions.size,
                    }).sort(findingPostsOptions.sortQuery).populate(populateMeta).exec()];
            case 3:
                posts = _g.sent();
                if (!(((_c = req.query) === null || _c === void 0 ? void 0 : _c.metaId) || ((_d = req.query) === null || _d === void 0 ? void 0 : _d.selectedMetaForPosts))) return [3 /*break*/, 5];
                return [4 /*yield*/, metaSchema_1.default.findById(((_e = req.query) === null || _e === void 0 ? void 0 : _e.metaId) || ((_f = req.query) === null || _f === void 0 ? void 0 : _f.selectedMetaForPosts)).exec()];
            case 4:
                _a = _g.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = {};
                _g.label = 6;
            case 6:
                meta = _a;
                res.json({ posts: posts, totalCount: totalCount, meta: meta });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _g.sent();
                console.log(err_1.stack);
                return [2 /*return*/, res.status(404).json({
                        message: 'Server Error'
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetPosts;
//# sourceMappingURL=adminGetPosts.js.map