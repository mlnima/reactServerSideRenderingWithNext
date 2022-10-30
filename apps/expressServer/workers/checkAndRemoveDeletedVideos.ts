import dotenv from 'dotenv';
import connectToDatabase from '../_variables/connectToDatabase';
import {parentPort, workerData} from 'worker_threads';
import metaSchema from '../models/metaSchema';
import postSchema from '../models/postSchema';
import axios from 'axios';
dotenv.config();
connectToDatabase()

const checkAndRemoveDeletedVideos = async ()=>{
    try {
        await metaSchema.syncIndexes()
        await postSchema.syncIndexes()

        await postSchema.find({$and:[{type:'video'},{status:'published'}]}).exec().then(async posts=>{
            for await (const post of posts){
                if (post?.videoEmbedCode){
                    await axios.get(post.videoEmbedCode).then(()=>{
                        console.log(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/video/${post._id} is ok`)
                    }).catch(async err=>{
                        if (err?.response?.status === 410 || err?.response?.status === 404){
                            await postSchema.findByIdAndUpdate(post._id,{$set:{status:'trash'}},{new:true}).exec().then(trashedPost=>{
                                const metas = [...( trashedPost?.tags || []),...( trashedPost?.categories || []),...( trashedPost?.categories || [])]
                                metas.forEach(meta=>{
                                   metaSchema.findByIdAndUpdate(meta,{$inc:{count:-1}}).exec()
                                })
                                console.log(`http://localhost:3000/post/video/${post._id} trashed`)
                            })
                        }else {
                            console.log(err.stack)
                        }
                    })
                }
            }
        })
        return null
    }catch (err){
        console.log(err)
    }
}

checkAndRemoveDeletedVideos().then(res => {
    parentPort.postMessage(res)
    process.exit(0);
})