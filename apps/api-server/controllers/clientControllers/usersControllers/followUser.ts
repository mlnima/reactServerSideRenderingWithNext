import { userSchema } from 'models';
import mongoose from 'mongoose';

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


// import {userSchema} from 'models';
//
// const followUser = async (req, res) => {
//     try {
//         const senderFollowReqUser = req.userData;
//         const receiverFollowReqUserId = req.body._id;
//         await userSchema.findByIdAndUpdate(
//             receiverFollowReqUserId, {$addToSet: {followers: senderFollowReqUser._id}}
//         ).exec();
//
//         await userSchema.findByIdAndUpdate(
//             senderFollowReqUser._id, {$addToSet: {following: receiverFollowReqUserId}}, {new: true}
//         ).exec();
//
//         res.status(200).json({message: 'Followed successfully'});
//     } catch (err) {
//         console.log(err)
//         res.status(500);
//     }
// }
//
// export default followUser


// const updateReceiver = {
//     $addToSet: {followers: senderFollowReqUser._id},
// }
// const updateSender = {
//     $addToSet: {following: receiverFollowReqUserId},
//
// }
