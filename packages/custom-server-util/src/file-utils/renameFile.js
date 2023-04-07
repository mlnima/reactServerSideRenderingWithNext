"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var fs = require('fs').promises;
var path = require('path');
var renameFile = function (oldPath, newBaseName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ext, dir, newPath, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ext = path.extname(oldPath);
                dir = path.dirname(oldPath);
                newPath = path.join(dir, newBaseName + ext);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.rename(oldPath, newPath)];
            case 2:
                _a.sent();
                return [2 /*return*/, newPath];
            case 3:
                error_1 = _a.sent();
                console.error('Error renaming file:', error_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports["default"] = renameFile;
