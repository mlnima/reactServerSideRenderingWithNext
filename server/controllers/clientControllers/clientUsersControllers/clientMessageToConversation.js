const userSchema = require('../../../models/userSchema');
const conversationSchema = require('../../../models/conversationSchema');

module.exports = async (req, res) =>{
    try {
        const messageData ={
            messageBody:req.body.messageBody,
            author:req.userData._id,
            createdAt:Date.now()
        }

        const addConversationIdToSenderData = await userSchema.findByIdAndUpdate(req.userData._id,{$addToSet:{conversation:[req.body.conversationId]}}).exec()
        const createOrUpdateConversation = await conversationSchema.findByIdAndUpdate(req.body.conversationId,{$push:{messages:[messageData]}},{new:true}).exec()

        Promise.all([addConversationIdToSenderData,createOrUpdateConversation]).then(responseData=>{
            res.json({updatedConversation:responseData[1]})
            res.end()
        }).catch(err=> {
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