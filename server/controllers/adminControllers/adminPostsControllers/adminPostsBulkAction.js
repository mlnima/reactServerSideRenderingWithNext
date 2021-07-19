//adminPostsBulkAction
const postSchema = require('../../../models/postSchema');

module.exports = async (req, res) => {
    const ids = req.body.ids || [];
    const status = req.body.status;
    let actions;
    if (status === 'delete') {
        actions = ids.map(async id => {
            return postSchema.findByIdAndDelete(id)
        })
    } else {
        actions = ids.map(async id => {
            return postSchema.findByIdAndUpdate(id, {$set: {status}})
        })
    }
    Promise.all(actions).then(() => {
        return res.status(200).json({
            message: 'all done'
        });
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        });
    })
};