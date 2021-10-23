const userSchema = require('../../../models/userSchema');


module.exports = async (req, res) =>{
    try{
        const unfriendSenderReqUser = req.userData;
        const unfriendReceiverUserId = req.body._id;
        const removerFriendFromSenderReqUser = await userSchema.findByIdAndUpdate(unfriendSenderReqUser._id,{$pull:{friends:unfriendReceiverUserId}},{new: true}).exec();
        const removerFriendFromReceiverReqUser = await userSchema.findByIdAndUpdate(unfriendReceiverUserId,{$pull:{friends:unfriendSenderReqUser._id}}).exec();

        Promise.all([removerFriendFromReceiverReqUser,removerFriendFromSenderReqUser]).then(actionsResults=>{
            const updatedRequestSenderData = {
                friends:actionsResults[1]?.friends || [],
                pendingReceivedFriendRequests:actionsResults[1]?.pendingReceivedFriendRequests || []
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