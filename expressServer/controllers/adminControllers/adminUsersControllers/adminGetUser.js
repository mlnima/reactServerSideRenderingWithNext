"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var adminGetUser = function (req, res) {
    userSchema_1.default.findById(req.body._id).exec().then(function (user) {
        res.json({ user: user });
    });
};
exports.default = adminGetUser;
//# sourceMappingURL=adminGetUser.js.map