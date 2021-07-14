//clientGetUserPreviewData
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const username  =  req.body.username;
    const _id = req.body._id;
    userSchema.findOne({$or:[{username},{_id}]}).select('username role profileImage coverImage friends').exec().then(user=>{
        res.json({ userData: user });
        res.end()
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        res.end()
    })
}