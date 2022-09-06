"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientResetUserPassword = function (req, res) {
    var userId = req.userData._id;
    if (!userId)
        return res.status(403).json({ message: 'Unauthorized Access' });
    userSchema_1.default.findById(userId).exec().then(function (userData) {
        bcryptjs_1.default.compare(req.body.data.password, userData.password, function (err, isCorrect) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(err || isCorrect === false)) return [3 /*break*/, 1];
                            res.status(403).json({ message: 'Wrong Password' });
                            return [3 /*break*/, 4];
                        case 1:
                            if (!isCorrect) return [3 /*break*/, 4];
                            if (!(req.body.data.newPassword === req.body.data.repeatNewPassword)) return [3 /*break*/, 3];
                            return [4 /*yield*/, bcryptjs_1.default.hash(req.body.data.newPassword, 10, function (err, hash) {
                                    if (err) {
                                        console.log(err);
                                        res.status(400).json({ message: 'Something went wrong please try again later' });
                                    }
                                    else if (hash) {
                                        userSchema_1.default.findByIdAndUpdate(userId, { $set: { password: hash } }, { new: true }).exec().then(function () {
                                            res.json({ message: 'Your Password Has Been Changed' });
                                        });
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            res.status(400).json({ message: 'Mismatch Passwords' });
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        });
    });
};
exports.default = clientResetUserPassword;
//# sourceMappingURL=clientResetUserPassword.js.map