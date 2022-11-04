import {settingSchema} from 'models';

const adminGetSettings = async (req, res) => {
    const setting = await settingSchema.findOne({type: req.query.type}).exec();
    res.json({setting})
};

export default adminGetSettings