"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminPostsBulkAction = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ids, status, actions;
    return tslib_1.__generator(this, function (_a) {
        ids = req.body.ids || [];
        status = req.body.status;
        if (status === 'delete') {
            actions = ids.map(function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, postSchema_1.default.findByIdAndDelete(id).exec().then(function (doc) {
                            if (!doc.mainThumbnail.includes('http')) {
                                fs_1.default.unlinkSync(".".concat(doc.mainThumbnail));
                            }
                        })];
                });
            }); });
        }
        else {
            actions = ids.map(function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, postSchema_1.default.findByIdAndUpdate(id, { $set: { status: status } })];
                });
            }); });
        }
        Promise.all(actions).then(function () {
            return res.status(200).json({
                message: 'all done'
            });
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Server Error'
            });
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminPostsBulkAction;
//# sourceMappingURL=adminPostsBulkAction.js.map