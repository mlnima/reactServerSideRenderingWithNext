import {ChatroomSchema} from 'shared-schemas';

const updateChatroom = async (req, res) => {
    await ChatroomSchema.findByIdAndUpdate(req.body.data._id,req.body.data,{new:true}).exec().then(chatroom => {
        res.json({ chatroom });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default updateChatroom