const widgetSchema = require('../../../models/widgetSchema');

module.exports = async (req, res) => {
    try {
        const widgets = await widgetSchema.find({}).exec()
        Promise.all(widgets).then(widgetsWithData => {
            res.json({widgets: widgetsWithData})
        }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
        res.end()
    }
}