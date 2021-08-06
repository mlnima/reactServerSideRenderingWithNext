const userSchema = require('../../../models/userSchema');
const conversationSchema = require('../../../models/conversationSchema');

module.exports = async (req, res) => {
    try{
        const senderId = req.userData._id;
        const receiverId = req.body._id;
        const conversationData = {
            users:[senderId,receiverId].sort()
        }

        const conversation = await conversationSchema.findOneAndUpdate({users:{ "$eq" : [senderId,receiverId].sort()}}, {...conversationData},{new:true,upsert:true}).exec()

        res.json({conversation})
        res.end()
    }catch (err) {
        console.log(err)
        res.sendStatus(500);
        res.end()
    }

}