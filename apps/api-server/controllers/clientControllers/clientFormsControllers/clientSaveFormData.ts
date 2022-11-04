import {formSchema} from 'models';

const clientSaveFormData = (req, res) => {
    const formData = req.body.data
    const formDataDataToSave = new formSchema(formData)
    formDataDataToSave.save().then(savedData => {
        res.json({savedData})

    }).catch(err => {
        console.log(err)
        res.end()
    })

}

export default clientSaveFormData;