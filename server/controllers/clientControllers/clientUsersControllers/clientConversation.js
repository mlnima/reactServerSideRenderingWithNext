const userSchema = require('../../../models/userSchema');
const conversationSchema = require('../../../models/conversationSchema');

module.exports = async (req, res) => {
    try{
        const senderId = req.userData._id;
        const receiverId = req.body._id;
        const conversationData = {
            users:[senderId,receiverId]
        }
        const conversation = await conversationSchema.findOneAndUpdate({users:{ "$in" : [senderId,receiverId]}}, {...conversationData},{new:true,upsert:true}).exec()
        // const conversationId = conversation._id
        // console.log(conversation)
        res.json({conversation})
        res.end()
    }catch (err) {
        console.log(err)
        res.sendStatus(500);
        res.end()
    }

}