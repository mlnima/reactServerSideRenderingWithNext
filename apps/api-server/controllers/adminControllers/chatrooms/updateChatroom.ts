import {chatroomSchema} from 'models';

const updateChatroom = async (req, res) => {
    await chatroomSchema.findByIdAndUpdate(req.body.data._id,req.body.data,{new:true}).exec().then(chatroom => {
        res.json({ chatroom });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default updateChatroom