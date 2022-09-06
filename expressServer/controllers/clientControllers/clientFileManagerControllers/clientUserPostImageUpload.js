"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var clientUserPostImageUpload = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var onErrorHandler, images, postId, directoryPath, post, uploadedImages_1, _a, _b, image, filePath, tempPath, e_1_1, update, error_1;
    var e_1, _c;
    var _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                onErrorHandler = function (error) {
                    res.json({ response: 'something is wrong', type: 'error', error: error });
                };
                _e.label = 1;
            case 1:
                _e.trys.push([1, 19, , 20]);
                images = req.files;
                postId = (_d = req.body) === null || _d === void 0 ? void 0 : _d.postId;
                directoryPath = './public/uploads/posts/' + postId + '/';
                return [4 /*yield*/, postSchema_1.default.findById(postId).exec()];
            case 2:
                post = _e.sent();
                if (!post) {
                    onErrorHandler('post not found');
                }
                return [4 /*yield*/, fs_extra_1.default.ensureDir(directoryPath)];
            case 3:
                _e.sent();
                uploadedImages_1 = [];
                _e.label = 4;
            case 4:
                _e.trys.push([4, 11, 12, 17]);
                _a = tslib_1.__asyncValues(Object.keys(images));
                _e.label = 5;
            case 5: return [4 /*yield*/, _a.next()];
            case 6:
                if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 10];
                image = _b.value;
                filePath = "./public/uploads/posts/".concat(postId, "/").concat(image);
                tempPath = "./public/uploads/posts/".concat(postId, "/temp-").concat(image);
                return [4 /*yield*/, images[image].mv(tempPath)];
            case 7:
                _e.sent();
                return [4 /*yield*/, (0, sharp_1.default)(tempPath).resize(640, 480).toFile(filePath)];
            case 8:
                _e.sent();
                try {
                    fs_1.default.unlinkSync(tempPath);
                }
                catch (err) {
                    console.error(err);
                }
                uploadedImages_1 = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(uploadedImages_1), false), [process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.', '')], false);
                _e.label = 9;
            case 9: return [3 /*break*/, 5];
            case 10: return [3 /*break*/, 17];
            case 11:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 17];
            case 12:
                _e.trys.push([12, , 15, 16]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 14];
                return [4 /*yield*/, _c.call(_a)];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 16: return [7 /*endfinally*/];
            case 17:
                update = {
                    $push: { images: uploadedImages_1 }
                };
                return [4 /*yield*/, postSchema_1.default.findByIdAndUpdate(postId, update).exec().then(function (_) {
                        res.json({ response: 'Uploaded', images: uploadedImages_1 });
                    })];
            case 18:
                _e.sent();
                return [3 /*break*/, 20];
            case 19:
                error_1 = _e.sent();
                onErrorHandler(error_1);
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.default = clientUserPostImageUpload;
//# sourceMappingURL=clientUserPostImageUpload.js.map