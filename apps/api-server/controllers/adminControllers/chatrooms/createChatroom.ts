import {ChatroomSchema} from 'shared-schemas';

const createChatroom = async (req, res) => {


    try {
        const chatroomData = req.body.data
        const dataToSave = new ChatroomSchema(chatroomData)
        const saveChatroom = await dataToSave.save()
        res.json({chatroom: saveChatroom});
    } catch (error) {
        res.end();
    }
};

export default createChatroom


