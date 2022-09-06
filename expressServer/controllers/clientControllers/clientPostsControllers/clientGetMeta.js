"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var clientGetMeta = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, metaSchema_1.default.findById(req.query.id).exec().then(function (meta) {
                        if (meta) {
                            res.json({ meta: meta });
                        }
                        else {
                            res.status(404).json({ message: 'Not Found' });
                        }
                    }).catch(function (err) {
                        res.status(400).json({ message: 'Bad Request' });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetMeta;
// await  metaSchema.findById(req.query.id).exec().then(meta => {
//     if (meta){
//         res.json({meta})
//     }else {
//         res.status(404).json({message:'Not Found'})
//     }
//
// }).catch(err => {
//     res.status(400).json({message:'Bad Request'})
// })
//# sourceMappingURL=clientGetMeta.js.map