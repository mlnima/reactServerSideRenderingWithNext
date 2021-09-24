const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require("../models/widgetSchema");

const _setSettingToEnvironmentVariables = async () =>{
    const staticWidgetsQuery = ['footer', 'header', 'topBar', 'navigation'].map(position => position === 'all' ? {} : {'data.position': position})
    try {

        const identity = await settingSchema.findOne({type: 'identity'}).exec()
        const design = await settingSchema.findOne({type: 'design'}).exec()
        const widgets = await widgetSchema.find({$or: staticWidgetsQuery}).populate([
            {path: 'data.metaData'},
            {
                path: 'data.posts',
                populate: [{path: 'actors', select: {'name': 1, 'type': 1}, options: {limit: 3}}, {path: 'categories', select: {'name': 1, 'type': 1}, options: {limit: 3}}, {path: 'tags', select: {'name': 1, 'type': 1}, options: {limit: 3}}],
                select: {'_id': 1, 'redirectLink': 1, 'title': 1, 'mainThumbnail': 1, 'quality': 1, 'duration': 1, 'views': 1, 'translations': 1, 'VideoTrailerUrl': 1, 'postType': 1, 'likes': 1, 'disLikes': 1}
            },
        ]).sort({updatedAt: -1}).exec()
        //
        // console.log('widgets: ',widgets)



        process.env.NEXT_PUBLIC_SETTING_IDENTITY = JSON.stringify(identity.data);
        process.env.NEXT_PUBLIC_SETTING_DESIGN = JSON.stringify(design.data);
        process.env.NEXT_PUBLIC_STATIC_WIDGETS = JSON.stringify(widgets);
        process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE = identity.data.postsCountPerPage || '30';
    }catch (err){
        err.stack ?  console.log(err.stack) : console.log(err)
    }
}

module.exports = _setSettingToEnvironmentVariables()