"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminDeleteFile = function (req, res) {
    var filePath = req.body.filePath;
    fs_1.default.unlink(filePath, function (err) {
        if (err) {
            res.json({ error: true, data: 'something happened', type: undefined });
        }
        else {
            res.json({ error: false, data: 'deleted' });
        }
    });
};
exports.default = adminDeleteFile;
//# sourceMappingURL=adminDeleteFile.js.map