const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) => {
    const _id = req.body.id;
    widgetSchema.findByIdAndDelete({_id}).exec().then(() => {
        res.json({deleted: true})
        res.end()
    }).catch(e=>{
        console.log(e)
        res.end()
    })
}