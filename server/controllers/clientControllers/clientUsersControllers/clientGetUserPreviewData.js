//clientGetUserPreviewData
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.findOne({username: req.body.username}).select('username role profileImage coverImage friends').exec().then(user=>{
        res.json({ userData: user });
        res.end()
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        res.end()
    })
}