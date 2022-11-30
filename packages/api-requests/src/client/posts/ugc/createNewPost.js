"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../../lib/AxiosInstance"));
var custom_util_1 = require("custom-util");
var createNewPost = function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var comments, categories, tags, actors, postData, body;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comments = data.comments ? { comments: (0, custom_util_1.reduceArrayOfDataToIds)(data.comments) } : {};
                categories = data.categories ? { categories: (0, custom_util_1.reduceArrayOfDataToIds)(data.categories) } : {};
                tags = data.tags ? { tags: (0, custom_util_1.reduceArrayOfDataToIds)(data.tags) } : {};
                actors = data.actors ? { actors: (0, custom_util_1.reduceArrayOfDataToIds)(data.actors) } : {};
                postData = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, data), comments), categories), tags), actors);
                body = {
                    postData: postData,
                    token: localStorage.wt
                };
                return [4 /*yield*/, AxiosInstance_1["default"].post("/api/v1/posts/userCreateNewPost", body)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = createNewPost;
