const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
    const commentsIds = req.body.commentsIds || []
    //console.log(req.body)
    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return commentSchema.findByIdAndDelete(commentId, {useFindAndModify: false}).exec()
    })

    Promise.all(mapIdAndReturnDeletePromise).then(() => {
        // console.log(res)
        res.sendStatus(200)
        res.end()
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
        res.end()
    })

}