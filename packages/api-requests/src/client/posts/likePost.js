"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var likePost = function (postId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ratingData, body;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ratingData = (localStorage === null || localStorage === void 0 ? void 0 : localStorage.ratingData) ? JSON.parse(localStorage.ratingData) : { likes: [], disLikes: [] };
                ratingData.likes = tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(ratingData.likes), false), [postId], false))), false);
                ratingData.disLikes = ratingData.disLikes.filter(function (disLiked) { return disLiked !== postId; });
                localStorage.setItem('ratingData', JSON.stringify(ratingData));
                body = {
                    id: postId,
                    type: 'likes'
                };
                return [4 /*yield*/, AxiosInstance_1["default"].post('/api/v1/posts/likeDislikeView', body)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = likePost;
