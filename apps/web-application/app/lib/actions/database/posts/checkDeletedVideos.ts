'use server';
import axios from 'axios';
import { connectToDatabase, metaSchema, isValidObjectId, postSchema } from '@repo/db';
import { IMeta, MetasType } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';


const removeThePost = async (_id:string)=>{
  try {
    const removingPost = await postSchema.findByIdAndUpdate(_id,{$set:{status:'trash'}},{new:true})
    const metas = [...( removingPost?.tags || []),...( removingPost?.categories || []),...( removingPost?.categories || [])]
    for await (const meta of metas){
      await metaSchema.findByIdAndUpdate(meta,{$inc:{count:-1}})
    }
  }catch (error){}
}

export const checkAndRemoveSingleVideo = async (_id:string)=>{
  try {
    await metaSchema.syncIndexes()
    await postSchema.syncIndexes()
    const post = await postSchema.findById(_id)
    if (post?.videoEmbedCode){
      await axios.get(post.videoEmbedCode).then(response=>{
        return successResponse({
          message: 'its ok',
        });
      }).catch(async (error)=>{
        if (error?.response?.status === 410 || error?.response?.status === 404){
          await removeThePost(_id)
        }
      })
    }

  }catch (error){
    console.log(`Error: checkAndRemoveSingleVideo - `,error)
  }
}


export const checkRemovedVideos = async ()=>{
  try {

   let groupsCount = 0
   let currentGroup = 1
   const countVideos = await postSchema.countDocuments({$and:[{type:'video'},{status:'published'}]})
    if (!countVideos){
      return
    }
    if (countVideos > 500){
      groupsCount = Math.ceil(countVideos / 500)
    }else {
      groupsCount = 1
    }

    let postFindPromises = []

    while (currentGroup <= groupsCount){
      postFindPromises.push(await postSchema.find({$and:[{type:'video'},{status:'published'}]}).skip(currentGroup * 500))
      currentGroup++
    }
    // console.log(`postFindPromises=> `,postFindPromises.length)
    return successResponse({
      message: 'done',
    });

  }catch (error){
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }

}