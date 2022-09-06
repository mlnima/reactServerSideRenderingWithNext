"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var adminUpdateComment = function (req, res) {
    commentSchema_1.default.findByIdAndUpdate(req.body._id, req.body.update, { new: true }).exec().then(function (updated) {
        res.end();
    });
};
exports.default = adminUpdateComment;
//# sourceMappingURL=adminUpdateComment.js.map