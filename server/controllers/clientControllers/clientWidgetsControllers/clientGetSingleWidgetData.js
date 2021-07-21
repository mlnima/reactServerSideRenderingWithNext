//clientGetSingleWidgetData

const widgetSchema = require('../../../models/settings/widgetSchema');

module.exports = (req, res) => {
    const id = req.body.id;
    widgetSchema.findById(id).exec().then(widgetData => {
        res.json({widgetData, error: false})
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}