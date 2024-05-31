import {CommentSchema} from 'shared-schemas';

const adminUpdateComment = (req, res) => {
    CommentSchema.findByIdAndUpdate(req.body._id, req.body.update, {new: true}).exec().then(updated => {
        res.end()
    })
};

export default adminUpdateComment;