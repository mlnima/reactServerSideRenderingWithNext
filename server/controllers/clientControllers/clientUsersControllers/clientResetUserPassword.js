//ClientResetUserPassword
const bcrypt = require('bcryptjs');
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const userId = req.userData._id
    userSchema.findById(userId).exec().then(userData => {

        bcrypt.compare(req.body.oldPass, userData.password, async function (err, isCorrect) {
            if (err || isCorrect === false) {
                res.json({ response: 'Old Password is wrong !', type: 'error' });
                res.end()
            } else if (isCorrect) {
                if (req.body.newPass === req.body.newPass2) {
                    await bcrypt.hash(req.body.newPass, 10, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.json({ response: 'Something Went Wrong', type: 'error' });
                            res.end()
                        } else if (hash) {
                            userSchema.findByIdAndUpdate(userId, { $set: { password: hash } },{new:true}).exec().then(()=>{
                                res.json({ response: 'Password Is Changed', type: 'success' });
                                res.end()
                            })
                        }
                    });

                } else {
                    res.json({ response: 'new Passwords are not match !', type: 'error' });
                    res.end()
                }

            }
        })
    })

}