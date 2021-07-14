//clientGetUserInfo
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
   // const requestedFields = (req?.body?.fields || []).reduce((a, b) => ` ${a} , ` + ` ${b} , `)

    userSchema.findById(req.userData._id).exec().then(user => {
        let userDataToSend = user.toObject()
        delete userDataToSend.password
        res.json({ userData: userDataToSend });
        res.end()
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        res.end()
    })
};