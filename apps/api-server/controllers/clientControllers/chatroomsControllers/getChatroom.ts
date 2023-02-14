import {chatroomSchema} from 'models';
import {mongoIdValidator} from "custom-server-util";


const getChatroom = async (req, res) => {
    try {
        const isValidId = mongoIdValidator(req.query.identifier)
        const currentChatroom = await chatroomSchema.findOne(isValidId ? {_id:req.query.identifier}:{name:req.query.identifier}).exec()
        const allTheChatrooms = await chatroomSchema.find({}).select('name').exec()

        res.json({ chatroom:currentChatroom, chatrooms:allTheChatrooms});

    }catch (error){
        console.log(error)
    }

};

export default getChatroom