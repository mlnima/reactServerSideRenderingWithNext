"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
// const ObjectId = mongoose.Types.ObjectId;
var adminGetMeta = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var validateId, err_1;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                validateId = req.query._id ? mongoose_1.default.isValidObjectId(req.query._id) && ((_a = req.query._id) === null || _a === void 0 ? void 0 : _a.match(/^[0-9a-fA-F]{24}$/)) : false;
                if (!validateId) return [3 /*break*/, 2];
                return [4 /*yield*/, metaSchema_1.default.findById(req.query._id).exec().then(function (meta) {
                        if (meta) {
                            res.json({ meta: meta });
                        }
                        else {
                            res.status(404).json({ message: 'Not Found' });
                        }
                    }).catch(function (err) {
                        console.log(err.stack);
                        res.status(400).json({ message: 'Bad Request' });
                    })];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                res.status(404).json({ message: 'Not Found' });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1.stack);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetMeta;
//# sourceMappingURL=adminGetMeta.js.map