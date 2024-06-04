
import mongoose from 'mongoose';
import userSchema from "@schemas/userSchema";

const followUser = async (req, res) => {
    try {
        const senderFollowReqUser = req.userData;
        const receiverFollowReqUserId = new mongoose.Types.ObjectId(req.body._id);
        const senderFollowReqUserId = new mongoose.Types.ObjectId(senderFollowReqUser._id);

        await userSchema.findByIdAndUpdate(
            receiverFollowReqUserId,
            { $addToSet: { followers: senderFollowReqUserId } }
        ).exec();

        await userSchema.findByIdAndUpdate(
            senderFollowReqUserId,
            { $addToSet: { following: receiverFollowReqUserId } },
            { new: true }
        ).exec();

        res.status(200).json({ message: 'Followed successfully' });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

export default followUser;


