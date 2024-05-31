import {SettingSchema} from 'shared-schemas';

const settingsControllers = {
    create : (req, res) => {
        const dataToSave = new SettingSchema({
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