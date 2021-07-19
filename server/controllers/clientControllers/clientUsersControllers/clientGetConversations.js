//const userSchema = require('../../../models/userSchema');
const conversationSchema = require('../../../models/conversationSchema');

module.exports = async (req, res) => {
    try{
        const conversations = await conversationSchema.find({users:{ "$in" : [req.userData._id]}},{ messages: { $slice: -1 } })
            .limit(20)
            .select('users updatedAt')
            .sort({updatedAt: -1})
            .populate([
                {path: 'users',select:['username','profileImage']},
            ])
            .exec()
        res.json({conversations})
        res.end()
    }catch (err) {
        console.log(err)
        res.sendStatus(500);
        res.end()
    }

}