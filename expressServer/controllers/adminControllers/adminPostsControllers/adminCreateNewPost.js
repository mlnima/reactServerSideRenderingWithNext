"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var _updateSaveMetas_1 = tslib_1.__importDefault(require("../_variables/_updateSaveMetas"));
var adminCreateNewPost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var newPost, editedNewPost, _a, _b, _c, _d, newPostDataToSave, err_1;
    var _e;
    return tslib_1.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                newPost = req.body.postData;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 11, , 12]);
                _a = [tslib_1.__assign({}, newPost)];
                _e = {};
                if (!newPost.tags) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.tags)];
            case 2:
                _b = _f.sent();
                return [3 /*break*/, 4];
            case 3:
                _b = [];
                _f.label = 4;
            case 4:
                _e.tags = _b;
                if (!newPost.categories) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.categories)];
            case 5:
                _c = _f.sent();
                return [3 /*break*/, 7];
            case 6:
                _c = [];
                _f.label = 7;
            case 7:
                _e.categories = _c;
                if (!newPost.actors) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.actors)];
            case 8:
                _d = _f.sent();
                return [3 /*break*/, 10];
            case 9:
                _d = [];
                _f.label = 10;
            case 10:
                editedNewPost = tslib_1.__assign.apply(void 0, _a.concat([(_e.actors = _d, _e)]));
                newPostDataToSave = new postSchema_1.default(editedNewPost);
                newPostDataToSave.save().then(function (savedPostData) {
                    res.json({ savedPostData: savedPostData, message: 'Post Has Been Saved' });
                }).catch(function (err) {
                    if (err.code === 11000) {
                        res.status(400).send({ message: 'Post with this TextInput already exist in the Database', err: err });
                    }
                    else {
                        res.status(500).send({ message: 'Something Went Wrong While Saving The Post', err: err });
                    }
                });
                return [3 /*break*/, 12];
            case 11:
                err_1 = _f.sent();
                res.end();
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.default = adminCreateNewPost;
//# sourceMappingURL=adminCreateNewPost.js.map