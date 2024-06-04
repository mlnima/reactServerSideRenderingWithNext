
import formSchema from "@schemas/formSchema";

const getFrom = async (req, res) => {
    try {
        formSchema.findById(req.query._id).exec().then(formData => {
            res.json({form: formData, error: false})
        }).catch(error=>{
            res.status(500).json({message:'Something went wrong please try again later',error})
        })
    } catch (error) {
        res.status(500).json({message:'Something went wrong please try again later'})
    }


}

export default getFrom;