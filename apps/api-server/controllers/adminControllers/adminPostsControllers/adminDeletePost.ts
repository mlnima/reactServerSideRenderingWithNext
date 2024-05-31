import {PostSchema} from 'shared-schemas';

const adminDeletePost = (req, res) => {
    const _id = req.body._id;
    PostSchema.findByIdAndDelete(_id).then(() => {
        res.json({message: `${_id} Deleted Permanently`, error: false});
    }).catch(() => {
        res.json({message: `Can Not Delete ${_id} Something Went Wrong`, error: true});
    })
};

export default adminDeletePost;