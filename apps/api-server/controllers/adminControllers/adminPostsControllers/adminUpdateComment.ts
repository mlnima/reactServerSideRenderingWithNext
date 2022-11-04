import {commentSchema} from 'models';

const adminUpdateComment = (req, res) => {
    commentSchema.findByIdAndUpdate(req.body._id, req.body.update, {new: true}).exec().then(updated => {
        res.end()
    })
};

export default adminUpdateComment;