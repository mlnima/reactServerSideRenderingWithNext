import userSchema from '../../../../../packages/models/src/userSchema';

const adminGetUser = (req, res) => {
    userSchema.findById(req.body._id).exec().then(user => {
        res.json({user});
    })
}

export default adminGetUser;