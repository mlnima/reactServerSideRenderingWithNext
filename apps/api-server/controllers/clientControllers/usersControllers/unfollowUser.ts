import {userSchema} from 'models';

const unfollowUser = async (req, res) => {
    try {
        const senderUnFollowReqUser = req.userData;
        const receiverUnFollowReqUserId = req.body._id;

        await userSchema.findByIdAndUpdate(
            receiverUnFollowReqUserId, {$pull: {followers: senderUnFollowReqUser._id}}
        ).exec();

        await userSchema.findByIdAndUpdate(
            senderUnFollowReqUser._id, {$pull: {following: receiverUnFollowReqUserId}}, {new: true}
        ).exec();

        res.status(200).json({message: 'Unfollowed successfully'});
    } catch (err) {
        console.log(err)
        res.status(500);
    }

}

export default unfollowUser;