const pageSchema = require('../../../models/pageSchema');

module.exports = (req, res) =>{
    pageSchema.find({}).exec().then(pagesData=>{
        res.json({pagesData,error:false})
    }).catch(err=>{
        console.log(err)
        res.status(404).json({message:'not found'})
    })
}