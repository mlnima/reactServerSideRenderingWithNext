const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require("../models/widgetSchema");
const fs = require('fs')

const widgetPopulateModel = [
    {
        model:'meta',
        path: 'data.uniqueData.metaData'
    },
    {
        model:'post',
        path: 'data.uniqueData.posts',
        populate: [{
            path: 'actors',
            select: {'name': 1, 'type': 1},
            options: {limit: 3}
        },
            {
                path: 'categories',
                select: {'name': 1, 'type': 1},
                options: {limit: 3}},
            {
                path: 'tags',
                select: {'name': 1, 'type': 1},
                options: {limit: 3}
            }],
        select: {
            '_id': 1,
            'redirectLink': 1,
            'title': 1,
            'mainThumbnail': 1,
            'quality': 1,
            'duration': 1,
            'views': 1,
            'translations': 1,
            'VideoTrailerUrl': 1,
            'postType': 1,
            'likes': 1,
            'disLikes': 1
        }
    },
]



const _writeSettingsAndStaticWidgetsToJsonFile = async ()=>{

    const staticWidgetsQuery = ['footer', 'header', 'topBar', 'navigation'].map(position => {
       return  {'data.position': position}
    })

    try {
        const identity = await settingSchema.findOne({type: 'identity'}).exec()
        const design = await settingSchema.findOne({type: 'design'}).exec()
        const staticWidgets = await widgetSchema.find({$or: staticWidgetsQuery}).populate(widgetPopulateModel).exec()

        fs.writeFileSync('./static/jsons/staticData.json', JSON.stringify({
            identity:identity.data,
            design:design.data,
        }))
        fs.writeFileSync('./static/jsons/staticWidgets.json', JSON.stringify({
            widgets:staticWidgets,
        }))

    } catch (err) {
        err.stack ? console.log(err.stack) : console.log(err)
    }
}

module.exports = _writeSettingsAndStaticWidgetsToJsonFile()