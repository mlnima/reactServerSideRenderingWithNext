"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var adminUpdateUserData = function (req, res) {
    var userID = req.body.data._id;
    userSchema_1.default.findByIdAndUpdate(userID, tslib_1.__assign({}, req.body.data), { new: true }).exec().then(function (savedData) {
        res.json({ updatedData: savedData });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = adminUpdateUserData;
//# sourceMappingURL=adminUpdateUserData.js.map