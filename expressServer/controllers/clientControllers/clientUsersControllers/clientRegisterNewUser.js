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
                res.status(409).json({message:'This username already exists'})
            } else {
                // Hashing
                if (password === password2) {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(503).json({message:'Something went wrong please try again later'})
                        } else if (hash) {
                            let userData = {
                                username: username,
                                email: email,
                                role: 'subscriber',
                                password: hash,
                                keyMaster:false
                            };
                            let newUserData = userSchema(userData);
                            newUserData.save().then(() => {
                                res.json({message:'Your account has been successfully created you can login now'})
                            }).catch(err => {
                                console.log(err)
                               // res.json({ message: 'something went wrong', type: 'error' });
                                res.status(503).json({message:'Something went wrong please try again later'})
                            });

                        }
                    });
                } else {

                    res.status(400).json({message:'Passwords are not matched'})

                }

            }
        }).catch(err => {
        console.log(err);
        res.status(503).json({message:'Something went wrong please try again later'})

    })
}