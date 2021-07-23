const formSchema = require('../../../models/formSchema');

module.exports = async (req, res) => {
    const _id = req.body._id
    console.log(req.body)
    formSchema.findById(_id).exec().then(formData=>{
        res.json({form:formData,error:false})
        res.end()
    })
}