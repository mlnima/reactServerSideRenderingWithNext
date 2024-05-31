import {UserSchema} from 'shared-schemas';

const adminGetUser = (req, res) => {
    UserSchema.findById(req.query._id).exec().then(user => {
        res.json({user});
    })
}

export default adminGetUser;