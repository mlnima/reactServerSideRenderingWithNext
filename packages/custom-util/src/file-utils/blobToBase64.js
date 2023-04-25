"use strict";
exports.__esModule = true;
var blobToBase64 = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        //@ts-ignore
        reader.onloadend = function () { return resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
exports["default"] = blobToBase64;
