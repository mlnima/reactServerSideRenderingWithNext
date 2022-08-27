import dotenv from 'dotenv';
dotenv.config();
import {connectToDatabase} from '../expressServer/_variables/connectToDatabase';
connectToDatabase().finally()
import PostSchema from '../expressServer/models/postSchema';
import MetaSchema from '../expressServer/models/metaSchema';

const metaFixer = async () => {
    try {
        await MetaSchema.find({}).exec().then(async metas => {
            for await (let meta of metas) {
                const metaCount = await PostSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0){
                    const random = Math.floor(Math.random() * (metaCount || 10))
                    const randomPostWithCurrentMeta = await PostSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
                    const updateData = {
                        count: metaCount,
                        name: meta?.name.toLowerCase(),
                        status: meta?.status ? meta.status : 'published',
                        imageUrl: randomPostWithCurrentMeta?.mainThumbnail || ''
                    }
                    MetaSchema.findByIdAndUpdate(meta?._id, {...updateData},{new: true}).exec().then(updated=>{
                        console.log('UPDATED',updated.name)
                    }).catch(err=>{
                        console.log('ERROR',meta?.name)
                    })
                }else {
                   await  MetaSchema.findByIdAndUpdate(meta?._id,{$set:{status:'draft'}}).exec()
                }
            }
        })

    } catch (e) {
        console.log('ERROR',e.stack)
    }
}

metaFixer()
