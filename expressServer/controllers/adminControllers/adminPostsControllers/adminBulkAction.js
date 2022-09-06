"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var adminBulkAction = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var type, status, ids, actionsPromise, targetSchema;
    return tslib_1.__generator(this, function (_a) {
        type = req.body.type;
        status = req.body.status;
        ids = req.body.ids;
        targetSchema = type === 'posts' ? postSchema_1.default :
            type === 'metas' ? metaSchema_1.default :
                type === 'comments' ? commentSchema_1.default :
                    type === 'users' ? userSchema_1.default : null;
        if (status === 'delete') {
            actionsPromise = ids.map(function (id) {
                targetSchema.findByIdAndDelete(id);
            });
        }
        else {
            actionsPromise = ids.map(function (id) {
                return targetSchema.findByIdAndUpdate(id, { $set: { status: status } });
            });
        }
        Promise.all(actionsPromise).then(function () {
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
exports.default = adminBulkAction;
//# sourceMappingURL=adminBulkAction.js.map