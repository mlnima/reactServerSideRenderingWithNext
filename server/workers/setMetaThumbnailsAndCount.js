require('../_variables/connectToDatabase')
const {parentPort, workerData} = require("worker_threads");
const metaSchema = require('../models/metaSchema')
const postSchema = require("../models/postSchema");

const randomNumberGenerator = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

const setMetaThumbnailsAndCount = async (workerData) => {
    try {
        await metaSchema.syncIndexes()
        const type = workerData.type ? {type: workerData.type} : {}
        await metaSchema.find(type).exec().then(async (metas) => {
            for await (let meta of metas) {
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
                if (metaCount > 0) {
                    const skipDocuments = randomNumberGenerator(1,10)
                    const postWithCurrentMeta = meta?.imageUrl ?  await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).sort({ updatedAt: -1 }).skip(skipDocuments).exec() :
                                                await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).sort({ updatedAt: -1 }).exec()

                    const randomImageData = meta?.imageUrlLock ? {} :
                                            postWithCurrentMeta?.mainThumbnail ? {imageUrl: postWithCurrentMeta?.mainThumbnail} :
                                            {}
                    const updateData = {
                        count: metaCount,
                        name: meta?.name.toLowerCase(),
                        status: meta?.status ? meta.status : 'published',
                        ...randomImageData
                    }
                    await metaSchema.findByIdAndUpdate(
                        meta?._id,
                        {$set: {...updateData}},
                        {timestamps: false}
                    ).exec()
                } else {
                    await metaSchema.findByIdAndUpdate(
                        meta?._id,
                        {$set: {status: 'draft'}},
                        {timestamps: false}
                    ).exec()
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
