require('dotenv').config()
// require('custom-server-util/src/connectToDatabase')
const mongoose = require('mongoose');
import {postSchema,metaSchema} from 'models';

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
                        // console.log(meta?.name)
                        await postSchema.find({[type]: meta?._id}).exec().then(async posts => {
                            if (posts?.length){
                                for await (const post of posts){
                                    await postSchema.findByIdAndUpdate(post?._id,{$pull:{[type]:meta?._id}},{new:true}).exec().then(async updatedPost=>{
                                        await postSchema.findByIdAndUpdate(post?._id,{$push:{[type]:lowerCasedMeta._id}},{new:true}).exec().then(updatedPost=>{
                                        })
                                    })
                                }
                            }
                        })
                        await metaSchema.findByIdAndDelete(meta?._id).exec()

                    }
                }
            }
        }).catch(err => {
            console.log(err)
        })

    } catch (err) {

    }
}


mergeDuplicateMetaData('actors').then(()=>{
    mergeDuplicateMetaData('categories').then(()=>{
        mergeDuplicateMetaData('tags')
    })
})