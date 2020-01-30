let userControllers = {};
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
const tokenExpireTime = '24h';

userControllers.register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    userSchema.findOne({ $or: [ { username }, { email } ] }).exec()
        .then(user => {
            if (user) {
                res.json({ response: 'exist', type: 'error' });
                res.end()
            } else {
                // Hashing
                if (password === password2) {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.json({ response: 'bcrypt', type: 'error' });
                            res.end()
                        } else if (hash) {
                            let userData = {
                                username: username,
                                email: email,
                                password: hash,
                            };
                            let newUserData = userSchema(userData);
                            newUserData.save().then(() => {
                                console.log(userData.username, ' registered')

                            }).catch(err => {
                                console.log(err)
                            });
                            res.json({ response: 'registered', type: 'success' });
                            res.end()
                        }
                    });
                } else {
                    res.json({ response: 'passwordMismatch', type: 'error' });
                    res.end()
                }

            }
        }).catch(err => {
        console.log(err);
        res.json({ response: 'serverError', type: 'error' });
        res.end()
    })

};

userControllers.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await userSchema.findOne({ username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, isCorrect) {
                    if (err || isCorrect === false) {
                        res.json({ response: 'wrong username or password', type: 'error' });
                        res.end()
                    } else if (isCorrect) {
                        const token = jwt.sign({
                                username: user.username,
                                _id: user._id,
                            },
                            process.env.JWT_KEY,
                            { expiresIn: tokenExpireTime });
                        res.json({
                            token: token,
                            response: 'loggedIn',
                            type: 'success'
                        });

                        res.end()
                    }

                })
            } else if (!user) {
                res.json({ response: 'notExist', type: 'error' });
                res.end()
            }
        }).catch(err => {
            console.log( err)
            res.json({ response: 'serverError', type: 'error' })
        })
};

module.exports = userControllers;