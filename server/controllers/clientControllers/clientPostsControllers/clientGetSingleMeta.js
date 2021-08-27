const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose')


module.exports = async (req, res) => {
    try {
        const _id = decodeURIComponent(req.query.id)
        const validateId = _id ? mongoose.isValidObjectId(req.body.id) : false
        if (validateId){
            metaSchema.findById(_id).exec().then(meta => {
                res.json({meta})
                res.end()
            }).catch(err => {
                console.log(err)
                res.error(500)
                res.end()
            })
        }else {
            metaSchema.findOne({name:_id}).exec().then(meta => {
                res.json({meta})
                res.end()
            }).catch(err => {
                console.log(err)
                res.error(500)
                res.end()
            })
        }
    }catch (err){
        console.log(err)
    }
}