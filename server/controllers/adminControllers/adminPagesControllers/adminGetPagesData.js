const pageSchema = require('../../../models/pageSchema');

module.exports = (req, res) =>{
    pageSchema.find({}).exec().then(pages=>{
        res.json({pages,error:false})
        res.end()
    }).catch(err=>{
        console.log(err)
        res.end()
    })
}