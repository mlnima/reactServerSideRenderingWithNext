//adminGetUsersList
const userSchema = require('../../../models/userSchema');


module.exports = async (req, res) => {
    const totalCount = await userSchema.countDocuments({}).exec()
    userSchema.find({}).exec().then(users => {
        res.json({ users,totalCount });
    })
};