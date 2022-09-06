"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var adminUploadFiles = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var file, fileType, today, year, month, directoryPath;
    return tslib_1.__generator(this, function (_a) {
        file = req.files.uploadingFile;
        fileType = file.mimetype.split('/')[0];
        today = new Date(Date.now());
        year = today.getFullYear();
        month = today.getMonth() + 1;
        directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/';
        fs_extra_1.default.ensureDir(directoryPath).then(function () {
            var filePath = directoryPath + file.name;
            var filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
            if (fileType === 'image') {
                file.mv(filePathOriginalSize, function (err) {
                    if (err) {
                        console.log(err);
                        res.json({ response: 'something is wrong', type: 'error', error: err });
                    }
                    else {
                        var imageHeight = req.body.type === 'thumbnail' ? 180 :
                            req.body.type === 'gallery' ? 720 : 720;
                        var imageWidth = req.body.type === 'thumbnail' ? 320 :
                            req.body.type === 'gallery' ? 1280 : 1280;
                        (0, sharp_1.default)(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, function (err, info) {
                            if (err) {
                                console.log(err);
                                res.status(500);
                            }
                            else {
                                fs_extra_1.default.remove(filePathOriginalSize);
                                res.json({ response: 'Uploaded', path: filePath });
                            }
                        });
                    }
                });
            }
            else {
                file.mv(filePath, function (err) {
                    if (err) {
                        console.log(err);
                        res.json({ response: 'something is wrong', type: 'error', error: err });
                    }
                    else {
                        res.json({ response: 'Uploaded', path: filePath });
                    }
                });
            }
        }).catch(function (err) {
            console.log(err);
            res.end();
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminUploadFiles;
//# sourceMappingURL=adminUploadFiles.js.map