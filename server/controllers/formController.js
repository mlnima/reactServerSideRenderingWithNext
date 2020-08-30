const contactFromSchema = require('../models/contactFromSchema')
const formController = {}


formController.contact = (req,res)=>{
    const contactData = req.body.data
    const ContactDataToSave = new contactFromSchema(contactData)
    ContactDataToSave.save().then(savedData=>{
        res.json({savedData})
        res.end()
    }).catch(err=>{
        console.log(err)
    })

}


module.exports = formController;