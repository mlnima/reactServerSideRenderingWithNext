"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var _updateSaveMetas_1 = tslib_1.__importDefault(require("../_variables/_updateSaveMetas"));
var adminUpdatePost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var postUpdatedData, finalPostUpdatedData, _a, _b, _c, _d, err_1;
    var _e;
    return tslib_1.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                postUpdatedData = req.body.postData;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 12, , 13]);
                _a = [tslib_1.__assign({}, postUpdatedData)];
                _e = { lastModify: Date.now() };
                if (!postUpdatedData.tags) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(postUpdatedData.tags)];
            case 2:
                _b = _f.sent();
                return [3 /*break*/, 4];
            case 3:
                _b = [];
                _f.label = 4;
            case 4:
                _e.tags = _b;
                if (!postUpdatedData.categories) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(postUpdatedData.categories)];
            case 5:
                _c = _f.sent();
                return [3 /*break*/, 7];
            case 6:
                _c = [];
                _f.label = 7;
            case 7:
                _e.categories = _c;
                if (!postUpdatedData.actors) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(postUpdatedData.actors)];
            case 8:
                _d = _f.sent();
                return [3 /*break*/, 10];
            case 9:
                _d = [];
                _f.label = 10;
            case 10:
                finalPostUpdatedData = tslib_1.__assign.apply(void 0, _a.concat([(_e.actors = _d, _e)]));
                return [4 /*yield*/, postSchema_1.default.findByIdAndUpdate(postUpdatedData._id, tslib_1.__assign({}, finalPostUpdatedData), { new: true }).exec().then(function (updated) {
                        res.json({ message: 'Post Has Been Successfully Updated' });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(400).json({ message: 'Error On Updating The document', err: err });
                    })];
            case 11:
                _f.sent();
                return [3 /*break*/, 13];
            case 12:
                err_1 = _f.sent();
                console.log(err_1);
                res.status(500).json({ message: 'I Tried But Something Went Wrong', err: err_1 });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.default = adminUpdatePost;
//# sourceMappingURL=adminUpdatePost.js.map