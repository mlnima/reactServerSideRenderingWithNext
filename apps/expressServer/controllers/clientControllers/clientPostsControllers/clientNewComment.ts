import postSchema from '../../../models/postSchema';
import CommentSchema from '../../../models/commentSchema';

const clientNewComment = (req, res) => {
    const commentDataToSave = new CommentSchema(req.body);
    commentDataToSave.save((err,comment) => {
        if (err){
            res.status(500).json({message:'comment did not saved',type:'error'});

        }
        postSchema.findByIdAndUpdate(req.body.onDocumentId,{$push:{comments:[comment._id]}},{new:true}).exec().then(updatePost=>{
            res.json({updatePost})

        }).catch(error=>{
            res.status(500).json({message:'comment was saved but document did not updated',type:'error'})

        })

    })

};

export default clientNewComment