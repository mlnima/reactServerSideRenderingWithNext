//ClientFollowUser
const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) => {
    try{
        const senderFollowReqUser = req.userData;
        const receiverFollowReqUserId = req.body._id;
        const updateReceiver = {
            $addToSet: {followers: [senderFollowReqUser._id]},
            $inc: {followersCount: 1}
        }
         const updateSender = {
             $addToSet:{following:[receiverFollowReqUserId]},
             $inc: {followingCount: 1}
         }

        const updateReceiverFollowReqData = await userSchema.findByIdAndUpdate(receiverFollowReqUserId,updateReceiver).exec();
        const updateSenderFollowReqData = await userSchema.findByIdAndUpdate(senderFollowReqUser._id,updateSender, {new: true}).exec();
        Promise.all([updateReceiverFollowReqData,updateSenderFollowReqData]).then(actionsResults=>{
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