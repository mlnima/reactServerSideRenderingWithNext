const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new widgetSchema({data})
    dataToSave?.save((err,newWidgetData)=>{
        if (err){
            res.end()
        }
        res.json({newWidgetData})
    })

}