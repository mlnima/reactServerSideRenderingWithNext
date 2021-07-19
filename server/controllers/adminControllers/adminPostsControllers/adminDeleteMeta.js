const metaSchema = require('../../../models/metaSchema');

module.exports = (req, res) => {
    const _id = req.body._id
    metaSchema.findByIdAndDelete(_id).exec().then(() => {
        res.json({message: 'deleted'})
        res.end()
    }).catch(err => {
        res.error(500)
        res.end()
    })
}