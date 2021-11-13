const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req, res) => {
    try {
        console.log(req.query._id)
        const validateId = req.query._id ? mongoose.isValidObjectId(req.query._id) && req.query._id.match(/^[0-9a-fA-F]{24}$/) : false;

        if (validateId){
            await  metaSchema.findById(req.query._id).exec().then(meta => {
                if (meta){
                    res.json({meta})
                }else {
                    res.status(404).json({message:'Not Found'})
                }

            }).catch(err => {
                console.log(err.stack)
                res.status(400).json({message:'Bad Request'})
            })
        }else {
            //res.status(404)
            res.status(404).json({message:'Not Found'})


        }
    }catch (err){
        console.log(err.stack)
        res.status(500).json({message:'Server Error'})
    }
}