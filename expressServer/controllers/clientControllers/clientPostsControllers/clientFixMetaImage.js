"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var clientFixMetaImage = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var metaId, metaDocument, findPostWithSameMeta, err_1;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                metaId = req.body._id;
                return [4 /*yield*/, metaSchema_1.default.findById(metaId).exec()];
            case 1:
                metaDocument = _b.sent();
                if (!(metaDocument && !(metaDocument === null || metaDocument === void 0 ? void 0 : metaDocument.imageUrl))) return [3 /*break*/, 6];
                return [4 /*yield*/, postSchema_1.default.findOne((_a = {}, _a[metaDocument.type] = [metaDocument._id], _a)).exec()];
            case 2:
                findPostWithSameMeta = _b.sent();
                if (!findPostWithSameMeta) return [3 /*break*/, 4];
                return [4 /*yield*/, metaSchema_1.default.findByIdAndUpdate(metaId, { imageUrl: findPostWithSameMeta.mainThumbnail }, { new: true }).exec().then(function (updatedMeta) {
                        res.json({ newImageUrl: updatedMeta.imageUrl });
                    }).catch(function (err) {
                        console.log(err);
                        res.end();
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                // await metaSchema.findByIdAndUpdate(metaId,{status:'pending'}).exec().then(()=>{
                //     res.json({message:'meta went pending',error:true})
                // }).catch(err=>{
                //     res.end()
                // })
                res.end();
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.json({ newImageUrl: metaDocument === null || metaDocument === void 0 ? void 0 : metaDocument.imageUrl });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                console.log(err_1);
                res.end();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = clientFixMetaImage;
//# sourceMappingURL=clientFixMetaImage.js.map