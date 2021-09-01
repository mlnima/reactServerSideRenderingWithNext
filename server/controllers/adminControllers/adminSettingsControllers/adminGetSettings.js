//adminGetSettings
const settingSchema = require('../../../models/settings/settingSchema');

module.exports = async (req, res) => {
    const setting = await settingSchema.findOne({type: req.query.type}).exec();
    res.json({setting})
};