"use strict";
// const fs = require("fs");
// const download = require("image-downloader");
// const sharp = require("sharp");
// const fsExtra = require("fs-extra");
// const postSchema = require("../../../models/postSchema");
// const updateSaveMetas = require("../_variables/_updateSaveMetas");
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var image_downloader_1 = tslib_1.__importDefault(require("image-downloader"));
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var _updateSaveMetas_1 = tslib_1.__importDefault(require("../_variables/_updateSaveMetas"));
var imageDownloader = function (newPost) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var formats, imageformat, today, directoryPath, fileName, filePathOriginalSize, filePath, options, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formats = ['.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];
                imageformat = formats.find(function (format) { var _a; return (_a = newPost === null || newPost === void 0 ? void 0 : newPost.mainThumbnail) === null || _a === void 0 ? void 0 : _a.includes(format); });
                today = new Date(Date.now());
                directoryPath = "./public/uploads/image/".concat(today.getFullYear(), "/").concat(today.getMonth() + 1, "/");
                !fs_1.default.existsSync(directoryPath) ? fs_1.default.mkdirSync(directoryPath, { recursive: true }) : null;
                fileName = "".concat(newPost.title.replace(/[^a-zA-Z ]/g, "")).concat(Date.now());
                filePathOriginalSize = "".concat(directoryPath, "originalSize_").concat(fileName + imageformat);
                filePath = "".concat(directoryPath).concat(fileName + imageformat);
                options = {
                    url: newPost.mainThumbnail,
                    dest: filePathOriginalSize
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, image_downloader_1.default.image(options)
                        .then(function (_a) {
                        var filename = _a.filename;
                        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var err_2;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, (0, sharp_1.default)(filePathOriginalSize).resize(320, 180).toFile(filePath).then(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                                var err_3;
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 3]);
                                                            return [4 /*yield*/, fs_extra_1.default.remove(filePathOriginalSize)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/, filePath.replace('./public/', '/public/')];
                                                        case 2:
                                                            err_3 = _a.sent();
                                                            console.log(err_3);
                                                            return [2 /*return*/, newPost.mainThumbnail];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); }).catch(function (err) {
                                                return newPost.mainThumbnail;
                                            })];
                                    case 1: return [2 /*return*/, _b.sent()];
                                    case 2:
                                        err_2 = _b.sent();
                                        console.log(err_2);
                                        return [2 /*return*/, newPost.mainThumbnail];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    })
                        .catch(function (err) {
                        console.log(err);
                        return newPost.mainThumbnail;
                    })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, newPost.mainThumbnail];
            case 4: return [2 /*return*/];
        }
    });
}); };
var savePostWithDuplicateContent = function (newPost, downloadImageContent) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var newPostWithMeta, _a, _b, _c, _d, _e, newPostDataToSave, err_4;
    var _f;
    return tslib_1.__generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 14, , 15]);
                _a = [tslib_1.__assign({}, newPost)];
                _f = {};
                if (!newPost.tags) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.tags)];
            case 1:
                _b = _g.sent();
                return [3 /*break*/, 3];
            case 2:
                _b = [];
                _g.label = 3;
            case 3:
                _f.tags = _b;
                if (!newPost.categories) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.categories)];
            case 4:
                _c = _g.sent();
                return [3 /*break*/, 6];
            case 5:
                _c = [];
                _g.label = 6;
            case 6:
                _f.categories = _c;
                if (!newPost.actors) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.actors)];
            case 7:
                _d = _g.sent();
                return [3 /*break*/, 9];
            case 8:
                _d = [];
                _g.label = 9;
            case 9:
                _f.actors = _d;
                if (!downloadImageContent) return [3 /*break*/, 11];
                return [4 /*yield*/, imageDownloader(newPost)];
            case 10:
                _e = _g.sent();
                return [3 /*break*/, 12];
            case 11:
                _e = newPost.mainThumbnail;
                _g.label = 12;
            case 12:
                newPostWithMeta = tslib_1.__assign.apply(void 0, _a.concat([(_f.mainThumbnail = _e, _f)]));
                newPostDataToSave = new postSchema_1.default(newPostWithMeta);
                return [4 /*yield*/, newPostDataToSave.save(function (err, createdPost) {
                        if (err) {
                            return { message: 'Something Went Wrong While Saving! ' + newPost.title };
                        }
                        return { message: "".concat(createdPost.title, " Has Been Saved : ").concat(createdPost._id, " ") };
                    })];
            case 13:
                _g.sent();
                return [3 /*break*/, 15];
            case 14:
                err_4 = _g.sent();
                return [2 /*return*/, { message: 'Something Went Wrong! ' + newPost.title }];
            case 15: return [2 /*return*/];
        }
    });
}); };
// const savePostIfThereIsNoDuplicate = async (index, downloadImageContent) => {
//
//     try {
//       return await postSchema.find({$or: [{title: index.title}]})
//             .exec()
//             .then(async posts => {
//                 try {
//                     if (posts.length) {
//                         return {message: 'Duplicate Error! ' + index.title + ' Already Exist in the Database'}
//                     } else {
//                         const editedNewPost = {
//                             ...index,
//                             tags: index.tags ? await updateSaveMetas(index.tags) : [],
//                             categories: index.categories ? await updateSaveMetas(index.categories) : [],
//                             actors: index.actors ? await updateSaveMetas(index.actors) : [],
//                             mainThumbnail: downloadImageContent ? await imageDownloader(index) : index.mainThumbnail
//                         }
//
//                         const newPostDataToSave =  new postSchema(editedNewPost);
//
//                         return await newPostDataToSave.save((err, createdPost) => {
//                             if (err) {
//                                return  {message: 'Something Went Wrong While Saving! ' + index.title}
//                             }
//                             console.log('saved')
//                             return {message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
//                         })
//                     }
//                 } catch (err) {
//                     return {message: 'Something Went Wrong While finding Duplicate In the Database! ' + index.title}
//                 }
//             })
//     } catch (err) {
//         console.log(err, '100')
//     }
//
// }
var savePostIfThereIsNoDuplicate = function (newPost, downloadImageContent) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var editedNewPost, _a, _b, _c, _d, _e, err_5;
    var _f;
    return tslib_1.__generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 14, , 15]);
                _a = [tslib_1.__assign({}, newPost)];
                _f = {};
                if (!newPost.tags) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.tags)];
            case 1:
                _b = _g.sent();
                return [3 /*break*/, 3];
            case 2:
                _b = [];
                _g.label = 3;
            case 3:
                _f.tags = _b;
                if (!newPost.categories) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.categories)];
            case 4:
                _c = _g.sent();
                return [3 /*break*/, 6];
            case 5:
                _c = [];
                _g.label = 6;
            case 6:
                _f.categories = _c;
                if (!newPost.actors) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, _updateSaveMetas_1.default)(newPost.actors)];
            case 7:
                _d = _g.sent();
                return [3 /*break*/, 9];
            case 8:
                _d = [];
                _g.label = 9;
            case 9:
                _f.actors = _d;
                if (!downloadImageContent) return [3 /*break*/, 11];
                return [4 /*yield*/, imageDownloader(newPost)];
            case 10:
                _e = _g.sent();
                return [3 /*break*/, 12];
            case 11:
                _e = newPost.mainThumbnail;
                _g.label = 12;
            case 12:
                editedNewPost = tslib_1.__assign.apply(void 0, _a.concat([(_f.mainThumbnail = _e, _f)]));
                return [4 /*yield*/, postSchema_1.default.findOneAndUpdate({ title: newPost.title }, editedNewPost, { new: true, upsert: true })
                        .exec()
                        .then(function (createdPost) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, { message: "".concat(createdPost.title, " Has Been Saved : ").concat(createdPost._id, " ") }];
                        });
                    }); }).catch(function (err) {
                        return { message: "Something Went Wrong While saving", err: err };
                    })];
            case 13: return [2 /*return*/, _g.sent()];
            case 14:
                err_5 = _g.sent();
                console.log(err_5);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
