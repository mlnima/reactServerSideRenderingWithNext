import dotenv from 'dotenv';
import {connectToDatabase} from 'custom-server-util';
import {parentPort, workerData} from 'worker_threads';
import {MetaSchema,PostSchema} from 'shared-schemas';
import axios from 'axios';
dotenv.config();
connectToDatabase()

const checkAndRemoveDeletedVideos = async ()=>{
    try {
        await MetaSchema.syncIndexes()
        await PostSchema.syncIndexes()

        await PostSchema.find({$and:[{type:'video'},{status:'published'}]}).exec().then(async posts=>{
            for await (const post of posts){
                if (post?.videoEmbedCode){
                    await axios.get(post.videoEmbedCode).then(()=>{
                        console.log(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/video/${post._id} is ok`)
                    }).catch(async err=>{
                        if (err?.response?.status === 410 || err?.response?.status === 404){
                            await PostSchema.findByIdAndUpdate(post._id,{$set:{status:'trash'}},{new:true}).exec().then(trashedPost=>{
                                const metas = [...( trashedPost?.tags || []),...( trashedPost?.categories || []),...( trashedPost?.categories || [])]
                                metas.forEach(meta=>{
                                   MetaSchema.findByIdAndUpdate(meta,{$inc:{count:-1}}).exec()
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