"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema = require("../../../models/postSchema");
var clientUserCreateNewPost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var newPost, newPostDataToSave;
    return tslib_1.__generator(this, function (_a) {
        newPost = req.body.postData;
        try {
            newPostDataToSave = new postSchema(newPost);
            newPostDataToSave.save(function (err, savedPostData) {
                if (err) {
                    if (err.code === 11000) {
                        res.status(400).json({ message: 'Post with this title already exist in the Database', type: 'error' });
                    }
                    else {
                        res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
                    }
                }
                res.json({
                    message: 'post successfully created after a moderator review will be published',
                    post: savedPostData
                });
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
        }
        return [2 /*return*/];
    });
}); };
exports.default = clientUserCreateNewPost;
//# sourceMappingURL=clientUserCreateNewPost.js.map