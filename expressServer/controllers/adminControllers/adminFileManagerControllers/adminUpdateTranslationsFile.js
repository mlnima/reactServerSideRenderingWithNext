"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var adminUpdateTranslationsFile = function (req, res) {
    var path = req.body.path;
    var data = req.body.data;
    fs_1.default.writeFile(path, data, function (err) {
        if (err) {
            // fs.writeFile(path, data,{ flag: 'a'},(err)=>{
            //     if (err){
            //         res.json({ message: 'file did not updated',err});
            //         res.end()
            //     }else {
            //         res.json({ message: 'file updated'});
            //         res.end()
            //     }
            //
            // })
        }
        else {
            res.json({ message: 'file updated' });
        }
    });
};
exports.default = adminUpdateTranslationsFile;
//# sourceMappingURL=adminUpdateTranslationsFile.js.map