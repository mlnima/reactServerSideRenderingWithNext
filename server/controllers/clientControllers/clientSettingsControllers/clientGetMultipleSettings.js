const settingSchema = require('../../../models/settings/settingSchema')

module.exports = async (req, res) => {
    try {
        const requestedSettings =  Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting]
        const settingRequestPromises = requestedSettings.map(async setting => {
            return await settingSchema.findOne({type: setting}).exec()
        })
        Promise.all(settingRequestPromises).then(settings => {
            res.json({settings})
            res.end()
        }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
        res.end()
    }
};