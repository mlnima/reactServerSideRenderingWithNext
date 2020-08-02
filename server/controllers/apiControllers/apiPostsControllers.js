let apiPostsControllers = {}
const postSchema = require('../../models/postSchema')
const metaSchema = require('../../models/metaSchema');

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
                    console.log(meta.name, ' has error on save meta')
                })
            }

        })
    }
    console.log(finalData)
    return finalData
}

const metaCountSetter = (metas, type) => {
    const typeSyncToPostMeta = type === 'tag' ? 'tags' :
        type === 'category' ? 'categories' :
            type === 'actor' ? 'actors' : ''

    metas.forEach(async meta => {
        // const metaPostCount = await postSchema.count({name:meta})

        // console.log( await postSchema.count({[typeSyncToPostMeta]:new RegExp(meta, 'i')}).exec())
        await metaSchema.findOneAndUpdate({ name: meta }, { count: await postSchema.count({ [typeSyncToPostMeta]: new RegExp(meta, 'i') }) })
    })
}


apiPostsControllers.creatPost = async (req,res)=>{
    const newPost = req.body.postData

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
            res.json({message:'post ' + newPost.title + ' has been saved'})
            res.end()
        }).catch(err => {
            res.json({message:'****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
            if (err.code === 11000) {
                res.status(500).send({error: 'Post with this Title already exist in the Database'})
                // res.json({ savedPostData });
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


}

module.exports = apiPostsControllers