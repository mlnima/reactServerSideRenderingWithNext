//clientGetMultipleUserDataById
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const usersList = req.body.usersList

    userSchema.find({'_id': { $in: usersList}}).select('username role profileImage name lastName gender').exec().then(users=>{
        res.json({  users });
        res.end()
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        res.end()
    })
}