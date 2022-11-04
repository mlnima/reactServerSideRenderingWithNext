import {userSchema} from 'models';

const clientGetUsersList = (req, res) => {
    userSchema.find({}).exec().then(users => {
        res.json({ users });

    })
};

export default clientGetUsersList