import settingSchema from '../../../../../packages/models/src/settings/settingSchema';

const clientGetMultipleSettings = async (req, res) => {
    try {
        const requestedSettings =  Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting]
        const settingRequestPromises = requestedSettings.map(async setting => {
            return await settingSchema.findOne({type: setting}).exec()
        })
        Promise.all(settingRequestPromises).then(settings => {
            res.json({settings})

        }).catch(err => {
            res.status(404).json('Not Found')
        })
    } catch (err) {
        console.log(err)
        res.status(404).json('Not Found')
    }
};

export default clientGetMultipleSettings;