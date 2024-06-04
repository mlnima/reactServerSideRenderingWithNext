import chatroomMessageSchema from "@schemas/chatroomMessageSchema";

const deleteChatroomMessage = async (req, res) => {

    try {
        await chatroomMessageSchema.findByIdAndRemove(req.query.messageId, {useFindAndModify: false}).exec()
        res.end()
    } catch (error) {
        res.end()
    }

};

export default deleteChatroomMessage;