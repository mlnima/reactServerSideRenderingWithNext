//adminCreateNewPost
const postSchema = require('../../../models/postSchema');
const updateSaveMetas = require('../_variables/_updateSaveMetas')

module.exports = async (req, res) => {
    const newPost = req.body.postData;
    try {
        const editedNewPost = {
            ...newPost,
            lastModify: Date.now(),
            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : []
        }
        const newPostDataToSave = new postSchema(editedNewPost);
        newPostDataToSave.save().then(savedPostData => {
            res.json({savedPostData,message: 'Post Has Been Saved'});
        }).catch(err => {
            if (err.code === 11000) {
                res.status(400).send({message: 'Post with this Title already exist in the Database',err})

            } else {
                res.status(500).send({message: 'Something Went Wrong While Saving The Post',err})
            }
        })
    } catch (err) {
        console.log(err)
        res.end()
    }
};
