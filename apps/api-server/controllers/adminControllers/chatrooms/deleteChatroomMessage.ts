import {ChatroomSchema, ChatroomMessageSchema} from 'shared-schemas';

const deleteChatroomMessage = async (req, res) => {

    try {
        await ChatroomMessageSchema.findByIdAndRemove(req.query.messageId, {useFindAndModify: false}).exec()
        res.end()
    } catch (error) {
        res.end()
    }

};

export default deleteChatroomMessage;