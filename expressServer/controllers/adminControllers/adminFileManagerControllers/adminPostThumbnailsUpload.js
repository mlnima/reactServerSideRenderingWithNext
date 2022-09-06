"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var adminPostThumbnailsUpload = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var file, fileType, today, year, month, directoryPath;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.uploadingFile;
        fileType = file.mimetype.split('/')[0];
        today = new Date(Date.now());
        year = today.getFullYear();
        month = today.getMonth() + 1;
        directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';
        fs_extra_1.default.ensureDir(directoryPath).then(function () {
            var filePath = directoryPath + file.name;
            var filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
            file.mv(filePathOriginalSize, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ response: 'something is wrong', type: 'error', error: err });
                }
                else {
                    (0, sharp_1.default)(filePathOriginalSize).resize(320, 240).toFile(filePath, function (err, info) {
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
        }).catch(function (err) {
            console.log(err);
            res.end();
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminPostThumbnailsUpload;
//# sourceMappingURL=adminPostThumbnailsUpload.js.map