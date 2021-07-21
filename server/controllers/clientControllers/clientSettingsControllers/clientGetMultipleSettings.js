const settingSchema = require('../../../models/settings/settingSchema')

module.exports = async (req, res) => {
    try{
        const settingRequestPromises = req.body.settings.map(async setting => {
            return await settingSchema.findOne({type: setting}).exec()
        })
        Promise.all(settingRequestPromises).then(settings => {
            res.json({settings})
            res.end()
        }).catch(err => {
            console.log(err)
            res.end()
        })
    }catch(error){
        console.log(error)
        res.end()
    }
};