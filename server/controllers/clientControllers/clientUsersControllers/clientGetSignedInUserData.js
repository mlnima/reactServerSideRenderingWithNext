//clientGetUserInfo
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const requestedFields = req?.body?.fields && req?.body?.fields.length > 0 ? req?.body?.fields.reduce((a, b) => ` ${a} , ` + ` ${b} , `) : '';

   // const requestedFields = (req?.body?.fields || []).reduce((a, b) => ` ${a} , ` + ` ${b} , `)

    userSchema.findById(req.userData._id).select(requestedFields).exec().then(user => {
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