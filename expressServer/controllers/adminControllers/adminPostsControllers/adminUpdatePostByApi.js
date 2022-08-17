//adminUpdatePostByApi
const postSchema = require('../../../models/postSchema');
module.exports = async (req,res)=>{
    try {
        const updatedPostData = req.body.updatedPostData
        postSchema.findByIdAndUpdate(updatedPostData._id,updatedPostData).exec().then(()=>{
            res.json({message:updatedPostData._id + ' updated'})
        })

    }catch (err){
        console.log(err)
    }
}