"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var connectToDatabase_1 = tslib_1.__importDefault(require("../_variables/connectToDatabase"));
(0, connectToDatabase_1.default)().finally();
var _a = require('worker_threads'), Worker = _a.Worker, parentPort = _a.parentPort, workerData = _a.workerData;
var sharp = require('sharp');
var postSchema = require("../models/postSchema");
var updateSaveMetas = require("../controllers/adminControllers/_variables/_updateSaveMetas");
var download = require('image-downloader');
var fsExtra = require("fs-extra");
var fs = require("fs");
var fileDownloader = require('@_variables/serverUtil/fileDownloader');
var imageDownloader = function (newPost) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var formats, imageformat, today, directoryPath, fileName, filePathOriginalSize, filePath, options, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formats = ['.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];
                imageformat = formats.find(function (format) { var _a; return (_a = newPost === null || newPost === void 0 ? void 0 : newPost.mainThumbnail) === null || _a === void 0 ? void 0 : _a.includes(format); });
                today = new Date(Date.now());
                directoryPath = "./public/uploads/image/".concat(today.getFullYear(), "/").concat(today.getMonth() + 1, "/");
                !fs.existsSync(directoryPath) ? fs.mkdirSync(directoryPath, { recursive: true }) : null;
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
                return [4 /*yield*/, download.image(options)
                        .then(function (_a) {
                        var filename = _a.filename;
                        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var err_2;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, sharp(filePathOriginalSize).resize(320, 180).toFile(filePath).then(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                                var err_3;
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 3]);
                                                            return [4 /*yield*/, fsExtra.remove(filePathOriginalSize)];
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
                                                console.log(err);
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
                return [4 /*yield*/, updateSaveMetas(newPost.tags)];
            case 1:
                _b = _g.sent();
                return [3 /*break*/, 3];
            case 2:
                _b = [];
                _g.label = 3;
            case 3:
                _f.tags = _b;
                if (!newPost.categories) return [3 /*break*/, 5];
                return [4 /*yield*/, updateSaveMetas(newPost.categories)];
            case 4:
                _c = _g.sent();
                return [3 /*break*/, 6];
            case 5:
                _c = [];
                _g.label = 6;
            case 6:
                _f.categories = _c;
                if (!newPost.actors) return [3 /*break*/, 8];
                return [4 /*yield*/, updateSaveMetas(newPost.actors)];
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
                newPostDataToSave = new postSchema(newPostWithMeta);
                return [4 /*yield*/, newPostDataToSave.save(function (err, createdPost) {
                        if (err) {
                            parentPort.postMessage({ message: 'Something Went Wrong While Saving! ' + newPost.title });
                        }
                        parentPort.postMessage({ message: "".concat(createdPost.title, " Has Been Saved : ").concat(createdPost._id, " ") });
                    })];
            case 13:
                _g.sent();
                return [3 /*break*/, 15];
            case 14:
                err_4 = _g.sent();
                parentPort.postMessage({ message: 'Something Went Wrong! ' + newPost.title });
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
var savePostIfThereIsNoDuplicate = function (newPost, downloadImageContent) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_5;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postSchema.find({ $or: [{ title: newPost.title }] })
                        .exec()
                        .then(function (posts) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var editedNewPost, _a, _b, _c, _d, _e, newPostDataToSave, err_6;
                        var _f;
                        return tslib_1.__generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    _g.trys.push([0, 17, , 18]);
                                    if (!(posts === null || posts === void 0 ? void 0 : posts.length)) return [3 /*break*/, 1];
                                    parentPort.postMessage({ message: 'Duplicate Error! ' + newPost.title + ' Already Exist in the Database' });
                                    return [3 /*break*/, 16];
                                case 1:
                                    _a = [tslib_1.__assign({}, newPost)];
                                    _f = { lastModify: Date.now() };
                                    if (!newPost.tags) return [3 /*break*/, 3];
                                    return [4 /*yield*/, updateSaveMetas(newPost.tags)];
                                case 2:
                                    _b = _g.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _b = [];
                                    _g.label = 4;
                                case 4:
                                    _f.tags = _b;
                                    if (!newPost.categories) return [3 /*break*/, 6];
                                    return [4 /*yield*/, updateSaveMetas(newPost.categories)];
                                case 5:
                                    _c = _g.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    _c = [];
                                    _g.label = 7;
                                case 7:
                                    _f.categories = _c;
                                    if (!newPost.actors) return [3 /*break*/, 9];
                                    return [4 /*yield*/, updateSaveMetas(newPost.actors)];
                                case 8:
                                    _d = _g.sent();
                                    return [3 /*break*/, 10];
                                case 9:
                                    _d = [];
                                    _g.label = 10;
                                case 10:
                                    _f.actors = _d;
                                    if (!downloadImageContent) return [3 /*break*/, 12];
                                    return [4 /*yield*/, imageDownloader(newPost)];
                                case 11:
                                    _e = _g.sent();
                                    return [3 /*break*/, 13];
                                case 12:
                                    _e = newPost.mainThumbnail;
                                    _g.label = 13;
                                case 13:
                                    editedNewPost = tslib_1.__assign.apply(void 0, _a.concat([(_f.mainThumbnail = _e, _f)]));
                                    return [4 /*yield*/, new postSchema(editedNewPost)];
                                case 14:
                                    newPostDataToSave = _g.sent();
                                    return [4 /*yield*/, newPostDataToSave.save(function (err, createdPost) {
                                            if (err) {
                                                parentPort.postMessage({ message: 'Something Went Wrong While Saving! ' + newPost.title });
                                            }
                                            parentPort.postMessage({ message: "".concat(createdPost.title, " Has Been Saved : ").concat(createdPost._id, " ") });
                                        })];
                                case 15:
                                    _g.sent();
                                    _g.label = 16;
                                case 16: return [3 /*break*/, 18];
                                case 17:
                                    err_6 = _g.sent();
                                    console.log(err_6, '94');
                                    return [2 /*return*/, { message: 'Something Went Wrong While finding Duplicate In the Database! ' + newPost.title }];
                                case 18: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.log(err_5, '100');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createNewPostByApi = function (newPost, dontSaveDuplicate, downloadImageContent) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_7;
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
                err_7 = _a.sent();
                parentPort.postMessage({ message: 'Something Went Wrong While running Saving Functions! ' + newPost.title });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var createMultiplePostsByAPI = function (newPost, dontSaveDuplicate, downloadImageContent) { var newPost_1, newPost_1_1; return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var post, e_1_1;
    var e_1, _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, 7, 12]);
                newPost_1 = tslib_1.__asyncValues(newPost);
                _b.label = 1;
            case 1: return [4 /*yield*/, newPost_1.next()];
            case 2:
                if (!(newPost_1_1 = _b.sent(), !newPost_1_1.done)) return [3 /*break*/, 5];
                post = newPost_1_1.value;
                return [4 /*yield*/, createNewPostByApi(post, dontSaveDuplicate, downloadImageContent)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [3 /*break*/, 1];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _b.trys.push([7, , 10, 11]);
                if (!(newPost_1_1 && !newPost_1_1.done && (_a = newPost_1.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _a.call(newPost_1)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
if (Array.isArray(workerData === null || workerData === void 0 ? void 0 : workerData.newPost)) {
    createMultiplePostsByAPI(workerData === null || workerData === void 0 ? void 0 : workerData.newPost, workerData === null || workerData === void 0 ? void 0 : workerData.dontSaveDuplicate, workerData === null || workerData === void 0 ? void 0 : workerData.downloadImageContent).catch(function (err) {
        parentPort.postMessage({ message: 'Something Went Wrong While running Creator! ' });
    });
}
else {
    createNewPostByApi(workerData === null || workerData === void 0 ? void 0 : workerData.newPost, workerData === null || workerData === void 0 ? void 0 : workerData.dontSaveDuplicate, workerData === null || workerData === void 0 ? void 0 : workerData.downloadImageContent).catch(function (err) {
        parentPort.postMessage({ message: 'Something Went Wrong While running Creator! ' });
    });
}
// parentPort.on("message", (commandFromMainThread) => {
//     if (commandFromMainThread.exit) {
//         process.exit(0);
//     }
// });
// if (req.body.downloadImageContent) {
// let thumbnailUrl = index.mainThumbnail
// const today = new Date(Date.now());
// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const directoryPath = './static/uploads/image/' + year + '/' + month + '/';
// const filePathOriginalSize = directoryPath + 'originalSize_' + index.title + Date.now() + '.jpg'
// const filePath = directoryPath + index.title + Date.now() + '.jpg'
// const options = {
//     url: index.mainThumbnail,
//     dest: filePathOriginalSize               // will be saved to /path/to/dest/image.jpg
// }
//
// download.image(options)
//     .then(({filename}) => {
//         sharp(filePathOriginalSize).resize(320, 180).toFile(filePath, async (err, info) => {
//             if (err) {
//                 res.status(500);
//             } else {
//                 fsExtra.remove(filePathOriginalSize)
//                 const editedNewPost = {
//                     ...index,
//                     lastModify: Date.now(),
//                     tags: index.tags ? await metasSaver(index.tags) : [],
//                     categories: index.categories ? await metasSaver(index.categories) : [],
//                     actors: index.actors ? await metasSaver(index.actors) : [],
//                     mainThumbnail: filePath.replace('./static/', '/static/')
//                 }
//                 const newPostDataToSave = new postSchema(editedNewPost);
//                 newPostDataToSave.save().then(savedPostData => {
//                     res.json({message: 'post ' + index.title + ' has been saved'})
//                 }).catch(err => {
//                     res.json({message: '****error!***** ' + 'post ' + index.title + ' Can not be save  in the Database'})
//                     res.status(500);
//                 })
//             }
//         })
//
//     })
//     .catch((err) => console.error(err))
//# sourceMappingURL=createNewPostByApi.js.map