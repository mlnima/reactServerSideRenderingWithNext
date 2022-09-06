"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var _updateSaveMetas = function (metas) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var metasData, finalData, metasData_1, metasData_1_1, meta, metaData, findQuery, e_1_1, err_1;
    var e_1, _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                metasData = metas !== null && metas !== void 0 ? metas : [];
                finalData = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 15, , 16]);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, 9, 14]);
                metasData_1 = tslib_1.__asyncValues(metasData);
                _b.label = 3;
            case 3: return [4 /*yield*/, metasData_1.next()];
            case 4:
                if (!(metasData_1_1 = _b.sent(), !metasData_1_1.done)) return [3 /*break*/, 7];
                meta = metasData_1_1.value;
                if (!(meta.name && meta.type)) return [3 /*break*/, 6];
                metaData = {
                    name: meta.name,
                    type: meta.type,
                    status: 'published',
                };
                findQuery = { $and: [{ name: meta.name }, { type: meta.type }] };
                return [4 /*yield*/, metaSchema_1.default.findOneAndUpdate(findQuery, { $set: tslib_1.__assign({}, metaData) }, { new: true, upsert: true }).exec().then(function (meta) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var count;
                        var _a;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, postSchema_1.default.countDocuments({ $and: [(_a = {}, _a[meta.type] = meta._id, _a), { status: 'published' }] }).exec()];
                                case 1:
                                    count = _b.sent();
                                    return [4 /*yield*/, metaSchema_1.default.findOneAndUpdate({ name: meta.name }, { $set: { count: count } }).exec()];
                                case 2:
                                    _b.sent();
                                    finalData = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(finalData), false), [meta._id], false);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _b.trys.push([9, , 12, 13]);
                if (!(metasData_1_1 && !metasData_1_1.done && (_a = metasData_1.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _a.call(metasData_1)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/, finalData];
            case 15:
                err_1 = _b.sent();
                console.log('error on saving meta');
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.default = _updateSaveMetas;
//# sourceMappingURL=_updateSaveMetas.js.map