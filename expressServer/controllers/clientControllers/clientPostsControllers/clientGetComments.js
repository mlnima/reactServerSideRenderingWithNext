"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var mongoIdValidator_1 = tslib_1.__importDefault(require("../../../../_variables/serverUtil/mongoIdValidator"));
var clientGetComments = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var onDocument, err_1;
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                onDocument = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.onDocument) ? { onDocumentId: req.query.onDocument } : {};
                if (!(mongoIdValidator_1.default && ((_b = req.query) === null || _b === void 0 ? void 0 : _b.onDocument))) return [3 /*break*/, 2];
                return [4 /*yield*/, commentSchema_1.default.find(onDocument, {}, { sort: { createdAt: -1 } })
                        .populate([{ path: 'author', select: ['username', 'profileImage'] }])
                        .exec()
                        .then(function (comments) {
                        res.json({ comments: comments });
                    })];
            case 1:
                _c.sent();
                return [3 /*break*/, 3];
            case 2:
                res.status(500).json({ message: 'Request Is Invalid' });
                _c.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                res.status(500).json({ message: 'Something Went Wrong' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetComments;
//# sourceMappingURL=clientGetComments.js.map