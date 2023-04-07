import {userSchema} from 'models';

const unfollowUser = async (req, res) => {
    try{
        const senderUnFollowReqUser = req.userData;
        const receiverUnFollowReqUserId = req.body._id;

        const updateReceiver = {
            $pull:{followers:senderUnFollowReqUser._id},
            $inc: {followersCount: -1}
        }
        const updateSender = {
            $pull:{following:receiverUnFollowReqUserId},
            $inc: {followingCount: -1}
        }


        const updateReceiverUnFollowReqData = await userSchema.findByIdAndUpdate(receiverUnFollowReqUserId,updateReceiver).exec();
        const updateSenderUnFollowReqData = await userSchema.findByIdAndUpdate(senderUnFollowReqUser._id,updateSender, {new: true}).exec();

        Promise.all([updateReceiverUnFollowReqData,updateSenderUnFollowReqData]).then(actionsResults=>{
            const updatedRequestSenderData = {
                following:actionsResults[1]?.following || []
            }

            res.json({ updatedRequestSenderData });

        }).catch(err=>{
            console.log(err)
            res.status(500);

        })
    }catch (err) {
        console.log(err)
        res.status(500);
    }

}

export default unfollowUser;