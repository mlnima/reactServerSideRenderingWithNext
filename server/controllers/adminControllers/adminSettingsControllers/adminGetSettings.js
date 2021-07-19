//adminGetSettings
const settingSchema = require('../../../models/settings/settingSchema');

module.exports = async (req, res) => {
    const setting = await settingSchema.findOne({type: req.body.type}).exec();
    res.json({setting})
};