const formSchema = require('../../../models/formSchema');

module.exports = (req, res) => {
    const formData = req.body.data
    const formDataDataToSave = new formSchema(formData)
    formDataDataToSave.save().then(savedData => {
        res.json({savedData})

    }).catch(err => {
        console.log(err)
    })
}