//const updateSaveMetas = require("../_variables/_updateSaveMetas");
const postSchema = require("../../../models/postSchema");
const userSchema = require('../../../models/userSchema');


module.exports = async (req, res) => {
    const newPost = req.body.postData;
    try {
        const newPostDataToSave = new postSchema(newPost);

        newPostDataToSave.save().then(savedPostData => {
            res.json({message:'post successfully created after a moderator review will be published'});
        }).catch(err => {
            if (err.code === 11000) {
                res.status(400).json({message: 'Post with this Title already exist in the Database',type:'error'})
            } else {
                res.status(500).json({message: 'Something Went Wrong',type:'error'})
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Something Went Wrong',type:'error'})
    }
};