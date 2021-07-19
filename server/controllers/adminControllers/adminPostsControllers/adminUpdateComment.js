const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
    commentSchema.findByIdAndUpdate(req.body._id, req.body.update, {new: true}).exec().then(updated => {
        res.end()
    })
};