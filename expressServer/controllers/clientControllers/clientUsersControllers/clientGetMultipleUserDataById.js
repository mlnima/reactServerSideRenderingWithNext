//clientGetMultipleUserDataById
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const usersList = req.body.usersList

    userSchema.find({'_id': { $in: usersList}}).select('username role profileImage name lastName gender').exec().then(users=>{
        res.json({  users });

    }).catch(err => {
        console.log(err);
        res.status(500);

    })
}