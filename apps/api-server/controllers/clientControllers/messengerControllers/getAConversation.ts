import {MessengerConversationSchema} from "shared-schemas";

const getAConversation = async (req, res) => {
    try {

        const conversation = await MessengerConversationSchema
            .findOne({$and:[{ _id: { $in: req.query?.conversationId } },{ users: { $in: [req.userData._id] } }]})
            .select('users messages')
            .populate([
                {
                    path: 'users',
                    select: ['username', 'profileImage'],
                    populate: {
                        path: 'profileImage',
                        model: 'file',
                    },
                },
                {
                    path: 'messages',
                    model:'messengerConversationMessage',
                    options: { sort: { createdAt: -1 }, limit: 10 }
                },
            ])
            .exec();

        res.json({ conversation });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export default getAConversation;