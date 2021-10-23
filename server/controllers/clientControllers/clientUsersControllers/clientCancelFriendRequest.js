const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) =>{
    try{
        const acceptedFriendReqUser = req.userData;
        const senderFriendReqUserId = req.body._id;

        const removerSenderRequestFromReceiver = await userSchema.findByIdAndUpdate(senderFriendReqUserId ,{$pull:{pendingReceivedFriendRequests :acceptedFriendReqUser._id}}).exec();
        const removerReceiverRequestFromSender = await userSchema.findByIdAndUpdate(acceptedFriendReqUser._id,{$pull:{pendingSentFriendRequests:senderFriendReqUserId}},{new:true}).exec();


        Promise.all([removerSenderRequestFromReceiver,removerReceiverRequestFromSender]).then(actionsResults=>{
            const updatedRequestSenderData = {
                friends:actionsResults[1]?.friends || [],
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