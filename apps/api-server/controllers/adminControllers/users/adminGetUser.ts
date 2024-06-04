
import userSchema from "@schemas/userSchema";

const adminGetUser = (req, res) => {
    userSchema.findById(req.query._id).exec().then(user => {
        res.json({user});
    })
}

export default adminGetUser;