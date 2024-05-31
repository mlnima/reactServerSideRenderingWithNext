import {UserSchema} from 'shared-schemas';

const getUsers = async (req, res) => {
    try {
        const limit = (req.query?.size || 20);
        const skip = (limit * (req.query?.page || 1)) - limit
        const totalCount = await UserSchema.countDocuments({}).exec()
        const users = await UserSchema.find({}).sort({ createdAt: -1 }).limit(limit).skip(skip).exec()
        res.json({users, totalCount})
    } catch (error) {
        console.log(error)
        res.end()
    }
};

export default getUsers