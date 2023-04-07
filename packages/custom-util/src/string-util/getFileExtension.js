"use strict";
exports.__esModule = true;
var getFileExtension = function (fileName) {
    try {
        return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    }
    catch (error) {
        return fileName;
    }
};
exports["default"] = getFileExtension;
