import {messengerConversationSchema} from "models";

const getConversationsList = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const skip = parseInt(req.query.skip) || 0;

        const conversationsList = await messengerConversationSchema
            .find({users: {$in: [req.userData._id]}}, {messages: {$slice: -1}})
            .limit(limit)
            .skip(skip)
            .select('users updatedAt messages')
            .sort({updatedAt: -1})
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
                    model: 'messengerConversationMessage',
                    options: {sort: {createdAt: -1}, limit: 1}

                },
            ])
            .exec();

        res.json({conversationsList});
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export default getConversationsList;


// import {conversationSchema} from 'models';
//
// const getConversationsList = async (req, res) => {
//     try{
//         const conversations = await conversationSchema.find({users:{ "$in" : [req.userData._id]}},{ messages: { $slice: -1 } })
//             .limit(20)
//             .select('users updatedAt')
//             .sort({updatedAt: -1})
//             .populate([
//                 {
//                     path: 'users',
//                     select: ['username', 'profileImage'],
//                     populate: {
//                         path: 'profileImage',
//                         model: 'file',
//                     }
//                 },
//             ])
//             .exec()
//         res.json({conversations})
//     }catch (err) {
//         console.log(err)
//         res.status(500);
//     }
//
// }
//
// export default getConversationsList