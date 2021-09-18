const pageSchema = require('../../../models/pageSchema');


module.exports = (req, res) =>{
    const pageId = req.body.id
    const pageName = req.body.pageName
    if (pageId){
        pageSchema.findById(pageId).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }else if (pageName){
        pageSchema.findOne({pageName}).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }
}