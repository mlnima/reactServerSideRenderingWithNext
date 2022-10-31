import {userSchema} from 'models';

const clientGetUserData = (req, res) => {
    userSchema.findById(req.body._id).exec().then(user => {
        res.json({ user });
    })
}

export default clientGetUserData;