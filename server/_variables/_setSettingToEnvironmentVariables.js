const settingSchema = require('../models/settings/settingSchema')

const _setSettingToEnvironmentVariables = async () =>{
    try {
        const identity = await settingSchema.findOne({type: 'identity'}).exec()
        const design = await settingSchema.findOne({type: 'design'}).exec()
        process.env.REACT_APP_SETTING_IDENTITY = JSON.stringify(identity.data)
        process.env.REACT_APP_SETTING_DESIGN = JSON.stringify(design.data)
        process.env.REACT_APP_SETTING_POSTS_COUNT_PER_PAGE = identity.data.postsCountPerPage || '30'
    }catch (err){
        console.log(err.stack)
    }
}

module.exports = _setSettingToEnvironmentVariables()