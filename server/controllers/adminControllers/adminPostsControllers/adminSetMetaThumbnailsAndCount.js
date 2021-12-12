//adminSetMetaThumbnailsAndCount
// @ts-ignore
const postSchema = require('../../../models/postSchema')
const metaSchema = require('../../../models/metaSchema')
// @ts-ignore
module.exports = async (req,res) =>{
    try {

        res.end()
        await metaSchema.syncIndexes()
        const type = req.query.type ? {type:req.query.type} : {}
        await metaSchema.find(type).exec().then(async (metas) => {
            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0){
                    const random = Math.floor(Math.random() * (metaCount || 0))
                    const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
                    const randomImageData = meta?.imageUrlLock ?  {} : {imageUrl : randomPostWithCurrentMeta?.mainThumbnail || ''}
                    const updateData = {
                        count: metaCount,
                        name:meta?.name.toLowerCase(),
                        status: meta?.status ? meta.status : 'published',
                        ...randomImageData
                    }
                    // console.log(updateData)
                   await metaSchema.findByIdAndUpdate(meta?._id, {$set:{...updateData}},{new: true}).exec().then((updated)=>{
                        console.log(updated.type + ':' +updated.name,' updated')
                    }).catch(err=>{
                        console.log('ERROR : ',meta?.name)
                    })
                }else {
                    await  metaSchema.findByIdAndUpdate(meta?._id,{$set:{status:'draft'}}).exec()
                }
            }
        })

    } catch (e) {
        console.log('ERROR',e.stack)
    }
}