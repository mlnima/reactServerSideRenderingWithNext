import messengerConversationSchema from "@schemas/messengerConversationSchema";

const startAConversation = async (req, res) => {
    try {

        const existingConversation = await messengerConversationSchema.findOne({
            users: {
                $all: req.body.users,
                $size: req.body.users.length
            }
        }).exec();

        if (existingConversation) {
            res.status(200).json({conversation: existingConversation})
        }else{
            const conversationDataToSave = new messengerConversationSchema({
                users: req.body?.users
            })
            const conversation = await conversationDataToSave.save();
            res.status(200).json({conversation})
        }

    } catch (error) {
        res.status(500)
    }
}

export default startAConversation;