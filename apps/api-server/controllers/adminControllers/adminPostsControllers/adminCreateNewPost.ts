import {PostSchema} from 'shared-schemas';
import updateSaveMetas from '../../../_variables/adminVariables/_updateSaveMetas';

const adminCreateNewPost = async (req, res) => {
    const newPost = req.body.postData;
    try {
        const editedNewPost = {
            ...newPost,
            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : []
        }
        const newPostDataToSave = new PostSchema(editedNewPost);
        newPostDataToSave.save().then(savedPostData => {
            res.json({savedPostData, message: 'Post Has Been Saved'});
        }).catch(error => {
            console.log(error)
            if (error.code === 11000) {
                res.status(400).send({message: 'Post with this TextInput already exist in the Database', error})

            } else {
                res.status(500).send({message: 'Something Went Wrong While Saving The Post', error})
            }
        })
    } catch (error) {
        console.log(error)
        res.end()
    }
};

export default adminCreateNewPost;