import {chatroomSchema} from 'models';

const deleteChatroom = async (req, res) => {
  await  chatroomSchema.findByIdAndDelete(req.query._id).exec().then(() => {
        res.json({ message:'deleted' });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default deleteChatroom