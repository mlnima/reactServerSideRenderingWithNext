
import { ChatroomRaw } from 'typescript-types';
import chatroomSchema from "@schemas/chatroomSchema";

const getChatroom = async (req, res) => {
    try {
        const chatroom = await chatroomSchema.findById(req.query._id).exec();

        if (!chatroom) {
            res.end();
        }

        res.json({ chatroom });
    } catch (error) {}
    // await ChatroomSchema.findById(req.query._id).exec().then((chatroom: ChatroomRaw) => {
    //     res.json({chatroom});
    // }).catch(error => {
    //     console.log(error)
    //     res.end();
    // })
};

export default getChatroom;
