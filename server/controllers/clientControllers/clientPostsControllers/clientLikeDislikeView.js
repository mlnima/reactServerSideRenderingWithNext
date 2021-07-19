//clientLikeDislikeView

const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    postSchema.findByIdAndUpdate(req.body.id, {$inc: {[req.body.type]: 1}}, {new: true}).select(' likes , disLikes , views ').exec().then(updatedData=>{
        res.json({updatedData})
        res.end()
    }).catch(err=>{
        console.log(err)
        res.end()
    })
};