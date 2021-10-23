const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
    const commentsIds = req.body.commentsIds || []
    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return commentSchema.findByIdAndDelete(commentId, {useFindAndModify: false}).exec()
    })

    Promise.all(mapIdAndReturnDeletePromise).then(() => {
        res.status(200)

    }).catch(err => {
        console.log(err)
        res.status(500)

    })

}