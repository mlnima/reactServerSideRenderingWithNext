import settingSchema from '../../../models/settings/settingSchema';

const adminUpdateSettings = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    settingSchema.findOneAndUpdate({type: type}, {data}, {new: true}).exec().then(setting => {
        if (!setting) {
            const dataToSave = new settingSchema({
                type: req.body.type,
                data: req.body.data
            });
            dataToSave.save().then(() => {
                res.status(200)
            }).catch(err => {
                console.log(err)
                res.status(500)
            })
        }else {
            res.json({message:'Updated'})
        }
    }).catch(err => {
        console.log(err)
        res.status(500)
    })

};

export default adminUpdateSettings;