"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var removeFileExtension = function (fileName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var index = fileName.lastIndexOf('.');
                if (index > 0 && index < fileName.length - 1) {
                    var fileNameWithoutExtension = fileName.substring(0, index);
                    resolve(fileNameWithoutExtension);
                }
                else {
                    reject(new Error('File name has no extension.'));
                }
            })];
    });
}); };
exports["default"] = removeFileExtension;
