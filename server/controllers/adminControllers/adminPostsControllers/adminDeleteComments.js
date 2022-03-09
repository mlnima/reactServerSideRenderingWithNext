const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
    const commentsIds = req.body.commentsIds || []

    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return commentSchema.findByIdAndDelete(commentId, {useFindAndModify: false}).exec()
    })

    Promise.all(mapIdAndReturnDeletePromise).then(() => {
        res.json({message: 'Comments Deleted'});

    }).catch(err => {
        console.log(err)
        res.status(500).send({message: 'Something Went Wrong While Deleting Comments',err})

    })

}