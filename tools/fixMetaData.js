require('dotenv').config()
require('../server/_variables/connectToDatabase')
const mongoose = require('mongoose');
const postSchema = require('../server/models/postSchema')
const metaSchema = require('../server/models/metaSchema')

const metaFixer = async () => {
    try {
        await metaSchema.find({}).exec().then(async metas => {
            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0){
                    const random = Math.floor(Math.random() * (metaCount || 10))
                    const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
                    const updateData = {
                        count: metaCount,
                        status: meta?.status ? meta.status : 'published',
                        imageUrl: randomPostWithCurrentMeta?.mainThumbnail || ''
                    }
                    metaSchema.findByIdAndUpdate(meta?._id, {...updateData},{new: true}).exec().then(updated=>{
                        console.log('UPDATED',updated.name)
                    }).catch(err=>{
                        console.log('ERROR',meta?.name)
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

metaFixer()
