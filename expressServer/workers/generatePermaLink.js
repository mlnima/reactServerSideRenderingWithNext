import dotenv from 'dotenv';
dotenv.config();
import {connectToDatabase} from '../_variables/connectToDatabase';
connectToDatabase().finally()
const postSchema = require("../models/postSchema");
const {parentPort, workerData} = require("worker_threads");

const generatePermaLink = async (workerData)=>{

   try{
      await postSchema.syncIndexes()
      const findingPostsQuery = {permaLink:{$exists:false}}
      // const findingPostsQuery = {}
      await postSchema.find(findingPostsQuery).exec().then(async posts=>{
            for await (let post of posts){
               const permaLink = post?.title ? post.title.replaceAll(' ','-') : null
               await postSchema.findByIdAndUpdate(post._id,{$set: {permaLink}},{new:true,timestamps:false}).exec().then(updatedPost=>{
                  parentPort.postMessage({type:'log',message:`${updatedPost._id},${updatedPost.title},${updatedPost.permaLink}`})
               })
            }
         parentPort.postMessage({type:'action',message:'job is done',exit:true})
      })

   }catch (err) {
      console.log('err')
   }
   return null
}


generatePermaLink(workerData).then(()=>{

   parentPort.on('message',(data)=>{
      console.log('message from main process:',data)
       if (data.exit){
          process.exit(0);
       }
   })

})