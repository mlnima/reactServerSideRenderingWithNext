const settingSchema = require('../models/settings/settingSchema')


module.exports = async () =>{
    try {
        const identity = await settingSchema.findOne({type: 'identity'}).exec()
        const design = await settingSchema.findOne({type: 'design'}).exec()
        process.env.REACT_APP_SETTING_IDENTITY = JSON.stringify(identity.data)
        process.env.REACT_APP_SETTING_DESIGN = JSON.stringify(design.data)
        // return {
        //     identity:await settingSchema.findOne({type: 'identity'}).exec(),
        //     design:await settingSchema.findOne({type: 'design'}).exec()
        // }
    }catch (err){
        console.log(err.stack)
    }

}