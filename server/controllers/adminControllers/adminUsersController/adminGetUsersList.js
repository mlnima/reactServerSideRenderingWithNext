//adminGetUsersList
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.find({}).exec().then(users => {
        res.json({ users });
        res.end
    })
};