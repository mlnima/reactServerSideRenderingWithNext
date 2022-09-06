"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var adminUpdateMetaByApi = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var metaData, findQuery, existingMeta_1, newMetaDataToSave, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                metaData = req.body.metaData;
                findQuery = { $and: [{ name: metaData.name }, { type: metaData.type }] };
                return [4 /*yield*/, metaSchema_1.default.findOne(findQuery).exec()];
            case 1:
                existingMeta_1 = _a.sent();
                if (!existingMeta_1) return [3 /*break*/, 2];
                metaSchema_1.default.findByIdAndUpdate(existingMeta_1._id, { $set: tslib_1.__assign({}, metaData) }, { new: true })
                    .exec()
                    .then(function (updatedMeta) {
                    res.json({ updated: updatedMeta, message: (existingMeta_1 === null || existingMeta_1 === void 0 ? void 0 : existingMeta_1.name) + ' updated' });
                }).catch(function (err) {
                    res.status(500).json({ message: 'Error While Trying To Save New Meta From API', err: err });
                });
                return [3 /*break*/, 4];
            case 2:
                newMetaDataToSave = new metaSchema_1.default(tslib_1.__assign(tslib_1.__assign({}, metaData), { count: 0, status: 'draft' }));
                return [4 /*yield*/, newMetaDataToSave.save(function (err, savedDocument) {
                        if (err) {
                            res.status(500).json({ message: 'Error While Trying To Save New Meta From API', err: err });
                        }
                        res.json({ updated: savedDocument, message: savedDocument.name + ' created' });
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = adminUpdateMetaByApi;
//# sourceMappingURL=adminUpdateMetaByApi.js.map