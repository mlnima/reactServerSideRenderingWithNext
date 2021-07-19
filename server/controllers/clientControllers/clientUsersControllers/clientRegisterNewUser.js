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

                res.status(409).json({message:'user with this email or username already exist'})
                res.end()
            } else {
                // Hashing
                if (password === password2) {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(503).json({message:'something went wrong please try again later'})
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
                                res.json({message:'registration successful you can login now'})
                                res.end()
                            }).catch(err => {
                                console.log(err)
                                res.json({ message: 'something went wrong', type: 'error' });
                                res.status(503).json({message:'something went wrong please try again later'})
                                res.end()
                            });

                        }
                    });
                } else {

                    res.status(400).json({message:'passwords are not matched'})
                    res.end()
                }

            }
        }).catch(err => {
        console.log(err);
        res.status(503).json({message:'something went wrong please try again later'})
        res.end()
    })
}