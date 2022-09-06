"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminReadTranslationsFile = function (req, res) {
    var path = req.body.path;
    fs_1.default.readFile(path, function (err, fileData) {
        if (err) {
            console.log(err);
            res.json({ error: true, data: '', type: undefined });
        }
        else {
            res.json({ error: false, data: fileData.toString('utf8'), type: 'file' });
        }
    });
};
exports.default = adminReadTranslationsFile;
//# sourceMappingURL=adminReadTranslationsFile.js.map