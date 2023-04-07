import {conversationSchema} from 'models';

const getConversation = async (req, res) => {
    try {
        const conversation = await conversationSchema.findById(req.body._id, {messages: {$slice: req.body.loadAmount || -20}})
            .select('users')
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

        res.json({conversation})

    } catch (err) {
        console.log(err)
        res.status(500);

    }

}

export default getConversation