"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../../lib/AxiosInstance"));
var custom_util_1 = require("custom-util");
var userUpdatePost = function (editedPost) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var comments, categories, tags, actors, author, postData, body;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                comments = editedPost.comments ? { comments: (0, custom_util_1.reduceArrayOfDataToIds)(editedPost.comments) } : {};
                categories = editedPost.categories ? { categories: (0, custom_util_1.reduceArrayOfDataToIds)(editedPost.categories) } : {};
                tags = editedPost.tags ? { tags: (0, custom_util_1.reduceArrayOfDataToIds)(editedPost.tags) } : {};
                actors = editedPost.actors ? { actors: (0, custom_util_1.reduceArrayOfDataToIds)(editedPost.actors) } : {};
                author = editedPost.author ? { author: (_a = editedPost.author) === null || _a === void 0 ? void 0 : _a._id } : {};
                postData = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, editedPost), comments), categories), author), tags), actors);
                body = {
                    postData: postData,
                    token: localStorage.wt
                };
                return [4 /*yield*/, AxiosInstance_1["default"].post("/api/v1/posts/userUpdatePost", body)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports["default"] = userUpdatePost;
