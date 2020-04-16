const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require('../models/settings/widgetSchema')
const postSchema = require('../models/postSchema')
const commentSchema = require('../models/commentSchema')
const metaSchema = require('../models/metaSchema')
const fs = require('fs')
const fsExtra = require('fs-extra')
const { spawn } = require('child_process');
const shell = require('shelljs');
const dataEncoder = require('../tools/dataEncoder')
const mongoose = require('mongoose')
let settingsControllers = {}

settingsControllers.update = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    settingSchema.findOneAndUpdate({ type: type }, { data }, { new: true }).exec().then(setting => {
        // console.log('setting:', setting)
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
    console.log('getMultiple not cached')
    const requestedSetting = req.body.settings
    const settingRequestPromises = requestedSetting.map(async setting => {
        return await settingSchema.findOne({ type: setting }).exec()
    })
    Promise.all(settingRequestPromises).then(async settings => {
        let finalObject = {}
        settings.forEach(setting => {
            if (setting) {
                finalObject[setting.type] = setting
            }
        })

        res.json({ settings: dataEncoder({ finalObject }) })
        res.end()
    }).catch(err => {
        console.log(err)
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
    }).catch(err => {
        console.log(err)
        res.end()
    })
}

settingsControllers.getWidgetsWithData = (req, res) => {
    const position = req.body.position === 'all' ? {} : { position: req.body.position };
    widgetSchema.find(position).exec().then(async widgets => {
        const mapWidget = widgets.map(async widget => {
            let finalData = {
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
                posts: [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml
            }

            const sortMethod = finalData.sortBy ? { [finalData.sortBy]: -1 } : '-_id'

            if (finalData.type === 'posts') {
                await postSchema.find({ status: 'published' }).limit(widget.count).sort(sortMethod).exec().then(posts => {
                    finalData.posts = posts
                })
                return finalData
            } else {
                return widget
            }

        })
        const data = await Promise.all(mapWidget)

        res.json({ widgets: data })
        res.end()
    })
}
//____________________________________________________________________________________________

settingsControllers.getMultipleWidgetWithData = async (req, res) => {

    const requestedWidgets = req.body.widgets
    const widgetRequestPromises = requestedWidgets.map(async widgetsPosition => {
        const position = requestedWidgets.includes('all') ? {} : { position: widgetsPosition }
        return await widgetSchema.find(position).exec()
    })
    Promise.all(widgetRequestPromises).then(async widgets => {
        let finalData = []
        await widgets.forEach(widgetList => {
            finalData = [ ...finalData, ...widgetList ]
        })

        const mapWidget = finalData.map(async widget => {
            const sortMethod = widget.sortBy ? { [widget.sortBy]: -1 } : '-_id';
            // const metaType = widget.metaType ? widget.metaType : 'tag'
            let sortQuery = !req.body.sort ? {} : req.body.sort === '_id' || req.body.sort === '-_id' ? req.body.sort : { [req.body.sort]: -1 }
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
                metaType: widget.metaType,
                position: widget.position,
                metaData: widget.metaType === 'tag' || widget.metaType === 'category' || widget.metaType === 'actor' ? await metaSchema.find({ type: widget.metaType }).limit(widget.count).sort(sortQuery).exec() : [],
                posts: widget.type === 'posts' ? await postSchema.find({status:'published'}).limit(widget.count).sort(sortMethod).exec() : [],
                comments: widget.type === 'recentComments' ? await commentSchema.find({}).limit(widget.count).exec() : [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml,
                pathURL: widget.pathURL,
                LogoUrl: widget.LogoUrl,
                LogoText: widget.LogoText,
                headLine: widget.headLine,
                viewType: widget.viewType
            }
        })

        Promise.all(mapWidget).then(widgetsWithData => {
            res.json({ widgets: widgetsWithData })
            res.end()
        }).catch(err => {
            // console.log(err)
            res.end()
        })

        // res.json({ widgets: await Promise.all(mapWidget) })
        // res.end()
    }).catch(err => {
        console.log(err)
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
settingsControllers.executor = async (req, res) => {
    const command = req.body.command;
    const executeCommand = shell.exec(command)
    res.json({ response: await executeCommand.stdout })
    res.end()
}

settingsControllers.updateWidget = (req, res) => {
    const data = req.body.data;
    const _id = req.body.id;
    widgetSchema.findByIdAndUpdate(_id, data, { new: true }).exec().then(updatedWidgets => {
        res.json({ updatedWidgets })
        res.end()
    }).catch(err => {
        console.log(err)
    })
}

settingsControllers.saveCustomStyle = (req, res) => {
    const data = req.body.data;
    const path = './static/style-sheet/customStyle.css'
    settingSchema.findOneAndUpdate({ type: 'customStyle' }, { data }, { new: true }).exec().then(styles => {

        if (!styles) {
            const dataToSave = new settingSchema({
                type: 'customStyle',
                data: req.body.data
            });

            dataToSave.save().then(savedData => {
                fsExtra.writeFile(path, styles.data, 'utf8', (error, files) => {
                    if (error) {
                        console.log(error)
                    }
                    console.log('scss file updated')
                })
                console.log('saved')
                res.end()
            }).catch(err => {
                console.log(err)
                res.end()
            })
        } else {
            fsExtra.writeFile(path, styles.data, 'utf8', (error, files) => {
                if (error) {
                    console.log(error)
                }
                console.log('scss file updated')
            })
        }
        res.end()
    })

}

module.exports = settingsControllers