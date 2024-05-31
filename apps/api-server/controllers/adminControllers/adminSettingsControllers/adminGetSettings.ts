import {SettingSchema} from 'shared-schemas';

const adminGetSettings = async (req, res) => {
    const setting = await SettingSchema.findOne({type: req.query.type}).exec();
    res.json({setting})
};

export default adminGetSettings