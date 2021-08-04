//const updateSaveMetas = require("../_variables/_updateSaveMetas");
const postSchema = require("../../../models/postSchema");
const userSchema = require('../../../models/userSchema');


module.exports = async (req, res) => {
    const newPost = req.body.postData;

    try {
        // const editedNewPost = {
        //     ...newPost,
        //     tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
        //     categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
        //     actors: newPost.actors ? await updateSaveMetas(newPost.actors) : []
        // }

        const newPostDataToSave = new postSchema(newPost);

        newPostDataToSave.save().then(savedPostData => {


          //  userSchema.findByIdAndUpdate(newPost.author,{$inc: {posts: savedPostData._id}})

            res.json({message:'post successfully created after a moderator review will be published'});
            res.end()
        }).catch(err => {
            if (err.code === 11000) {
                res.status(400).send({error: 'Post with this Title already exist in the Database'})
                res.end()
            } else {
                res.sendStatus(500);
                res.end()
            }
        })
    } catch (err) {
        console.log(err)
        res.end()
    }
};