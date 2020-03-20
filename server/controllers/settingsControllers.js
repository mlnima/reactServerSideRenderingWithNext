const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require('../models/settings/widgetSchema')
const postSchema = require('../models/postSchema')
const mongoose = require('mongoose')
let settingsControllers = {}

settingsControllers.update = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    console.log(type, data)
    settingSchema.findOneAndUpdate({ type: type }, { data }, { new: true }).exec().then(setting => {
        console.log('setting:', setting)
        if (!setting) {
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
    }).catch(err => {
        console.log(err)

    })
};

settingsControllers.get = async (req, res) => {
    console.log(req.body)
    const setting = await settingSchema.findOne({ type: req.body.type }).exec();
    res.json({ setting })
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
    })
}

settingsControllers.getWidgetsWithData = (req, res) => {
    const position = req.body.position = 'all' ? {} : { position: req.body.position };
    widgetSchema.find(position).exec().then(async widgets => {
        const mapWidget = widgets.map(async widget => {
            let finalData = {
                _id:widget._id,
                title: widget.title,
                categories: widget.categories,
                tags: widget.tags,
                pagination: widget.pagination,
                redirectLink: widget.redirectLink,
                count: widget.count,
                type: widget.type,
                posts: [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml
            }
            let finalDataTest = {
                ...widgets[widgets.indexOf(widget)],
                posts: []
            }
            console.log(widgets[widgets.indexOf(widget)])
            // finalData.posts = ['test']
            const sortMethod = finalData.sortBy ? {[finalData.sortBy]:-1} : '-_id'
            console.log(sortMethod )
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