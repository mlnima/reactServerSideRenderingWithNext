import formSchema from '../../../../../packages/models/src/formSchema';

const adminDeleteFormData = async (req, res) => {
    const _id = req.body._id
    formSchema.findByIdAndDelete(_id).exec().then(()=>{
        res.json({message:'form deleted'})
    }).catch(err=>{
        res.status(500).json({message:'Something went wrong please try again later'})
    })
}

export default adminDeleteFormData;