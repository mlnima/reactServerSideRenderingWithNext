import {FormSchema} from 'shared-schemas';

const getFrom = async (req, res) => {
    try {
        FormSchema.findById(req.query._id).exec().then(formData => {
            res.json({form: formData, error: false})
        }).catch(error=>{
            res.status(500).json({message:'Something went wrong please try again later',error})
        })
    } catch (error) {
        res.status(500).json({message:'Something went wrong please try again later'})
    }


}

export default getFrom;