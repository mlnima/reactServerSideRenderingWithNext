const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req, res) => {
    try {
        const validateId = req.query.id ? mongoose.isValidObjectId(req.query.id) && req.query.id.match(/^[0-9a-fA-F]{24}$/) : false;

        if (validateId){
          await  metaSchema.findById(req.query.id).exec().then(meta => {
                if (meta){
                    res.json({meta})
                }else {
                    res.status(404).json({message:'Not Found'})
                }

            }).catch(err => {
                // console.log(err.stack)
                res.status(400).json({message:'Bad Request'})
            })
        }else {
            //res.status(404)
            res.status(404).json({message:'Not Found'})


        }
    }catch (err){
        // console.log(err.stack)
        res.status(500).json({message:'Server Error'})
    }
}