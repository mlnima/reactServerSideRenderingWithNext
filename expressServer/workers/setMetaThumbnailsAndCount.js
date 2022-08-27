import dotenv from 'dotenv';
dotenv.config();
import {connectToDatabase} from '../_variables/connectToDatabase';
connectToDatabase().finally()
const {parentPort, workerData} = require("worker_threads");
const metaSchema = require('../models/metaSchema')
const postSchema = require("../models/postSchema");
const mongoose = require("mongoose");

const randomNumberGenerator = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

const setMetaThumbnailsAndCount = async (workerData) => {
    try {
        const excludesPostFromSources = process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : [];

        const excludeContent = excludesPostFromSources.map(excludeWord => {
            const expression = `.*${excludeWord}.*`
            return {'videoEmbedCode': {$not: new RegExp(expression, "g")}}
        })

        const excludeQuery = {$or: excludeContent}


        await metaSchema.syncIndexes()
        const type = workerData.type ? {type: workerData.type} : {}
        await metaSchema.find(type).exec().then(async (metas) => {
            for await (let meta of metas) {
                //const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'},excludeQuery]}).exec()
                const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: {$in: meta?._id}}, {status: 'published'}, excludeQuery]}).exec()

                if (metaCount > 0 && meta?._id) {
                    //***************************
                    const totalSumData =  await postSchema.aggregate(
                        [
                            {
                                $match: {
                                    $and: [
                                        {status: "published"},
                                        {[meta?.type]: {$exists:true}},
                                        {[meta?.type]: {$in: [mongoose.Types?.ObjectId(meta._id)]}},
                                    ]
                                }
                            },
                            {$project: {likes: 1, views: 1,[meta?.type]:1}},
                            {
                                $group: {
                                    _id: null,
                                    likes: {$sum: {$add: ["$likes"]}},
                                    views: {$sum: {$add: ["$views"]}}
                                }
                            }
                        ]
                    )
                    //***************************

                    let updateData = {
                        count: metaCount,
                        name: meta?.name.toLowerCase(),
                        status: 'published',
                        likes:totalSumData?.[0]?.likes || 0,
                        views:totalSumData?.[0]?.views || 0,
                    }

                    if (!meta?.imageUrlLock){
                        const skipDocuments = randomNumberGenerator(1, 10)
                        const randomPost =  await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}, excludeQuery]}).sort({updatedAt: -1}).skip(skipDocuments).exec()
                        if (randomPost?.mainThumbnail){
                            updateData.imageUrl = randomPost.mainThumbnail
                        }
                    }

                    await metaSchema.findByIdAndUpdate(
                        meta?._id,
                        {$set: {...updateData}},
                        {timestamps: false}
                    ).exec().finally(()=>{
                        console.log(`${meta?.type} ${meta?.name} set to ${JSON.stringify(updateData,null,'\t')}`)
                    })
                } else {
                    await metaSchema.findByIdAndUpdate(
                        meta?._id,
                        {$set: {status: 'draft'}},
                        {timestamps: false}
                    ).exec()
                    console.log(meta?.name, `drafted`)
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
