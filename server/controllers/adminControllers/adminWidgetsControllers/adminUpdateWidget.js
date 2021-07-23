const widgetSchema = require('../../../models/settings/widgetSchema');

module.exports = (req, res) => {
    const data = req.body.widgetData;
    widgetSchema.findByIdAndUpdate(data._id, data, {new: true}).exec().then(updatedWidgets => {
        res.json({updatedWidgets})
        res.end()
    }).catch(err => {
        console.log(err)
    })
}