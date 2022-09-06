"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientUserImageUpload = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var file, userId, directoryPath, filePath, filePathOriginalSize;
    return tslib_1.__generator(this, function (_a) {
        file = req.files.profileImage;
        userId = req.userData._id;
        directoryPath = './public/uploads/users/' + userId + '/';
        filePath = directoryPath + file.name + '.png';
        filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
        fs_extra_1.default.ensureDir(directoryPath).then(function () {
            file.mv(filePathOriginalSize, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ response: 'something is wrong', type: 'error', error: err });
                }
                else {
                    var imageHeight = req.body.type === 'profile' ? 180 :
                        req.body.type === 'cover' ? 312 : 720;
                    var imageWidth = req.body.type === 'profile' ? 180 :
                        req.body.type === 'cover' ? 820 : 1280;
                    (0, sharp_1.default)(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, function (err, info) {
                        if (err) {
                            console.log(err);
                            res.status(500);
                        }
                        else {
                            var imageUrl_1 = process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.', '');
                            userSchema_1.default.findByIdAndUpdate(req.userData._id, { profileImage: imageUrl_1 }).exec().then(function () {
                                fs_extra_1.default.remove(filePathOriginalSize);
                                res.json({ response: 'Uploaded', path: imageUrl_1 });
                            }).catch(function () {
                                res.status(500);
                            });
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
exports.default = clientUserImageUpload;
//# sourceMappingURL=clientUserImageUpload.js.map