//clientSendFriendRequest
const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) =>{
    try{
        const senderFriendReqUser = req.userData;
        const receiverFriendReqUserId = req.body._id;
        const updateReceiverFriendReqData = await userSchema.findByIdAndUpdate(receiverFriendReqUserId,{$addToSet:{pendingReceivedFriendRequests:[senderFriendReqUser._id]}}).exec();
        const updateSenderFriendReqData = await userSchema.findByIdAndUpdate(senderFriendReqUser._id,{$addToSet:{pendingSentFriendRequests:[receiverFriendReqUserId]}}, {new: true}).exec();
        Promise.all([updateReceiverFriendReqData,updateSenderFriendReqData]).then(actionsResults=>{
            const updatedRequestSenderData = {
                pendingSentFriendRequests:actionsResults[1]?.pendingSentFriendRequests || []
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