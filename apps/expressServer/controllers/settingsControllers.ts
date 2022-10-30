import settingSchema from '../models/settings/settingSchema';

const settingsControllers = {
    create : (req, res) => {
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
}

export default settingsControllers;