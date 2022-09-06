"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientRegisterNewUser = function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    userSchema_1.default.findOne({ $or: [{ username: username }, { email: email }] }).exec()
        .then(function (user) {
        if (user) {
            res.status(409).json({ message: 'This username already exists' });
        }
        else {
            // Hashing
            if (password === password2) {
                bcryptjs_1.default.hash(password, 10, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.status(503).json({ message: 'Something went wrong please try again later' });
                    }
                    else if (hash) {
                        var userData = {
                            username: username,
                            email: email,
                            role: 'subscriber',
                            password: hash,
                            keyMaster: false
                        };
                        var newUserData = new userSchema_1.default(userData);
                        newUserData.save().then(function () {
                            res.json({ message: 'Your account has been successfully created you can login now' });
                        }).catch(function (err) {
                            console.log(err);
                            // res.json({ message: 'something went wrong', type: 'error' });
                            res.status(503).json({ message: 'Something went wrong please try again later' });
                        });
                    }
                });
            }
            else {
                res.status(400).json({ message: 'Passwords are not matched' });
            }
        }
    }).catch(function (err) {
        console.log(err);
        res.status(503).json({ message: 'Something went wrong please try again later' });
    });
};
exports.default = clientRegisterNewUser;
//# sourceMappingURL=clientRegisterNewUser.js.map