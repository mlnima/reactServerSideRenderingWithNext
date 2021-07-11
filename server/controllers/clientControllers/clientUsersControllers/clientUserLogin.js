//clientUserLogin
const userSchema = require('../../../models/userSchema');
const jwt = require('jsonwebtoken');
const tokenExpireTime = '30 days';
const bcrypt = require('bcryptjs');


module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await userSchema.findOne({ username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, isCorrect) {
                    if (err || isCorrect === false ) {
                        console.log( err)
                        res.json({ response: 'wrong username or password !', type: 'error' });
                        res.end()
                    } else if (isCorrect) {
                        const token = jwt.sign({
                                username: user.username,
                                _id: user._id,
                            },
                            process.env.REACT_APP_JWT_KEY,
                            { expiresIn: tokenExpireTime });
                        res.json({
                            token: token,
                            response: 'successfully logged in ',
                            type: 'success'
                        });

                        res.end()
                    }

                })
            } else if (!user) {
                res.json({ response: 'account with this Username does not exist !', type: 'error' });
                res.end()
            }
        }).catch(err => {
            console.log(err);
            res.json({ response: 'server Error !', type: 'error' })
        })
};