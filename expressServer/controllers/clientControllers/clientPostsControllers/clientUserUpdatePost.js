const postSchema = require("../../../models/postSchema");

module.exports = async (req, res) =>{
    const postData = req.body.postData;

    try {
        postSchema.findByIdAndUpdate(postData._id,postData,{new:true}).exec().then(updatedPost=>{
            res.json({
                message:'post successfully updated after a moderator review changes will be published',
                post:updatedPost
            });
        }).catch(err=>{
                    if (err.code === 11000) {
                        res.status(400).json({
                            message: 'Post with this title already exist in the Database',type:'error'
                        })
                    } else {
                        res.status(500).json({
                            message: 'Something Went Wrong',type:'error'
                        })
                    }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Something Went Wrong',type:'error'})
    }

}