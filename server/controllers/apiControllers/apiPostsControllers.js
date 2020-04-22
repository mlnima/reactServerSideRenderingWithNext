let apiPostsControllers = {}
const postSchema = require('../../models/postSchema')

apiPostsControllers.creatPost = (req,res)=>{
    const postData = req.body.postData
    const dataToSave = new postSchema(postData)
    dataToSave.save((err,newPostData)=>{
        if (err){
            res.json({message:'error on creating post from api'})
            res.end()
        }
        else if(newPostData) {
            res.json({message:'post has been created'})
            res.end()
        }
    })
}

module.exports = apiPostsControllers