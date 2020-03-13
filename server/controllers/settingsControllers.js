const settingSchema = require('../models/settings/settingSchema')
const widgetSchema = require('../models/settings/widgetSchema')
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

settingsControllers.getWidgets = (req, res) => {
    const position = req.body.position;
    widgetSchema.find({ position:position }).exec().then(widgets => {
        res.json({ widgets })
        res.end()
    })
}
settingsControllers.deleteWidget = (req, res) => {
    const _id = req.body.id;
    widgetSchema.findByIdAndDelete({_id }).exec().then(() => {
        res.json({ deleted:true })
        res.end()
    })
}
settingsControllers.updateWidgets = (req, res) => {
    const data = req.body.data;
    console.log( data)
    const _id = req.body.id;
    widgetSchema.findByIdAndUpdate(_id,data,{new:true}).exec().then(updatedWidgets => {
        res.json({ updatedWidgets })
        res.end()
    }).catch(err=>{
        console.log( err)
    })
}

module.exports = settingsControllers