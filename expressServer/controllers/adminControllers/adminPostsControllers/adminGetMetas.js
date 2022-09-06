"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var adminGetMetas = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var identitySetting, type, size, statusQuery, page, startWithQuery, countQuery, searchQuery, sortQuery, metaCount_1, err_1;
    var _a, _b, _c, _d;
    var _e, _f, _g;
    return tslib_1.__generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 3, , 4]);
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'identity' }).exec()];
            case 1:
                identitySetting = _h.sent();
                type = { type: req.query.metaType };
                size = req.query.size === 'undefined' ? (_e = identitySetting === null || identitySetting === void 0 ? void 0 : identitySetting.data) === null || _e === void 0 ? void 0 : _e.postsCountPerPage : parseInt(req.query.size);
                statusQuery = req.query.status === 'all' ? { status: { $ne: 'trash' } } : !req.query.status ? {} : { status: req.query.status };
                page = req.query.page === 'undefined' ? 1 : parseInt(req.query.page);
                startWithQuery = ((_f = req.query) === null || _f === void 0 ? void 0 : _f.startWith) === 'any' ? {} : { name: { $regex: '^' + ((_g = req.query) === null || _g === void 0 ? void 0 : _g.startWith), $options: 'i' } };
                countQuery = {};
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
                sortQuery = req.query.sort ? (_c = {}, _c[req.query.sort] = -1, _c) : { updatedAt: -1 };
                return [4 /*yield*/, metaSchema_1.default.countDocuments({ $and: [type, searchQuery, startWithQuery, statusQuery, countQuery] }).exec()];
            case 2:
                metaCount_1 = _h.sent();
                metaSchema_1.default.find({ $and: [type, searchQuery, startWithQuery, statusQuery, countQuery] }, {}, { sort: req.query.sort === 'createdAt' || !req.query.sort ? {} : (_d = {}, _d[req.query.sort] = -1, _d) })
                    .limit(size)
                    .skip(size * (page - 1))
                    .sort(sortQuery)
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
                err_1 = _h.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetMetas;
//# sourceMappingURL=adminGetMetas.js.map