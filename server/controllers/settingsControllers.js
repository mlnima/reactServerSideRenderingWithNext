const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require('../models/settings/widgetSchema')
const postSchema = require('../models/postSchema')
const commentSchema = require('../models/commentSchema')
const metaSchema = require('../models/metaSchema')
const fs = require('fs')
const fsExtra = require('fs-extra')
const {spawn} = require('child_process');
const shell = require('shelljs');
const dataEncoder = require('../tools/dataEncoder')
let settingsControllers = {}

settingsControllers.update = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    settingSchema.findOneAndUpdate({type: type}, {data}, {new: true}).exec().then(setting => {

        if (!setting) {
            const dataToSave = new settingSchema({
                type: req.body.type,
                data: req.body.data
            });
            dataToSave.save().then(() => {
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
    const setting = await settingSchema.findOne({type: req.body.type}).exec();
    res.json({setting})
};
settingsControllers.getMultiple = async (req, res) => {
    const siteType = (await settingSchema.findOne({type: 'identity'}).exec()).data.siteMode
    const requestedSetting = siteType === 'eCommerce' ? [...req.body.settings, 'eCommerce'] : req.body.settings
    const settingRequestPromises = requestedSetting.map(async setting => {
        return await settingSchema.findOne({type: setting}).exec()
    })
    Promise.all(settingRequestPromises).then(async settings => {
        let finalObject = {}
        settings.forEach(setting => {
            if (setting) {
                finalObject[setting.type] = setting
            }
        })
        res.json({settings: finalObject})
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
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}
settingsControllers.addWidget = (req, res) => {
    const data = req.body.data;
    let dataToSave = new widgetSchema(data)
    dataToSave.save().then(newWidgetData => {

        res.end()
    })
}
settingsControllers.getSingleWidgetData = (req, res) => {
    const id = req.body.id;
    widgetSchema.findById(id).exec().then(widgetData => {
        res.json({widgetData, error: false})
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}


settingsControllers.getWidget = (req, res) => {
    const position = req.body.position = 'all' ? {} : {position: req.body.position};
    widgetSchema.find(position).exec().then(widgets => {
        res.json({widgets})
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}
settingsControllers.getWidgetsWithData = (req, res) => {
    const position = req.body.position === 'all' ? {} : {position: req.body.position};
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
                customHtml: widget.customHtml,
                backgroundImage: widget.backgroundImage
            }

            const sortMethod = finalData.sortBy ? {[finalData.sortBy]: -1} : {lastModify: -1}

            if (finalData.type === 'posts') {
                await postSchema.find({status: 'published'}).limit(widget.count).sort(sortMethod).exec().then(posts => {
                    finalData.posts = posts
                })
                return finalData
            } else {
                return widget
            }

            // return {
            //     ...widget.toObject(),
            //     posts:widget.type ==='posts'? await postSchema.find({ status: 'published' }).limit(widget.count).sort(sortMethod).exec():[]
            // }


        })
        const data = await Promise.all(mapWidget)

        res.json({widgets: data})
        res.end()
    })
}
//____________________________________________________________________________________________

settingsControllers.getMultipleWidgetWithData = async (req, res) => {
    try{
        const widgetsDataQuery = (req.body.widgets || []).map(position=>position==='all' ? {} : {'data.position':position})
        const widgets =  await widgetSchema.find({$or:widgetsDataQuery}).sort('-_id').exec()
        const widgetsWithDynamicData = await widgets.map( async widget=>{
            const widgetDataToObject = widget.toObject();
            const selectedMetaId = widgetDataToObject.data?.selectedMetaForPosts;
            const selectedMeta = selectedMetaId ? {$or: [{tags: selectedMetaId}, {categories: selectedMetaId},{actors:selectedMetaId}]} : {}
            const countPosts = widgetDataToObject.data.sortBy=== 'random' ?  await postSchema.countDocuments({$and: [{status: 'published'}, selectedMeta]}).exec() : null
            const sortMethod = widgetDataToObject.data.sortBy? widgetDataToObject.data.sortBy=== 'latest' ? {lastModify: -1}  :{[widgetDataToObject.data.sortBy]: -1}:{lastModify: -1};
            const posts = widgetDataToObject.data.type === 'posts' || widgetDataToObject.data.type === 'postsSwiper' ?
                await postSchema.find({$and: [{status: 'published'}, selectedMeta]})
                    .select(' title , mainThumbnail , quality , likes , disLikes , views , duration , postType , price , translations , videoTrailerUrl ')
                    .skip(widgetDataToObject.data.sortBy=== 'random'? Math.floor(Math.random() * countPosts):false)
                    .limit(parseInt(widgetDataToObject.data.count))
                    .sort(sortMethod).exec():[]
            return {
                ...widgetDataToObject,
                data: {
                    ...widgetDataToObject.data,
                    metaData: widgetDataToObject.data.metaType ? await metaSchema.find({type: widgetDataToObject.data.metaType}).limit(parseInt(widgetDataToObject.data.count)).sort(sortMethod).exec() : [],
                    posts,
                    comments: widgetDataToObject.data.type === 'recentComments' ? await commentSchema.find({}).limit(parseInt(widgetDataToObject.data.count)).exec() : [],
                }
            }
        })
            Promise.all(widgetsWithDynamicData).then(widgetsWithData => {
                res.json({widgets: widgetsWithData})
                res.end()
            }).catch(err => {
                res.end()
            })
    }catch (e) {
        console.log(e)
        res.end()
    }
}

//__________________________________________________________________________________________
settingsControllers.deleteWidget = (req, res) => {
    const _id = req.body.id;
    widgetSchema.findByIdAndDelete({_id}).exec().then(() => {
        res.json({deleted: true})
        res.end()
    }).catch(e=>{
        console.log(e)
        res.end()
    })
}


settingsControllers.executor = async (req, res) => {
    const command = req.body.command;
    const executeCommand = shell.exec(command)
    res.json({response: await executeCommand.stdout})
    res.end()
}

settingsControllers.updateWidget = (req, res) => {
    const data = req.body.widgetData;

    widgetSchema.findByIdAndUpdate(data._id, data, {new: true}).exec().then(updatedWidgets => {
        res.json({updatedWidgets})
        res.end()
    }).catch(err => {
        console.log(err)
    })
    // res.end()
}

settingsControllers.saveCustomStyle = (req, res) => {
    const data = req.body.data;
    const path = './static/style-sheet/customStyles.css'
    settingSchema.findOneAndUpdate({type: 'customStyle'}, {data}, {new: true}).exec().then(styles => {

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
                })
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
            })
        }
        res.end()
    })

}

module.exports = settingsControllers