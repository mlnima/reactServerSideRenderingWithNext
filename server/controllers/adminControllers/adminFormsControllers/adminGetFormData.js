const formSchema = require('../../../models/formSchema');

module.exports = async (req, res) => {
    const _id = req.body._id

    formSchema.findById(_id).exec().then(formData=>{
        res.json({form:formData,error:false})
        res.end()
    })
}