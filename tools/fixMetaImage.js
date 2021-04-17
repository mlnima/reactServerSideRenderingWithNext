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



const imageFixer = async ()=>{
    metaSchema.find({}).exec().then(async metas=>{
        try{
            for await (let meta of metas){
                if (!meta.imageUrl){
                   const lastPostWithCurrentMeta = await postSchema.find({$and:[{[meta.type]: meta._id},{status:'published'}]}).limit(1).sort('-_id').exec()
                   const lastPostWithCurrentMetaImageUrl =lastPostWithCurrentMeta?.[0]?.mainThumbnail
                    if (lastPostWithCurrentMetaImageUrl){
                        metaSchema.findByIdAndUpdate(meta._id,{imageUrl:lastPostWithCurrentMetaImageUrl},{new: true}).exec().then(updated=>{
                            console.log(updated.name,' set : ',lastPostWithCurrentMetaImageUrl, ' image')
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    })
}

imageFixer()
    //.then(()=>process.exit())