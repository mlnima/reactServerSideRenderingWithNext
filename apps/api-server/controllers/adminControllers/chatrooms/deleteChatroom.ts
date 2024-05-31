import {ChatroomSchema} from 'shared-schemas';

const deleteChatroom = async (req, res) => {
  await  ChatroomSchema.findByIdAndDelete(req.query._id).exec().then(() => {
        res.json({ message:'deleted' });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default deleteChatroom