import {PageSchema} from 'shared-schemas';

const adminGetPageData = async (req, res) =>{
    try {
        await  PageSchema.findById(req.body._id).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            res.status(404).json({message:'Not Found'})
        })
    }catch (err){
        res.status(500).json({message:'Something Went Wrong'})
    }
}

export default adminGetPageData;