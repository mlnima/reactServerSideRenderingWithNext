const bcrypt = require('bcryptjs');
const userSchema = require('../../../models/userSchema');

module.exports =  (req, res) =>{
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
                                role: 'subscriber',
                                password: hash,
                            };
                            let newUserData = userSchema(userData);
                            newUserData.save().then(() => {
                                console.log(userData.username, ' registered')
                                res.json({ response: 'You are Registered', type: 'success' });
                                res.end()
                            }).catch(err => {
                                console.log(err)
                                res.json({ response: 'something went wrong', type: 'error' });
                                res.end()
                            });

                        }
                    });
                } else {
                    res.json({ response: 'Password Mismatch', type: 'error' });
                    res.end()
                }

            }
        }).catch(err => {
        console.log(err);
        res.json({ response: 'server Error', type: 'error' });
        res.end()
    })
}