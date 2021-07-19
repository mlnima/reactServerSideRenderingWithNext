const metaSchema = require('../../../models/metaSchema');


module.exports = async (req, res) => {
    metaSchema.findById(req.body.id).exec().then(meta => {
        res.json({meta})
        res.end()
    }).catch(err => {
        console.log(err)
        res.error(500)
        res.end()
    })
}