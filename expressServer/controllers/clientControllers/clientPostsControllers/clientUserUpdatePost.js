"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var clientUserCreateNewPost = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var postData, onErrorHandler, images, postId, directoryPath, uploadedImages, _a, _b, image, filePath, tempPath, e_1_1, update, error_1;
    var e_1, _c;
    var _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                postData = JSON.parse(req.body.postData);
                onErrorHandler = function (error) {
                    res.json({ response: 'something is wrong', type: 'error', error: error });
                };
                _e.label = 1;
            case 1:
                _e.trys.push([1, 17, , 18]);
                images = req.files;
                postId = (_d = req.body) === null || _d === void 0 ? void 0 : _d.postId;
                directoryPath = './public/uploads/posts/' + postId + '/';
                // const post = await postSchema.findById(postId).exec()
                // if (!post) {
                //     onErrorHandler('post not found')
                // }
                return [4 /*yield*/, fs_extra_1.default.ensureDir(directoryPath)];
            case 2:
                // const post = await postSchema.findById(postId).exec()
                // if (!post) {
                //     onErrorHandler('post not found')
                // }
                _e.sent();
                uploadedImages = [];
                _e.label = 3;
            case 3:
                _e.trys.push([3, 10, 11, 16]);
                _a = tslib_1.__asyncValues(Object.keys(images));
                _e.label = 4;
            case 4: return [4 /*yield*/, _a.next()];
            case 5:
                if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 9];
                image = _b.value;
                filePath = "./public/uploads/posts/".concat(postId, "/").concat(image);
                tempPath = "./public/uploads/posts/".concat(postId, "/temp-").concat(image);
                return [4 /*yield*/, images[image].mv(tempPath)];
            case 6:
                _e.sent();
                return [4 /*yield*/, (0, sharp_1.default)(tempPath).resize(640, 360).toFile(filePath)];
            case 7:
                _e.sent();
                try {
                    fs_1.default.unlinkSync(tempPath);
                }
                catch (error) {
                    console.error(error);
                }
                uploadedImages = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(uploadedImages), false), [process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.', '')], false);
                _e.label = 8;
            case 8: return [3 /*break*/, 4];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _e.trys.push([11, , 14, 15]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _c.call(_a)];
            case 12:
                _e.sent();
                _e.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16:
                update = tslib_1.__assign(tslib_1.__assign({}, postData), { images: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(postData.images), false), tslib_1.__read(uploadedImages), false) });
                // await postSchema.findByIdAndUpdate(postId, update).exec().then(_=>{
                //     res.json({response: 'Uploaded',images:uploadedImages})
                // })
                postSchema_1.default.findByIdAndUpdate(postData._id, update, { new: true }).exec().then(function (updatedPost) {
                    res.json({
                        message: 'post successfully updated after a moderator review changes will be published',
                        post: updatedPost
                    });
                }).catch(function (error) {
                    if (error.code === 11000) {
                        res.status(400).json({
                            message: 'Post with this title already exist in the Database', type: 'error'
                        });
                    }
                    else {
                        res.status(500).json({
                            message: 'Something Went Wrong', type: 'error'
                        });
                    }
                });
                return [3 /*break*/, 18];
            case 17:
                error_1 = _e.sent();
                // console.log(err)
                // res.status(500).json({message: 'Something Went Wrong', type: 'error'})
                onErrorHandler(error_1);
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.default = clientUserCreateNewPost;
// try {
//     postSchema.findByIdAndUpdate(postData._id,postData,{new:true}).exec().then(updatedPost=>{
//         res.json({
//             message:'post successfully updated after a moderator review changes will be published',
//             post:updatedPost
//         });
//     }).catch(err=>{
//         if (err.code === 11000) {
//             res.status(400).json({
//                 message: 'Post with this title already exist in the Database',type:'error'
//             })
//         } else {
//             res.status(500).json({
//                 message: 'Something Went Wrong',type:'error'
//             })
//         }
//     })
//
// } catch (err) {
//     console.log(err)
//     res.status(500).json({message: 'Something Went Wrong',type:'error'})
// }
//# sourceMappingURL=clientUserUpdatePost.js.map