//adminCreateNewPost
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');

const metasSaver = async (metas) => {
    let finalData = []
    for await (let meta of metas) {
        await metaSchema.findOne({name: meta.name}).exec().then(async existingMeta => {
            if (existingMeta) {
                finalData = [...finalData, existingMeta._id]
            } else {
                const metaDataToSave = new metaSchema({
                    name: meta.name,
                    type: meta.type,
                    count: 1
                })
                await metaDataToSave.save().then(saved => {
                    finalData = [...finalData, saved._id]
                }).catch(err => {

                })
            }
        })
    }
    return finalData
}

module.exports = async (req, res) => {
    const newPost = req.body.postData;
    try {
        const editedNewPost = {
            ...newPost,
            lastModify: Date.now(),
            tags: newPost.tags ? await metasSaver(newPost.tags) : [],
            categories: newPost.categories ? await metasSaver(newPost.categories) : [],
            actors: newPost.actors ? await metasSaver(newPost.actors) : []
        }
        const newPostDataToSave = new postSchema(editedNewPost);
        newPostDataToSave.save().then(savedPostData => {
            res.json({savedPostData});
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