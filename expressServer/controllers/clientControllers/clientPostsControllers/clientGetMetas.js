"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var clientGetMetas = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var identitySetting, type, size, statusQuery, page, startWithQuery, countQuery, searchQuery, metaCount_1, sortQuery, err_1;
    var _a, _b, _c;
    var _d, _e, _f;
    return tslib_1.__generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 3, , 4]);
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'identity' }).exec()];
            case 1:
                identitySetting = _g.sent();
                type = { type: req.query.metaType };
                size = req.query.size === 'undefined' ? (_d = identitySetting === null || identitySetting === void 0 ? void 0 : identitySetting.data) === null || _d === void 0 ? void 0 : _d.postsCountPerPage : parseInt(req.query.size);
                statusQuery = req.query.status === 'all' ? { status: { $ne: 'trash' } } : !req.query.status ? { status: 'published' } : { status: req.query.status };
                page = req.query.page === 'undefined' ? 1 : parseInt(req.query.page);
                startWithQuery = ((_e = req.query) === null || _e === void 0 ? void 0 : _e.startWith) === 'any' ? {} : {
                    name: {
                        $regex: '^' + ((_f = req.query) === null || _f === void 0 ? void 0 : _f.startWith),
                        $options: 'i'
                    }
                };
                countQuery = { count: { $gt: 0 } };
                searchQuery = req.query.keyword === '' || !req.query.keyword ? {} :
                    !req.query.lang || req.query.lang === 'default' ? { $or: [{ name: new RegExp(req.query.keyword, 'i') }, { description: new RegExp(req.query.keyword, 'i') }] } :
                        {
                            $or: [
                                { name: new RegExp(req.query.keyword, 'i') },
                                { description: new RegExp(req.query.keyword, 'i') },
                                (_a = {}, _a["translations.".concat(req.query.lang, ".name")] = new RegExp(req.query.keyword, 'i'), _a),
                                (_b = {}, _b["translations.".concat(req.query.lang, ".description")] = new RegExp(req.query.keyword, 'i'), _b),
                            ]
                        };
                return [4 /*yield*/, metaSchema_1.default.countDocuments({ $and: [type, searchQuery, startWithQuery, statusQuery, countQuery] }).exec()
                    // const sortQuery = req.query.sort === 'createdAt' || !req.query.sort ? {'updatedAt':-1} : {[req.query.sort]: -1}
                ];
            case 2:
                metaCount_1 = _g.sent();
                sortQuery = !req.query.sort ? {
                    'rank': 1,
                    'likes': -1,
                    'views': -1,
                    'count': -1,
                    'updatedAt': -1,
                    'createdAt': -1
                } : (_c = {}, _c[req.query.sort] = -1, _c);
                // console.log('sortQuery:',sortQuery)
                // console.log(req.query.sort)
                metaSchema_1.default.find({ $and: [type, searchQuery, startWithQuery, statusQuery, countQuery] }, {}, { sort: sortQuery })
                    .limit(size)
                    .skip(size * (page - 1))
                    // .sort(sortQuery)
                    .exec()
                    .then(function (metas) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        res.json({ metas: metas, totalCount: metaCount_1 });
                        return [2 /*return*/];
                    });
                }); }).catch(function (err) {
                    console.log(err);
                    res.end();
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _g.sent();
                console.log(err_1);
                res.end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetMetas;
//# sourceMappingURL=clientGetMetas.js.map