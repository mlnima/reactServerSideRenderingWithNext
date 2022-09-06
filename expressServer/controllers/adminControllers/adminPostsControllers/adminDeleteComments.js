"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var adminDeleteComments = function (req, res) {
    var commentsIds = req.body.commentsIds || [];
    var mapIdAndReturnDeletePromise = commentsIds.map(function (commentId) {
        return commentSchema_1.default.findByIdAndDelete(commentId, { useFindAndModify: false }).exec();
    });
    Promise.all(mapIdAndReturnDeletePromise).then(function () {
        res.json({ message: 'Comments Deleted' });
    }).catch(function (err) {
        res.status(500).send({ message: 'Something Went Wrong While Deleting Comments', err: err });
    });
};
exports.default = adminDeleteComments;
//# sourceMappingURL=adminDeleteComments.js.map