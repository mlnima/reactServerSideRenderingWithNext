"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientGetSignedInUserData = function (req, res) {
    var _a;
    userSchema_1.default.findById(req.userData._id).select(((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.fields) || ['username', 'role']).exec().then(function (user) {
        if (user) {
            res.json({ userData: user });
        }
        else {
            res.status(404);
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
};
exports.default = clientGetSignedInUserData;
//# sourceMappingURL=clientGetSignedInUserData.js.map