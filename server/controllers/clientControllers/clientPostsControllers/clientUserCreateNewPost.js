//const updateSaveMetas = require("../_variables/_updateSaveMetas");
const postSchema = require("../../../models/postSchema");

module.exports = async (req, res) => {
    const newPost = req.body.postData;
    console.log('userData:',req.userData)
    console.log('newPost:',newPost)
    try {
        const newPostDataToSave = new postSchema(newPost);

        newPostDataToSave.save((err,savedPostData)=>{
            if (err){
                if (err.code === 11000) {
                    res.status(400).json({message: 'Post with this title already exist in the Database',type:'error'})
                } else {
                    res.status(500).json({message: 'Something Went Wrong',type:'error'})
                }
            }
            res.json({message:'post successfully created after a moderator review will be published',post:savedPostData});
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Something Went Wrong',type:'error'})
    }
};