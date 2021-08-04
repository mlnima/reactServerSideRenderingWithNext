const mongoose = require('mongoose');
require('dotenv').config()
const postSchema = require('../server/models/postSchema')
const metaSchema = require('../server/models/metaSchema')
require('../server/_variables/connectToDatabase')

const metaFixer = async () => {
    try {
        await metaSchema.find({}).exec().then(async metas => {

            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta.type]: meta._id}, {status: 'published'}]}).exec()

                const random = Math.floor(Math.random() * (metaCount || 10))

                const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta.type]: meta._id}, {status: 'published'}]}).skip(random).exec()

                const updateData = {
                    count: metaCount,
                    status: meta.status ? meta.status : 'published',
                    imageUrl: randomPostWithCurrentMeta?.mainThumbnail || ''
                }

                metaSchema.findByIdAndUpdate(meta._id, {...updateData},{new: true}).exec().then(updated=>{

                }).catch(err=>{

                    console.log(err)

                })
            }

        })

    } catch (e) {
        console.log(e)
    }
}

metaFixer()
