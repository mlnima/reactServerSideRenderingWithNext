const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require('../models/settings/widgetSchema')
const postSchema = require('../models/postSchema')
const commentSchema= require('../models/commentSchema')
const mongoose = require('mongoose')
let settingsControllers = {}

settingsControllers.update = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    settingSchema.findOneAndUpdate({ type: type }, { data }, { new: true }).exec().then(setting => {
        console.log('setting:', setting)
        if (!setting) {
            const dataToSave = new settingSchema({
                type: req.body.type,
                data: req.body.data
            });
            dataToSave.save().then(() => {
                console.log(req.body.type, ' new settings saved')
                res.statusCode(200)

            }).catch(err => {
                console.log(err)
                res.statusCode(500)
            })
        }
    }).catch(err => {
        console.log(err)
        res.statusCode(500)
    })
    res.end()
};

settingsControllers.get = async (req, res) => {
    const setting = await settingSchema.findOne({ type: req.body.type }).exec();
    res.json({ setting })
};

settingsControllers.getMultiple = async (req, res) => {
    const requestedSetting = req.body.settings
    const settingRequestPromises = requestedSetting.map( async setting=>{
        return await settingSchema.findOne({ type: setting }).exec()
    })
    Promise.all(settingRequestPromises).then(async settings=>{
        let finalObject ={}
        settings.forEach( setting=>{
            finalObject[setting.type]=setting
        })
        res.json({ settings:finalObject })
        res.end()
    }).catch(err=>{
        console.log( err)
        res.end()
    })

};




settingsControllers.create = (req, res) => {
    const dataToSave = new settingSchema({
        type: req.body.type,
        data: req.body.data
    });
    dataToSave.save().then(() => {
        console.log(req.body.type, ' new settings saved')
    }).catch(err => {
        console.log(err)
    })
}

settingsControllers.addWidget = (req, res) => {
    const data = req.body.data;
    let dataToSave = new widgetSchema(data)
    dataToSave.save().then(newWidgetData => {
        console.log(newWidgetData)
        res.end()
    })
}

settingsControllers.getWidget = (req, res) => {
    const position = req.body.position = 'all' ? {} : { position: req.body.position };
    widgetSchema.find(position).exec().then(widgets => {
        res.json({ widgets })
        res.end()
    }).catch(err=>{
        console.log( err)
        res.end()
    })
}


settingsControllers.getWidgetsWithData = (req, res) => {
    const position = req.body.position === 'all' ? {} : { position : req.body.position };
    widgetSchema.find(position).exec().then(async widgets => {
        const mapWidget = widgets.map(async widget => {
            let finalData = {
                _id:widget._id,
                title: widget.title,
                categories: widget.categories,
                tags: widget.tags,
                pagination: widget.pagination,
                redirectLink: widget.redirectLink,
                redirectToTitle:widget.redirectToTitle,
                count: widget.count,
                type: widget.type,
                position:widget.position,
                posts: [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml
            }

            const sortMethod = finalData.sortBy ? {[finalData.sortBy]:-1} : '-_id'

            if (finalData.type === 'posts') {
                await postSchema.find({}).limit(widget.count).sort(sortMethod).exec().then(posts => {
                    finalData.posts = posts
                })
                return finalData
            } else {
                return widget
            }

        })
        res.json({ widgets: await Promise.all(mapWidget) })
        res.end()
    })
}
//____________________________________________________________________________________________

settingsControllers.getMultipleWidgetWithData = async (req, res) => {

    const requestedWidgets = req.body.widgets
    const widgetRequestPromises = requestedWidgets.map( async widgetsPosition=>{
        return await widgetSchema.find({position:widgetsPosition}).exec()
    })
    Promise.all(widgetRequestPromises).then(async widgets=>{
        let finalData = []
       await widgets.forEach(widgetList=>{
            finalData=[...finalData,...widgetList]
        })

        const mapWidget = finalData.map(async widget => {
            const sortMethod = widget.sortBy ? {[widget.sortBy]:-1} : '-_id'
            // if (finalData.type === 'posts') {
            //     await postSchema.find({}).limit(widget.count).sort(sortMethod).exec().then(posts => {
            //         finalData.posts = posts
            //     })
            //     return finalData
            // }
            //  if (finalData.type === 'recentComments'){
            //     console.log( commentSchema.find({status:'approved'}).limit(5).exec())
            //     await commentSchema.find({status:'approved'}).limit(widget.count).exec().then(comments=>{
            //         finalData.comments=comments
            //     })
            // }
            // else {
            //     return widget
            // }

            // switch (finalData.type ) {
            //     // case 'posts':
            //     //     await postSchema.find({}).limit(widget.count).sort(sortMethod).exec().then(posts => {
            //     //         finalData.posts = posts
            //     //     })
            //     //     return finalData
            //     //     break
            //     case 'recentComments':
            //         // console.log( 'comments are :',await commentSchema.find({}).limit(8).exec() )
            //         await commentSchema.find({}).limit(8).exec().then(comments=>{
            //             finalData.comments=comments
            //         })
            //         console.log(finalData )
            //         break
            //     default:
            //         return widget
            // }

            return {
                _id: widget._id,
                title: widget.title,
                categories: widget.categories,
                tags: widget.tags,
                pagination: widget.pagination,
                redirectLink: widget.redirectLink,
                redirectToTitle: widget.redirectToTitle,
                count: widget.count,
                type: widget.type,
                position: widget.position,
                posts: widget.type === 'posts' ? await postSchema.find({}).limit(widget.count).sort(sortMethod).exec() : [],
                comments: widget.type === 'recentComments' ? await commentSchema.find({}).limit(widget.count).exec() : [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml
            }
        })

        Promise.all(mapWidget).then(widgetsWithData=>{
            res.json({ widgets: widgetsWithData })
            res.end()
        }).catch(err=>{
            console.log( err)
            res.end()
        })

        // res.json({ widgets: await Promise.all(mapWidget) })
        // res.end()
    }).catch(err=>{
        console.log( err)
        res.end()
    })
}


//__________________________________________________________________________________________
settingsControllers.deleteWidget = (req, res) => {
    const _id = req.body.id;
    widgetSchema.findByIdAndDelete({ _id }).exec().then(() => {
        res.json({ deleted: true })
        res.end()
    })
}

settingsControllers.updateWidget = (req, res) => {
    const data = req.body.data;
    console.log(data)
    const _id = req.body.id;
    widgetSchema.findByIdAndUpdate(_id, data, { new: true }).exec().then(updatedWidgets => {
        res.json({ updatedWidgets })
        res.end()
    }).catch(err => {
        console.log(err)
    })
}

module.exports = settingsControllers