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
                        console.log(err)
                        res.status(401).json({message:'You have entered an invalid username or password'})
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
                            message: 'Login successful',
                        });

                        res.end()
                    }

                })
            } else if (!user) {

                res.status(404).json({message:'You have entered an invalid username or password'})
                res.end()
            }
        }).catch(err => {
            console.log(err);
            res.status(503).json({message:'Something went wrong please try again later'})
            res.json({ response: 'server Error !', type: 'error' })
        })
};