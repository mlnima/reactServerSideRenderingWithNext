'use server';
import { metaSchema,postSchema,connectToDatabase } from '@repo/db';
import {Types} from 'mongoose';


const _updateSaveMetas = async (metas:{name:string,type:string}[]) => {
  let finalData : Types.ObjectId[] = []

  if (!Array.isArray(metas) || metas.length < 1) return [];

  try{
    await connectToDatabase('_updateSaveMetas');
    for await (let meta of (metas || [])) {
      if (meta.name && meta.type ){
        const metaData = {
          name: meta.name,
          type: meta.type,
          status:'published',
        }
        const findQuery = {$and:[{name: meta.name},{type: meta.type}]}

        const updatedMeta =  await metaSchema.findOneAndUpdate(findQuery, {$set:{...metaData}},{new:true, upsert: true})

        const count = await postSchema.countDocuments({$and:[{[updatedMeta.type]: updatedMeta._id},{status:'published'}]})
        await metaSchema.findOneAndUpdate({name: updatedMeta.name}, {$set:{count}})
        finalData = [...finalData, updatedMeta._id]
      }
    }
    return finalData
  }catch (error) {
    console.log('error on saving meta',error)
    return []
  }
}

export default _updateSaveMetas;