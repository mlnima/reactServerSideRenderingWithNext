import {userSchema} from 'models';

const followUser = async (req, res) => {
    try {
        const senderFollowReqUser = req.userData;
        const receiverFollowReqUserId = req.body._id;

        await userSchema.findByIdAndUpdate(
            receiverFollowReqUserId, {$addToSet: {followers: senderFollowReqUser._id}}
        ).exec();

        await userSchema.findByIdAndUpdate(
            senderFollowReqUser._id, {$addToSet: {following: receiverFollowReqUserId}}, {new: true}
        ).exec();

        res.status(200).json({message: 'Followed successfully'});
    } catch (err) {
        console.log(err)
        res.status(500);
    }
}

export default followUser


// const updateReceiver = {
//     $addToSet: {followers: senderFollowReqUser._id},
// }
// const updateSender = {
//     $addToSet: {following: receiverFollowReqUserId},
//
// }
