"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var clientNewComment = function (req, res) {
    var commentDataToSave = new commentSchema_1.default(req.body);
    commentDataToSave.save(function (err, comment) {
        if (err) {
            res.status(500).json({ message: 'comment did not saved', type: 'error' });
        }
        postSchema_1.default.findByIdAndUpdate(req.body.onDocumentId, { $push: { comments: [comment._id] } }, { new: true }).exec().then(function (updatePost) {
            res.json({ updatePost: updatePost });
        }).catch(function (error) {
            res.status(500).json({ message: 'comment was saved but document did not updated', type: 'error' });
        });
    });
};
exports.default = clientNewComment;
//# sourceMappingURL=clientNewComment.js.map