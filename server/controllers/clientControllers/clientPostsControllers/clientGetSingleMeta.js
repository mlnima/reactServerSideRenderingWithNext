const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req, res) => {
    try {
        const _id = decodeURIComponent(req.query.id)
        const validateId = _id ? mongoose.isValidObjectId(req.body.id) && _id.match(/^[0-9a-fA-F]{24}$/) : false
        if (validateId){
            metaSchema.findById(_id).exec().then(meta => {
                if (meta){
                    res.json({meta})
                    res.end()
                }else {
                    res.status(404).json({message:'Not Found'})
                    res.end()
                }

            }).catch(err => {

                console.log(err.stack)
                res.status(404)
                res.end()
            })
        }else {
            //res.status(404)
            res.status(404).json({message:'Not Found'})
            res.end()

        }
    }catch (err){
        console.log(err.stack)
        res.status(404).json({message:'Not Found'})
        res.end()
    }
}