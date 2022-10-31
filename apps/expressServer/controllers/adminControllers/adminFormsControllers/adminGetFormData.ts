import formSchema from '../../../../../packages/models/src/formSchema';

const adminGetFormData = async (req, res) => {
    const _id = req.body._id

    formSchema.findById(_id).exec().then(formData=>{
        res.json({form:formData,error:false})
    })
}

export default adminGetFormData;