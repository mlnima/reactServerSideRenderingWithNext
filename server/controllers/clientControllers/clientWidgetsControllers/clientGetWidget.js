
const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) => {
    const position = req.body.position = 'all' ? {} : {position: req.body.position};
    widgetSchema.find(position).exec().then(widgets => {
        res.json({widgets})
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}