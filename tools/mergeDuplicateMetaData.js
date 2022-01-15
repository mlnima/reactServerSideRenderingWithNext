require('dotenv').config()
require('../server/_variables/connectToDatabase')
const mongoose = require('mongoose');
const postSchema = require('../server/models/postSchema')
const metaSchema = require('../server/models/metaSchema')
const {lowerCase} = require("lodash");

const mergeDuplicateMetaData = async (type) => {

    let state = {
        lowerCasesWithDuplicate: []
    }
    try {
        await metaSchema.find({type}).exec().then(async metas => {
            for await (const meta of metas) {
                const metaName = meta?.name?.toLowerCase();
                if (meta?.name !== metaName) {
                    const lowerCasedMeta = await metaSchema.findOne({name: metaName}).exec()
                    if (lowerCasedMeta) {
                        //console.log({from:meta?._id, to : lowerCasedMeta._id})
                        //console.log({from: meta?.name, to: lowerCasedMeta.name})
                        console.log(meta?.name)
                        await postSchema.find({[type]: meta?._id}).exec().then(async posts => {
                            if (posts.length){
                                for await (const post of posts){
                                    await postSchema.findByIdAndUpdate(post?._id,{$pull:{[type]:meta?._id}},{new:true}).exec().then(async updatedPost=>{
                                        // console.log(updatedPost)
                                        await postSchema.findByIdAndUpdate(post?._id,{$push:{[type]:lowerCasedMeta._id}},{new:true}).exec().then(updatedPost=>{
                                            // console.log(updatedPost)
                                        })
                                    })
                                }

                                // const findPost = await postSchema.findById(posts[0]?._id).exec()
                                // console.log(findPost)
                                // await postSchema.findByIdAndUpdate(posts[0]?._id,{$pull:{[type]:meta?._id}},{new:true}).exec().then(async updatedPost=>{
                                //     console.log(updatedPost)
                                //     await postSchema.findByIdAndUpdate(posts[0]?._id,{$push:{[type]:lowerCasedMeta._id}},{new:true}).exec().then(updatedPost=>{
                                //         console.log(updatedPost)
                                //     })
                                // })
                            }
                        })
                        await metaSchema.findByIdAndDelete(meta?._id).exec()

                    }
                }
            }
        }).catch(err => {
            console.log(err)
        })
        // console.log('next')
        //  for await (const duplicates of state.lowerCasesWithDuplicate){
        //     await postSchema.find({[type]:[duplicates.from]}).exec().then(async posts=>{
        //               for await (const post of posts){
        //                  await postSchema.findByIdAndUpdate({_id:post?._id},{$pull:{[type]:duplicates.from},$push:{[type]:duplicates.to}},{new:true}).exec().then(updatedPost=>{
        //                      console.log(post?._id,duplicates.from,duplicates.to)
        //                  })
        //               }
        //
        //     })
        //      await metaSchema.findByIdAndDelete(duplicates.from).exec()
        //  }
        // console.log('done')
        // console.log(state.lowerCasesWithDuplicate)

        //
    } catch (err) {

    }
}


mergeDuplicateMetaData('actors').then(()=>{
    mergeDuplicateMetaData('categories').then(()=>{
        mergeDuplicateMetaData('tags')
    })
})