//adminDeletePost
const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    const _id = req.body._id;
    postSchema.findByIdAndDelete(_id).then(() => {
        res.json({message: `${_id} Deleted Permanently`, error: false});
        res.end()
    }).catch(() => {
        res.json({message: `Can Not Delete ${_id} Something Went Wrong`, error: true});
        res.end()
    })
};