var createNewPostByApi = function (newPost, dontSaveDuplicate, downloadImageContent) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_6;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!dontSaveDuplicate) return [3 /*break*/, 2];
                return [4 /*yield*/, savePostIfThereIsNoDuplicate(newPost, downloadImageContent)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, savePostWithDuplicateContent(newPost, downloadImageContent)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                return [2 /*return*/, { message: 'Something Went Wrong While running Saving Functions! ' + newPost.title }];
            case 6: return [2 /*return*/];
        }
    });
}); };
var adminCreateNewPostByApi = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var newPost, dontSaveDuplicate, downloadImageContent;
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                newPost = req.body.postData;
                dontSaveDuplicate = (_a = req.body) === null || _a === void 0 ? void 0 : _a.dontSaveDuplicate;
                downloadImageContent = (_b = req.body) === null || _b === void 0 ? void 0 : _b.downloadImageContent;
                return [4 /*yield*/, createNewPostByApi(newPost, dontSaveDuplicate, downloadImageContent).then(function (data) {
                        res.json(tslib_1.__assign({}, data));
                    }).catch(function (err) {
                        res.json({ message: 'Something Went Wrong While running Creator! ' });
                    })];
            case 1:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = adminCreateNewPostByApi;
//# sourceMappingURL=adminCreateNewPostByApi.js.map