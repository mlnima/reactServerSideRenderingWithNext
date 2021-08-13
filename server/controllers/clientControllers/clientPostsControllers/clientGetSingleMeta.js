const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose')


module.exports = async (req, res) => {
    const isValid = mongoose.isValidObjectId(req.body.id)
    const query = isValid ? {_id:req.body.id} : {name:req.body.id}
    metaSchema.findOne(query).exec().then(meta => {
        res.json({meta})
        res.end()
    }).catch(err => {
        console.log(err)
        res.error(500)
        res.end()
    })
}