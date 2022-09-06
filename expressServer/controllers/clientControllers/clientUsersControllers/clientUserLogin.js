"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
var tokenExpireTime = '30 days';
var clientUserLogin = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var username, password;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                return [4 /*yield*/, userSchema_1.default.findOne({ username: username })
                        .then(function (user) {
                        if (user) {
                            bcryptjs_1.default.compare(password, user.password, function (err, isCorrect) {
                                if (err || isCorrect === false) {
                                    console.log(err);
                                    res.status(401).json({ message: 'You have entered an invalid username or password' });
                                }
                                else if (isCorrect) {
                                    var token = jsonwebtoken_1.default.sign({
                                        username: user.username,
                                        _id: user._id,
                                    }, process.env.JWT_KEY, { expiresIn: tokenExpireTime });
                                    res.json({
                                        token: token,
                                        username: user.username,
                                        role: user.role,
                                        keyMaster: user.keyMaster,
                                        profileImage: user.profileImage,
                                        //@ts-ignore
                                        coverImage: user.coverImage,
                                        _id: user._id,
                                        message: 'Login successful',
                                    });
                                }
                            });
                        }
                        else if (!user) {
                            res.status(404).json({ message: 'You have entered an invalid username or password' });
                        }
                    }).catch(function (err) {
                        console.log(err);
                        res.status(503).json({ message: 'Something went wrong please try again later' });
                        res.json({ response: 'expressServer Error !', type: 'error' });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = clientUserLogin;
//# sourceMappingURL=clientUserLogin.js.map