const conversationSchema = require('../../../models/conversationSchema');

module.exports = async (req, res) => {
    try{
        const conversation = await conversationSchema.findById(req.body._id,{ messages: { $slice: req.body.loadAmount || -20 } })
            .select('users')
            .populate([
                {path: 'users',select:['username','profileImage']},
            ])
            .exec()

        res.json({conversation})
        res.end()
    }catch (err) {
        console.log(err)
        res.sendStatus(500);
        res.end()
    }

}