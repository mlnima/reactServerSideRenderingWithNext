import {ChatroomSchema} from 'shared-schemas';

const getChatrooms = async (req, res) => {
    const totalCount = await ChatroomSchema.countDocuments({}).exec()
    await ChatroomSchema.find({}).exec().then(chatrooms => {
        res.json({ chatrooms,totalCount });
    }).catch(error=>{
        console.log(error)
        res.end();
    })
};

export default getChatrooms