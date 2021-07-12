const userSchema = require('../../../models/userSchema');


module.exports = async (req, res) =>{
    try{
        const acceptedFriendReqUser = req.userData;
        const senderFriendReqUserId = req.body._id;
        const updateAcceptedFriendReqData = await userSchema.findByIdAndUpdate(acceptedFriendReqUser._id,{$addToSet:{friends:[senderFriendReqUserId]}},{new: true}).exec();
        const updateSenderFriendReqData = await userSchema.findByIdAndUpdate(senderFriendReqUserId,{$addToSet:{friends:[acceptedFriendReqUser._id]}} ).exec();

        const removerSenderRequestFromReceiver = await userSchema.findByIdAndUpdate(acceptedFriendReqUser._id,{$pull:{pendingReceivedFriendRequests :senderFriendReqUserId}}).exec();
        const removerReceiverRequestFromSender = await userSchema.findByIdAndUpdate(senderFriendReqUserId,{$pull:{pendingSentFriendRequests:acceptedFriendReqUser._id}}).exec();


        Promise.all([updateSenderFriendReqData,updateAcceptedFriendReqData,removerSenderRequestFromReceiver,removerReceiverRequestFromSender]).then(actionsResults=>{
            const updatedRequestSenderData = {
                friends:actionsResults[1]?.friends || [],
                pendingReceivedFriendRequests:actionsResults[1]?.pendingReceivedFriendRequests || []
            }
            res.json({ updatedRequestSenderData });
            res.end();
        }).catch(err=>{
            console.log(err)
            res.sendStatus(500);
            res.end()
        })


    }catch (err) {
        console.log(err)
        res.sendStatus(500);
        res.end()
    }
}