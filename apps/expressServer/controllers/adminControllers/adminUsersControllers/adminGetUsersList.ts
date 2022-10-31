import userSchema from '../../../../../packages/models/src/userSchema';

const adminGetUsersList = async (req, res) => {
    const totalCount = await userSchema.countDocuments({}).exec()
    userSchema.find({}).exec().then(users => {
        res.json({ users,totalCount });
    })
};

export default adminGetUsersList