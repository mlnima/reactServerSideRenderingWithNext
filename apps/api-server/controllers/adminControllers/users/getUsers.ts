import userSchema from "@schemas/userSchema";

const getUsers = async (req, res) => {
    try {
        const limit = (req.query?.size || 20);
        const skip = (limit * (req.query?.page || 1)) - limit
        const totalCount = await userSchema.countDocuments({}).exec()
        const users = await userSchema.find({}).sort({ createdAt: -1 }).limit(limit).skip(skip).exec()
        res.json({users, totalCount})
    } catch (error) {
        console.log(error)
        res.end()
    }
};

export default getUsers