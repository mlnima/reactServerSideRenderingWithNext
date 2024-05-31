import {CommentSchema} from 'shared-schemas';

const adminDeleteComments = (req, res) => {
    const commentsIds = req.body.commentsIds || []

    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return CommentSchema.findByIdAndDelete(commentId, {useFindAndModify: false}).exec()
    })

    Promise.all(mapIdAndReturnDeletePromise).then(() => {
        res.json({message: 'Comments Deleted'});

    }).catch(err => {
        res.status(500).send({message: 'Something Went Wrong While Deleting Comments',err})

    })

}

export default adminDeleteComments;