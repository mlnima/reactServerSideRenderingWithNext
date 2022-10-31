
import userSchema from '../../../../../packages/models/src/userSchema';

const clientGetUsersList = (req, res) => {
    userSchema.find({}).exec().then(users => {
        res.json({ users });

    })
};

export default clientGetUsersList