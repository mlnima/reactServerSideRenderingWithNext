import chatroomSchema from "@schemas/chatroomSchema";

const createChatroom = async (req, res) => {


    try {
        const chatroomData = req.body.data
        const dataToSave = new chatroomSchema(chatroomData)
        const saveChatroom = await dataToSave.save()
        res.json({chatroom: saveChatroom});
    } catch (error) {
        res.end();
    }
};

export default createChatroom


