"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var adminGetPost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _id;
    return tslib_1.__generator(this, function (_a) {
        _id = req.query._id;
        try {
            if (_id) {
                postSchema_1.default.findById(_id).populate([
                    { path: 'categories', select: { 'name': 1, 'type': 1 } },
                    { path: 'tags', select: { 'name': 1, 'type': 1 } },
                    { path: 'actors', select: { 'name': 1, 'type': 1 } },
                ]).exec().then(function (post) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var postMessageToSend;
                    return tslib_1.__generator(this, function (_a) {
                        postMessageToSend = { post: post, error: false };
                        res.json(postMessageToSend);
                        return [2 /*return*/];
                    });
                }); }).catch(function (err) {
                    res.status(404).json({ message: 'not found' });
                });
            }
            else {
                res.status(404).json({ message: 'not found' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong please try again later' });
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminGetPost;
//# sourceMappingURL=adminGetPost.js.map