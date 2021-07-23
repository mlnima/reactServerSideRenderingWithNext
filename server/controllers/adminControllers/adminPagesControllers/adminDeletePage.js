const pageSchema = require('../../../models/pageSchema');

module.exports = (req, res) =>{
    const pageId = req.body.id
    if (pageId){
        pageSchema.findByIdAndDelete(pageId).exec().then(pageData=>{
            res.json({error:false})
            res.end()
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }else {
        res.end()
    }
}