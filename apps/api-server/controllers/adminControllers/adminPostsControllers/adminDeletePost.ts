import {postSchema} from 'models';

const adminDeletePost = (req, res) => {
    const _id = req.body._id;
    postSchema.findByIdAndDelete(_id).then(() => {
        res.json({message: `${_id} Deleted Permanently`, error: false});
    }).catch(() => {
        res.json({message: `Can Not Delete ${_id} Something Went Wrong`, error: true});
    })
};

export default adminDeletePost;