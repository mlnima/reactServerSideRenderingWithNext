"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminReadPath = function (req, res) {
    var path = req.body.path;
    fs_1.default.readdir(path, function (err, data) {
        if (err) {
            if (err.code === 'ENOTDIR') {
                fs_1.default.readFile(path, function (err, fileData) {
                    if (err) {
                        res.json({ error: true, data: [], type: undefined });
                    }
                    else {
                        res.json({ error: true, data: fileData.toString('utf8'), type: 'file' });
                    }
                });
            }
            else {
                res.json({ error: true, data: [], type: undefined });
            }
        }
        else {
            res.json({ error: false, data: data, type: 'dir' });
        }
    });
};
exports.default = adminReadPath;
//# sourceMappingURL=adminReadPath.js.map