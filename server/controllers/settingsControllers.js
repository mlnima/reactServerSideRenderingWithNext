const settingSchema = require('../models/settings/settingSchema')

let settingsControllers = {}

settingsControllers.create = (req, res) => {
    const dataToSave = new settingSchema({
        type: req.body.type,
        data: req.body.data
    });
    dataToSave.save().then(() => {
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}



module.exports = settingsControllers