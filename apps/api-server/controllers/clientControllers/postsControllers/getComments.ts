import {CommentSchema} from 'shared-schemas';
import {mongoIdValidator} from 'custom-server-util';

const getComments = async (req, res) => {
    try {
        const onDocument = req.query?.onDocument ? {onDocumentId: req.query.onDocument} : {}
        const skip = req.query?.skip ? parseInt(req.query.skip) : 0
        const limit = req.query?.limit ? parseInt(req.query.limit)  : 0

        if (mongoIdValidator && req.query?.onDocument){
            await CommentSchema.find(onDocument,{},{sort:{createdAt:-1}})
                .populate([{
                    path:'author',
                    select:[
                        'username',
                        'profileImage',
                    ],
                    populate: {
                        path: 'profileImage',
                        model: 'file',
                    }
                }])
                .skip(skip)
                .limit(limit)
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

export default getComments