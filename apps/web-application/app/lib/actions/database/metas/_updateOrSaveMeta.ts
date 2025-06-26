'use server';
import { metaSchema, postSchema, connectToDatabase } from '@repo/db';
import { Types } from 'mongoose';
import { IMeta } from '@repo/typescript-types';

const _updateSaveMetas = async (metas: IMeta[]): Promise<Types.ObjectId[]> => {
  if (!Array.isArray(metas) || metas.length < 1) {
    return [];
  }

  let connection;
  try {
    connection = await connectToDatabase('_updateSaveMetas');
    const session = await connection.startSession();

    let finalData: Types.ObjectId[] = [];

    // Using a transaction ensures all operations within the callback are atomic.
    // If any operation fails, all previous operations in the transaction are rolled back.
    await session.withTransaction(async () => {
      // Clear the array at the start of the transaction to handle potential retries correctly.
      finalData = [];
      for (const meta of metas) {
        if (meta.name && meta.type) {
          const metaData = {
            name: meta.name,
            type: meta.type,
            status: 'published',
          };
          const findQuery = { $and: [{ name: meta.name }, { type: meta.type }] };

          // 1. Upsert the meta document within the session.
          const updatedMeta = await metaSchema.findOneAndUpdate(
            findQuery,
            { $set: { ...metaData } },
            { new: true, upsert: true, session }
          );

          // 2. Count related posts within the session.
          const count = await postSchema.countDocuments(
            { $and: [{ [updatedMeta.type]: updatedMeta._id }, { status: 'published' }] },
            { session }
          );

          // 3. Update the count on the meta document, using its unique _id.
          await metaSchema.findByIdAndUpdate(
            updatedMeta._id,
            { $set: { count } },
            { session }
          );

          finalData.push(updatedMeta._id);
        }
      }
    });

    // The session is automatically ended by `withTransaction`.
    return finalData;

  } catch (error) {
    console.log('Error on saving meta (transaction rolled back):', error);
    // Return an empty array on failure, maintaining the original function's behavior.
    return [];
  }
};

export default _updateSaveMetas;
// 'use server';
// import { metaSchema,postSchema,connectToDatabase } from '@repo/db';
// import {Types} from 'mongoose';
// import { IMeta } from '@repo/typescript-types';
//
// const _updateSaveMetas = async (metas:IMeta[]) => {
//   let finalData : Types.ObjectId[] = []
//
//   if (!Array.isArray(metas) || metas.length < 1) return [];
//
//   try{
//     await connectToDatabase('_updateSaveMetas');
//     for await (let meta of (metas || [])) {
//       if (meta.name && meta.type ){
//         const metaData = {
//           name: meta.name,
//           type: meta.type,
//           status:'published',
//         }
//         const findQuery = {$and:[{name: meta.name},{type: meta.type}]}
//
//         const updatedMeta =  await metaSchema.findOneAndUpdate(findQuery, {$set:{...metaData}},{new:true, upsert: true})
//
//         const count = await postSchema.countDocuments({$and:[{[updatedMeta.type]: updatedMeta._id},{status:'published'}]})
//         await metaSchema.findOneAndUpdate({name: updatedMeta.name}, {$set:{count}})
//         finalData = [...finalData, updatedMeta._id]
//       }
//     }
//     return finalData
//   }catch (error) {
//     console.log('error on saving meta',error)
//     return []
//   }
// }
//
// export default _updateSaveMetas;