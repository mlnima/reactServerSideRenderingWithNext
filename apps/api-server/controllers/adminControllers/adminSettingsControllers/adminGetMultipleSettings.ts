import {SettingSchema} from 'shared-schemas';

const adminGetMultipleSettings = async (req, res) => {
    try {

        const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting]
        let responseData = {}

        for await (const setting of requestedSettings){
            responseData = {
                ...responseData,
                [setting]: await SettingSchema.findOne({type: setting}).exec() || {}
            }
        }

        res.json({settings:responseData})


    } catch (err) {
        console.log(err)
        res.status(404).json('Not Found')
    }
};

export default adminGetMultipleSettings;