//clientGetUserInfo
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.findById(req.userData._id).select(req?.body?.fields || ['username','role']).exec().then(user => {
        if (user){
            res.json({ userData: user });
            res.end()
        }else {
            res.sendStatus(404);
            res.end()
        }

    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        res.end()
    })
};