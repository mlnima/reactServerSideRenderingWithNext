
require('../_variables/connectToDatabase')
const {parentPort, workerData} = require("worker_threads");
const metaSchema = require('../models/metaSchema')
const postSchema = require("../models/postSchema");

const setMetaThumbnailsAndCount = async (workerData) => {
    try {
        await metaSchema.syncIndexes()
        const type = workerData.type ? {type: workerData.type} : {}
        await metaSchema.find(type).exec().then(async (metas) => {
            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0) {
                    const random = Math.floor(Math.random() * (metaCount || 0))
                    const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
                    const randomImageData = meta?.imageUrlLock ? {} : {imageUrl: randomPostWithCurrentMeta?.mainThumbnail || ''}

                    const updateData = {
                        count: metaCount,
                        name: meta?.name.toLowerCase(),
                        status: meta?.status ? meta.status : 'published',
                        ...randomImageData
                    }
                    await metaSchema.findByIdAndUpdate(meta?._id, {$set: {...updateData}}, {new: true}).exec()
                } else {
                    await metaSchema.findByIdAndUpdate(meta?._id, {$set: {status: 'draft'}}).exec()
                }
            }
        })
    } catch (err) {
        console.log('ERROR', err.stack)
    }
    return null
}

setMetaThumbnailsAndCount(workerData).then(res => {
    parentPort.postMessage(res)
    process.exit(0);
})
