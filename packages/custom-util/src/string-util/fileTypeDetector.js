"use strict";
exports.__esModule = true;
var fileTypeDetector = function (fileName) {
    var splitFileName = fileName.split('.');
    var fileFormat = splitFileName[(splitFileName === null || splitFileName === void 0 ? void 0 : splitFileName.length) - 1].toLowerCase();
    var finalFormat = '';
    var fileFormats = {
        image: ['jpg', 'png', 'jpeg', 'svg'],
        video: ['mp4', '3gp'],
        document: ['js', 'css', 'env', 'scss', 'txt'],
        application: ['exe'],
        archive: ['zip', 'rar']
    };
    Object.keys(fileFormats).forEach(function (formatArr) {
        //@ts-ignore
        if (fileFormats === null || fileFormats === void 0 ? void 0 : fileFormats[formatArr].includes(fileFormat)) {
            finalFormat = formatArr;
        }
    });
    return finalFormat;
};
exports["default"] = fileTypeDetector;
