const settingSchema = require('../models/settings/settingSchema')
let settingsControllers = {}

settingsControllers.update = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    console.log(type,data )
    settingSchema.findOneAndUpdate({type:type},{data},{new:true}).exec().then(setting=>{
        console.log('setting:',setting )
        if (!setting){
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
    }).catch(err=>{
        console.log(err )

    })
};

settingsControllers.get = async (req, res) => {
    console.log( req.body)
    const setting = await settingSchema.findOne({type:req.body.type}).exec();
    res.json({setting})
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

module.exports = settingsControllers