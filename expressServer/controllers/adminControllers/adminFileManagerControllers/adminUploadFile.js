"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var adminUploadFile = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var file, fileType, desiredMode, options, today, year, month, directoryPath;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.uploadingFile;
        fileType = file.mimetype.split('/')[0];
        desiredMode = 1533;
        options = {
            mode: 1533
        };
        today = new Date(Date.now());
        year = today.getFullYear();
        month = today.getMonth() + 1;
        directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/';
        fs_extra_1.default.ensureDir(directoryPath).then(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var filePath_1, fileExist, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath_1 = directoryPath + file.name;
                        fileExist = fs_1.default.existsSync(filePath_1);
                        if (!fileExist) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.unlinkSync(filePath_1)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        file.mv(filePath_1, function (err) {
                            if (err) {
                                res.json({ response: 'something is wrong', type: 'error', error: err });
                            }
                            else {
                                res.json({ response: 'Uploaded', path: filePath_1 });
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (err) {
            console.log(err);
            res.end();
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminUploadFile;
//# sourceMappingURL=adminUploadFile.js.map