import formSchema from "@schemas/formSchema";

const deleteForm = async (req, res) => {
    try {
        await formSchema.findByIdAndDelete(req.query._id,{useFindAndModify: false}).exec().then(()=>{
            res.json({message:'form deleted'})
        }).catch(error=>{
            console.log(error)
            res.status(500).json({message:'Something went wrong please try again later'})
        })
    }catch (error){
        console.log(error)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}

export default deleteForm;