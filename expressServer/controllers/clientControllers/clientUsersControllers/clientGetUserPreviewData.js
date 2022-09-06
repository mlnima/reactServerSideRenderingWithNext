"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
//clientGetUserPreviewData
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientGetUserPreviewData = function (req, res) {
    var username = req.body.username;
    var _id = req.body._id;
    var defaultField = ['username', 'role', 'profileImage', 'coverImage'];
    var fields = req.body.fields ? tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(defaultField), false), tslib_1.__read(req.body.fields), false) : defaultField;
    userSchema_1.default.findOne({ $or: [{ username: username }, { _id: _id }] }).select(fields).exec().then(function (user) {
        res.json({ userData: user });
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
};
exports.default = clientGetUserPreviewData;
//# sourceMappingURL=clientGetUserPreviewData.js.map