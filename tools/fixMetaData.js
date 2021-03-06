const mongoose = require('mongoose');
require('dotenv').config()
const postSchema = require('../server/models/postSchema')
const metaSchema = require('../server/models/metaSchema')

const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

const metaFixer =  ()=>{
    metaSchema.find({}).exec().then(async metas=>{
        try{
            for await (let meta of metas){
                const metaCount = await postSchema.countDocuments({$and:[{[meta.type]: meta._id},{status:'published'}]}).exec()
                if (metaCount === 0){
                    metaSchema.findByIdAndDelete(meta._id).exec().then(()=>{
                        console.log(meta.name, 'had 0 posts and was deleted')
                    })
                }else{
                    const setMetaCountData = meta.count ? {} : {count:metaCount}
                    const setMetaStatus = meta.status ? {} : {status:'published'}
                    const randomPostWithCurrentMeta = await postSchema.find({$and:[{[meta.type]: meta._id},{status:'published'}]}).skip(Math.floor(Math.random() * metaCount)).limit(1).sort('-_id').exec()
                    const randomPostWithCurrentMetaImageUrl =randomPostWithCurrentMeta?.[0]?.mainThumbnail
                    const setMetaRandomImage = {imageUrl:randomPostWithCurrentMetaImageUrl}
                    const updateData = {
                        ...setMetaCountData,
                        ...setMetaStatus,
                        ...setMetaRandomImage,
                        ...setMetaRandomImage
                    }
                    metaSchema.findByIdAndUpdate(meta._id,{...updateData},{new: true}).exec().then(updated=>{
                        console.log(updated.name,' has been updated ')
                    }).catch(err=>{
                        console.log(err)
                    })
                }

            }
        }
        catch (e) {
            console.log(e)
        }
    })
}

metaFixer()
