//ClientFollowUser
const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) => {
    try{
        const senderFollowReqUser = req.userData;
        const receiverFollowReqUserId = req.body._id;
        const updateReceiverFollowReqData = await userSchema.findByIdAndUpdate(receiverFollowReqUserId,{$addToSet:{followers:[senderFollowReqUser._id]}}).exec();
        const updateSenderFollowReqData = await userSchema.findByIdAndUpdate(senderFollowReqUser._id,{$addToSet:{following:[receiverFollowReqUserId]}}, {new: true}).exec();
        Promise.all([updateReceiverFollowReqData,updateSenderFollowReqData]).then(actionsResults=>{
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