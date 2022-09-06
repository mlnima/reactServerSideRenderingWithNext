"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientGetUsersList = function (req, res) {
    userSchema_1.default.find({}).exec().then(function (users) {
        res.json({ users: users });
    });
};
exports.default = clientGetUsersList;
//# sourceMappingURL=clientGetUsersList.js.map