"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientGetMultipleUserDataById = function (req, res) {
    var usersList = req.body.usersList;
    userSchema_1.default.find({ '_id': { $in: usersList } }).select('username role profileImage name lastName gender').exec().then(function (users) {
        res.json({ users: users });
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
};
exports.default = clientGetMultipleUserDataById;
//# sourceMappingURL=clientGetMultipleUserDataById.js.map