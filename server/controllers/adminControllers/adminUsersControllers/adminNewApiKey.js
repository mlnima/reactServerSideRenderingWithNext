//adminNewApiKey
const uuidAPIKey = require('uuid-apikey');
const userSchema = require('../../../models/userSchema');

module.exports = (req, res) => {
    const newAPIKey = uuidAPIKey.create()
    const newUserData = {
        ...req.userData,
        API_KEY: newAPIKey.apiKey,
        uuid: newAPIKey.uuid
    }
    userSchema.findByIdAndUpdate(req.userData._id, newUserData).exec().then(savedData => {
        res.json({ updatedData: savedData })
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}