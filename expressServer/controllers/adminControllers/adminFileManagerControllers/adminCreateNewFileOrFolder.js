"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminCreateNewFileOrFolder = function (req, res) {
    var Path = req.body.Path === '.' ? './' : req.body.Path;
    var fileFolderName = req.body.fileFolderName;
    var type = req.body.type;
    if (type === 'file') {
        fs_1.default.writeFile(Path + '/' + fileFolderName, '', function (err) {
            if (err) {
                console.log(err);
            }
            else {
            }
        });
    }
    else {
        fs_1.default.mkdirSync(Path + '/' + fileFolderName);
    }
    res.end();
};
exports.default = adminCreateNewFileOrFolder;
//# sourceMappingURL=adminCreateNewFileOrFolder.js.map