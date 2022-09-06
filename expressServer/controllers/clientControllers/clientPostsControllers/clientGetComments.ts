import commentSchema from '../../../models/commentSchema';
import mongoIdValidator from '../../../../_variables/serverUtil/mongoIdValidator';

const clientGetComments = async (req, res) => {
    try {
        const onDocument = req.query?.onDocument ? {onDocumentId: req.query.onDocument} : {}

        if (mongoIdValidator && req.query?.onDocument){
            await commentSchema.find(onDocument,{},{sort:{createdAt:-1}})
                .populate([{path:'author',select:['username','profileImage']}])
                .exec()
                .then(comments=>{
                    res.json({comments})
                })
        }else {
            res.status(500).json({message:'Request Is Invalid'})
        }
    }catch (err){
        res.status(500).json({message:'Something Went Wrong'})
    }

};

export default clientGetComments