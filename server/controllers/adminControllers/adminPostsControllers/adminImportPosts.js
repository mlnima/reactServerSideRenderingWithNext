//adminImportPosts
const postSchema = require('../../../models/postSchema');
const updateSaveMetas = require('../_variables/_updateSaveMetas')

module.exports = async (req, res) => {
    const newPosts = req.body.posts;
    try {
        for await (const post of newPosts) {
            const newPostData = {
                ...post,
                lastModify: Date.now(),
                tags: post.tags ? await updateSaveMetas(post.tags) : [],
                categories: post.categories ? await updateSaveMetas(post.categories) : [],
                actors: post.actors ? await updateSaveMetas(post.actors) : []
            }
            console.log(newPostData)

            // const newPostDataToSave = new postSchema(newPostData);
            // newPostDataToSave.save()
        }

        res.json({message: 'All Done'});

    } catch (err) {
        console.log(err)
        res.status(500).send({message: 'Something Went Wrong While Saving Posts', err})

    }
}