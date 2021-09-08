
const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) => {
    const position = req.body.position = 'all' ? {} : {position: req.body.position};
    widgetSchema.find(position).exec().then(widgets => {
        res.json({widgets})
    }).catch(err => {
        console.log(err)
        res.status(400).send('Bad Request')
    })
}