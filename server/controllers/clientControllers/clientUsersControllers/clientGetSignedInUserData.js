//clientGetUserInfo
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.findById(req.userData._id).select(req?.body?.fields || ['username','role']).exec().then(user => {
        if (user){
            res.json({ userData: user });
        }else {
            res.status(404);
        }
    }).catch(err => {
        console.log(err);
        res.status(500);
    })
};