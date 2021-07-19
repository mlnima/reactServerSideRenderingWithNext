//clientNewComment
const commentSchema = require('../../../models/commentSchema');
const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    const commentDataToSave = new commentSchema(req.body);
    commentDataToSave.save((err,comment) => {
        if (err){
            res.sendStatus(500).error('comment did not saved');
            res.end()
        }
        postSchema.findByIdAndUpdate(req.body.onDocumentId,{$push:{comments:[comment._id]}},{new:true}).exec().then(updatePost=>{
            res.json({updatePost})
            res.end()
        }).catch(error=>{
            res.sendStatus(500).error('comment was saved but document did not updated');
            res.end()
        })

    })
};