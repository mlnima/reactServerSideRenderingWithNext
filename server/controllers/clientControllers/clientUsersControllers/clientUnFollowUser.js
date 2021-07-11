//clientUnFollowUser
const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) => {
    try{
        const senderUnFollowReqUser = req.userData;
        const receiverUnFollowReqUserId = req.body._id;
        const updateReceiverUnFollowReqData = await userSchema.findByIdAndUpdate(receiverUnFollowReqUserId,{$pull:{followers:senderUnFollowReqUser._id}}).exec();
        const updateSenderUnFollowReqData = await userSchema.findByIdAndUpdate(senderUnFollowReqUser._id,{$pull:{following:receiverUnFollowReqUserId}}, {new: true}).exec();
        Promise.all([updateReceiverUnFollowReqData,updateSenderUnFollowReqData]).then(actionsResults=>{
            const updatedRequestSenderData = {
                following:actionsResults[1]?.following || []
            }
            console.log(actionsResults)
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