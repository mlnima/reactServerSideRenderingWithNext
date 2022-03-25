const pageSchema = require('../../../models/pageSchema');

module.exports = async (req, res) =>{
    // const pageId = req.body._id
    // console.log()
    try {
        await  pageSchema.findById(req.body._id).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            res.status(404).json({message:'Not Found'})
        })
    }catch (err){
        res.status(500).json({message:'Something Went Wrong'})
    }

}