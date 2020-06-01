let apiPostsControllers = {}
const postSchema = require('../../models/postSchema')
const metaSchema = require('../../models/metaSchema');

const metasSaver = async (metas, type) => {
    metas.forEach(meta => {
        const metaDataToSave = new metaSchema({
            name: meta,
            type
        })
        metaDataToSave.save().then(saved => {

        }).catch(err => {

        })
    })
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


apiPostsControllers.creatPost = (req,res)=>{
    const newPost = req.body.postData

    if (newPost.tags) {
        metasSaver(newPost.tags, 'tag').then(() => {
            metaCountSetter(newPost.tags, 'tag')
        })
    }
    if (newPost.categories) {
        metasSaver(newPost.categories, 'category').then(() => {
            metaCountSetter(newPost.categories, 'category')
        })
    }
    if (newPost.actors) {
        metasSaver(newPost.actors, 'actor').then(() => {
            metaCountSetter(newPost.actors, 'actor')
        })
    }
    newPost.lastModify = Date.now()
    const dataToSave = new postSchema(newPost)
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