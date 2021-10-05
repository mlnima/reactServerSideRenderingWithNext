const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) => {
    if (req.body._id){
        const _id = req.body._id;
        widgetSchema.findByIdAndDelete({_id}).exec().then(() => {
            res.json({deleted: true})
        }).catch(error=>{
            console.log(error)
            res.end()
        })
    }
}