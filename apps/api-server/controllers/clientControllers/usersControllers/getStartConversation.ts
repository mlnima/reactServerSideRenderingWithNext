import conversationSchema from "@schemas/conversationSchema";

const getStartConversation = async (req, res) => {
    try{
        const senderId = req.userData._id;
        const receiverId = req.body._id;
        const conversationData = {
            users:[senderId,receiverId].sort()
        }

        const conversation = await conversationSchema.findOneAndUpdate({users:{ "$eq" : [senderId,receiverId].sort()}}, {...conversationData},{new:true,upsert:true}).exec()

        res.json({conversation})

    }catch (err) {
        res.status(500);
    }
}

export default getStartConversation