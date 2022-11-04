import {settingSchema} from 'models';

const adminGetMultipleSettings = async (req, res) => {
    try {
        const requestedSettings =  Array.isArray(req.query.setting) ? req.query.setting.map(s=> {
           return  {type:s}
        }) : {type:req.query.setting};
        const settings = await settingSchema.find({
            $or:requestedSettings
        }).exec()
        if (settings){
            res.json({settings})
        }else {
            res.status(404).json('Not Found')
        }
    } catch (err) {
        console.log(err)
        res.status(404).json('Not Found')
    }
};

export default adminGetMultipleSettings;