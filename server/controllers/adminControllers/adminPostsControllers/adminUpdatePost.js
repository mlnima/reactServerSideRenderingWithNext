
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


module.exports =  async (req, res) => {
    const postUpdatedData = req.body.postData

    try {
        const finalPostUpdatedData = {
            ...postUpdatedData,
            lastModify: Date.now(),
            tags: postUpdatedData.tags ? await metasSaver(postUpdatedData.tags) : [],
            categories: postUpdatedData.categories ? await metasSaver(postUpdatedData.categories) : [],
            actors: postUpdatedData.actors ? await metasSaver(postUpdatedData.actors) : []
        }

        await postSchema.findByIdAndUpdate(postUpdatedData._id, {...finalPostUpdatedData}, {new: true}).exec().then(updated => {
            res.end()
        }).catch(err => {
            console.log(err)
            res.sendStatus(500);
            res.end()
        })
        res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
};