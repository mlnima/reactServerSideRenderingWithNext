const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.findById(req.body._id).exec().then(user => {
        res.json({ user });
    })
}