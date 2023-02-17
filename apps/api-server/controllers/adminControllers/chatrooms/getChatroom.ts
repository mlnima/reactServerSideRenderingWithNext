import {chatroomSchema} from 'models';

const getChatroom = async (req, res) => {
    await chatroomSchema.findById(req.query._id).exec().then(chatroom => {
        res.json({ chatroom });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default getChatroom