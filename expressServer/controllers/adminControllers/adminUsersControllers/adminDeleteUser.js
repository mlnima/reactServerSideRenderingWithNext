"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var adminDeleteUser = function (req, res) {
    userSchema_1.default.findByIdAndDelete(req.body.id).exec().then(function () {
        res.json({ message: 'user deleted' });
    });
};
exports.default = adminDeleteUser;
//# sourceMappingURL=adminDeleteUser.js.map