import {messengerConversationSchema} from "models";

const loadOlderMessages = async (req, res) => {
    try {
        const conversationData = await messengerConversationSchema
            .findById(req.query.conversationId)
            .select('messages')
            .populate([
                {
                    path: 'messages',
                    model: 'messengerConversationMessage',
                    options: {
                        sort: {createdAt: -1},
                        limit: req.query.limit || 10,
                        skip:req.query.skip || 0
                    }
                },
            ])
            .exec();

        res.json({messages:conversationData?.messages||[]});
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export default loadOlderMessages;
