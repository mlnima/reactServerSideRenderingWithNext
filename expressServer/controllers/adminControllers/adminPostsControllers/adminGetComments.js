"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commentSchema_1 = tslib_1.__importDefault(require("../../../models/commentSchema"));
var adminGetComments = function (req, res) {
    var _a;
    var size = parseInt(req.body.size) > 50 ? 50 : parseInt(req.body.size);
    var pageNo = req.body.pageNo ? parseInt(req.body.pageNo) : 1;
    var onDocument = req.body.onDocument ? { onDocumentId: req.body.onDocument } : {};
    var status = !req.body.status || req.body.status === 'all' ? { status: 'approved' } : { status: req.body.status };
    //  let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}
    var sortQuery = req.body.sort === 'latest' ? { _id: -1 } : (_a = {}, _a[req.body.sort] = -1, _a);
    var searchQuery = !req.body.keyword ? {} : {
        $or: [
            { author: new RegExp(req.body.keyword, 'i') },
            { body: new RegExp(req.body.keyword, 'i') },
            { email: new RegExp(req.body.keyword, 'i') },
        ]
    };
    // @ts-ignore
    var comments = commentSchema_1.default.find({ $and: [onDocument, status, searchQuery] })
        .skip(size * (pageNo - 1))
        .limit(size)
        // @ts-ignore
        .sort(sortQuery)
        // .populate({$and:['author','onDocumentId']})
        .populate([
        { path: 'author', select: { 'username': 1 } },
        { path: 'onDocumentId', select: { 'title': 1, 'postType': 1 } },
    ])
        .exec();
    var commentsCount = commentSchema_1.default.countDocuments({ $and: [onDocument, status, searchQuery] }).exec();
    Promise.all([comments, commentsCount]).then(function (data) {
        res.json({ comments: data[0], count: data[1] });
    }).catch(function (err) {
        console.log(err);
    });
};
exports.default = adminGetComments;
//# sourceMappingURL=adminGetComments.js.map