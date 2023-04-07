import {conversationSchema} from 'models';

const getConversations = async (req, res) => {
    try{
        const conversations = await conversationSchema.find({users:{ "$in" : [req.userData._id]}},{ messages: { $slice: -1 } })
            .limit(20)
            .select('users updatedAt')
            .sort({updatedAt: -1})
            .populate([
                {
                    path: 'users',
                    select: ['username', 'profileImage'],
                    populate: {
                        path: 'profileImage',
                        model: 'file',
                    }
                },
            ])
            .exec()
        res.json({conversations})
    }catch (err) {
        console.log(err)
        res.status(500);
    }

}

export default getConversations