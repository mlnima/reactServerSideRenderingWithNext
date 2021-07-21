const widgetSchema = require('../../../models/settings/widgetSchema');

module.exports = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new widgetSchema(data)
    dataToSave.save().then(() => {
        res.end()
    })
}