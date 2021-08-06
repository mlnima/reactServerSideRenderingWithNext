//adminDeleteUser

const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    userSchema.findByIdAndDelete(req.body.id).exec().then(() => {
        res.json({ message:'user deleted' });
        res.end
    })
};