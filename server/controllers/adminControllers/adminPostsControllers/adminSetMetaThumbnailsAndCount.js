//adminSetMetaThumbnailsAndCount
// @ts-ignore
const postSchema = require('../../../models/postSchema')
const metaSchema = require('../../../models/metaSchema')
// @ts-ignore
module.exports = async (req,res) =>{
    try {
        res.end()
        await metaSchema.find({}).exec().then(async (metas) => {
            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0){
                    const random = Math.floor(Math.random() * (metaCount || 0))
                    const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
                    const updateData = {
                        count: metaCount,
                        status: meta?.status ? meta.status : 'published',
                        imageUrl: randomPostWithCurrentMeta?.mainThumbnail || ''
                    }
                   await metaSchema.findByIdAndUpdate(meta?._id, {$set:{...updateData}},{new: true}).exec().then((updated)=>{
                        // console.log(updated.name,' updated')
                    }).catch(()=>{
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