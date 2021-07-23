const pageSchema = require('../../../models/pageSchema');

module.exports = (req, res) =>{
    const updateData = req.body.pageData
    pageSchema.findByIdAndUpdate(updateData._id,updateData, {new: true}).exec().then(updated=>{
        res.json({updated,error:false})
        res.end()
    })
}