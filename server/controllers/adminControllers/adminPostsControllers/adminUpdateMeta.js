const metaSchema = require('../../../models/metaSchema');

module.exports = (req, res) => {
    metaSchema.findByIdAndUpdate(req.body.data._id, {...req.body.data}, {new: true}).exec().then(updatedMeta => {
        res.json({updated: updatedMeta})
    }).catch(err => {
        console.log(err)
    })
}