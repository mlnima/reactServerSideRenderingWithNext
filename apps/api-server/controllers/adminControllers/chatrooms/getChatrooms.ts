import chatroomSchema from "@schemas/chatroomSchema";

const getChatrooms = async (req, res) => {
    const totalCount = await chatroomSchema.countDocuments({}).exec()
    await chatroomSchema.find({}).exec().then(chatrooms => {
        res.json({ chatrooms,totalCount });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default getChatrooms