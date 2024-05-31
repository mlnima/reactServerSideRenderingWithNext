import {SettingSchema} from 'shared-schemas';

const adminUpdateSettings = (req, res) => {
    const type = req.body.type;
    const data = req.body.data;
    SettingSchema.findOneAndUpdate({type: type}, {data}, {new: true,upsert:true}).exec().then(() => {
        res.json({message:'Updated'})
    }).catch(err => {
        console.log(err)
        res.status(500)
    })
};

export default adminUpdateSettings;