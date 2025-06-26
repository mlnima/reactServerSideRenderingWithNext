'use server';
import { connectToDatabase, metaSchema, isValidObjectId, postSchema } from '@repo/db';
import { IMeta, MetasType, IPost } from '@repo/typescript-types';
import { randomNumberGenerator } from '@repo/utils';
import mongoose, { ClientSession } from 'mongoose';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

interface IMetaWithCount extends IMeta {
  _id: string;
  postCount: number;
}

const mergeDuplicateMeta = async (metaNameToMerge: string, metaType: MetasType, session: ClientSession) => {
  try {
    if (!metaNameToMerge || !metaType) {
      console.log('Error: metaNameToMerge or metaType missing.');
      return;
    }

    const normalizedInputName = metaNameToMerge.toLowerCase();

    const duplicateCandidates: IMeta[] = await metaSchema.find({
      name: new RegExp(`^${metaNameToMerge.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
      type: metaType,
    }).session(session).lean<IMeta[]>();

    if (duplicateCandidates.length < 2) {
      console.log(`No significant duplicates found for name "${metaNameToMerge}" (type: "${metaType}") to merge. Candidates found: ${duplicateCandidates.length}`);
      return;
    }

    console.log(`Found ${duplicateCandidates.length} potential duplicate candidates for "${metaNameToMerge}" (type: "${metaType}").`);

    const metasWithCounts: IMetaWithCount[] = [];
    for (const candidate of duplicateCandidates) {
      if (!candidate._id) {
        continue;
      }
      const count = await postSchema.countDocuments({
        [candidate.type as string]: candidate._id,
        status: 'published',
      }).session(session);
      metasWithCounts.push({ ...candidate, _id: candidate._id, postCount: count });
    }

    metasWithCounts.sort((a, b) => {
      if (b.postCount !== a.postCount) {
        return b.postCount - a.postCount;
      }
      const aIsNormalized = a.name.toLowerCase() === normalizedInputName;
      const bIsNormalized = b.name.toLowerCase() === normalizedInputName;

      if (aIsNormalized && !bIsNormalized) return -1;
      if (!aIsNormalized && bIsNormalized) return 1;

      return a._id.toString().localeCompare(b._id.toString());
    });

    const primaryMeta = metasWithCounts[0];
    const metasToMerge = metasWithCounts.slice(1);

    if (metasToMerge.length === 0) {
      console.log(`All candidates resolved to a single primary meta: "${primaryMeta.name}" (ID: ${primaryMeta._id}). No further merging action required for this set.`);
      return;
    }

    console.log(`Primary meta selected: "${primaryMeta.name}" (ID: ${primaryMeta._id}, Published Posts: ${primaryMeta.postCount})`);

    for (const metaToMerge of metasToMerge) {
      if (primaryMeta._id.toString() === metaToMerge._id.toString()) {
        continue;
      }

      console.log(`Merging "${metaToMerge.name}" (ID: ${metaToMerge._id}, Posts: ${metaToMerge.postCount}) into "${primaryMeta.name}" (ID: ${primaryMeta._id})`);

      const updateQueryKey = metaType as string;

      const postsToUpdateQuery = { [updateQueryKey]: metaToMerge._id };

      const updateAddResult = await postSchema.updateMany(
        postsToUpdateQuery,
        { $addToSet: { [updateQueryKey]: primaryMeta._id } },
        { session },
      );
      console.log(`  Step 1: Added primary meta ID to posts. Matched: ${updateAddResult.matchedCount}, Modified: ${updateAddResult.modifiedCount}`);

      const updatePullResult = await postSchema.updateMany(
        { [updateQueryKey]: metaToMerge._id },
        { $pull: { [updateQueryKey]: metaToMerge._id } },
        { session },
      );
      console.log(`  Step 2: Removed merged meta ID from posts. Matched: ${updatePullResult.matchedCount}, Modified: ${updatePullResult.modifiedCount}`);

      await metaSchema.findByIdAndDelete(metaToMerge._id, { session });
      console.log(`  Step 3: Deleted meta document: "${metaToMerge.name}" (ID: ${metaToMerge._id})`);
    }

    console.log(`Successfully merged duplicates of "${metaNameToMerge}" (type: "${metaType}") into "${primaryMeta.name}" (ID: ${primaryMeta._id}).`);

  } catch (error) {
    console.error(`Error during meta merge process for "${metaNameToMerge}" (type: "${metaType}"):`, error instanceof Error ? error.message : error);
  }
};

const setSingleMetaImageAndCount = async (meta: IMeta, session: ClientSession) => {
  try {
    const metaCount = await postSchema.countDocuments(
      { $and: [{ [meta.type]: { $in: meta?._id } }, { status: 'published' }] },
    ).session(session);

    if (metaCount > 0) {
      const totalSumData = await postSchema.aggregate([
        {
          $match: {
            $and: [
              { status: 'published' },
              { [meta?.type]: { $exists: true } },
              { [meta?.type]: { $in: [new mongoose.Types.ObjectId(meta._id)] } },
            ],
          },
        },
        { $project: { likes: 1, views: 1, [meta?.type]: 1 } },
        {
          $group: {
            _id: null,
            likes: { $sum: { $add: ['$likes'] } },
            views: { $sum: { $add: ['$views'] } },
          },
        },
      ]).session(session);

      let updateData = {
        count: metaCount,
        name: meta.name.toLowerCase(),
        status: 'published',
        likes: totalSumData?.[0]?.likes || 0,
        views: totalSumData?.[0]?.views || 0,
        imageUrl: meta?.imageUrl || '',
      };

      if (!meta?.imageUrlLock && meta.type !== 'tags') {
        const skipDocuments = metaCount <= 1 ? 0 : randomNumberGenerator(1, metaCount) - 1;
        const randomPost = await postSchema
          .findOne({
            $and: [
              { [meta?.type]: meta?._id },
              { status: 'published' },
              { mainThumbnail: { $exists: true } },
            ],
          })
          .sort({ updatedAt: -1 })
          .skip(skipDocuments)
          .session(session);

        if (randomPost?.mainThumbnail) {
          //@ts-ignore
          updateData.imageUrl = randomPost.mainThumbnail;
        }
      }

      await metaSchema.findByIdAndUpdate(
        meta?._id,
        { $set: { ...updateData } },
        { timestamps: false, session },
      ).finally(() => {
        console.log(
          `${meta?.type} ${meta?.name} has ${metaCount} and image set to ${updateData?.imageUrl || '/asset/images/default/no-image-available.png'}`,
        );
      });
    } else {
      await metaSchema.findByIdAndUpdate(
        meta?._id,
        { $set: { status: 'draft' } },
        { timestamps: false, session },
      );
      console.log(meta.name, ` status changed from ${meta.status} to draft`);
      return;
    }
  } catch (error) {
    console.log(`error on ${meta.name} with ${meta._id} setSingleMetaImageAndCount=> `);
    // @ts-expect-error: it's fine
    if (error?.stack?.includes('E11000 duplicate key error collection')) {
      await mergeDuplicateMeta(meta.name, meta.type, session);
    }
  }
};

const fixASingleMetaImageAndCountById = async (_id: string): Promise<ServerActionResponse> => {
  let connection;
  try {
    connection = await connectToDatabase('fixASingleMetaImageAndCountById');
    await metaSchema.syncIndexes();

    const session = await connection.startSession();
    try {
      const meta = await metaSchema.findById(_id).session(session);
      if (!meta) {
        return errorResponse({
          message: 'Meta was not found',
        });
      }

      await setSingleMetaImageAndCount(meta, session);

      return successResponse({
        message: 'Done',
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`fixASingleMetaImageAndCountById => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export const setAllMetaImagesAndCount = async (metaType?: 'categories' | 'tags' | 'actors'): Promise<ServerActionResponse> => {
  let connection;
  try {
    connection = await connectToDatabase('setAllMetaImagesAndCount');
    await metaSchema.syncIndexes();

    const session = await connection.startSession();
    try {
      const type = metaType ? { type: metaType } : {};
      const metas = await metaSchema.find(type).session(session);
      for await (let meta of metas) {
        await setSingleMetaImageAndCount(meta, session);
      }
      return successResponse({
        message: 'All metas processed successfully.',
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`setAllMetaImagesAndCount => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};



// 'use server';
// import { connectToDatabase, metaSchema, isValidObjectId, postSchema } from '@repo/db';
// import { IMeta, MetasType } from '@repo/typescript-types';
// import { randomNumberGenerator } from '@repo/utils';
// import mongoose from 'mongoose';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// interface IMetaWithCount extends IMeta {
//   _id: string;
//   postCount: number;
// }
//
// const mergeDuplicateMeta = async (metaNameToMerge: string, metaType: MetasType) => {
//   try {
//     if (!metaNameToMerge || !metaType) {
//       console.log('Error: metaNameToMerge or metaType missing.');
//       return;
//     }
//
//     const normalizedInputName = metaNameToMerge.toLowerCase();
//
//     const duplicateCandidates: IMeta[] = await metaSchema.find({
//       name: new RegExp(`^${metaNameToMerge.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'), // Escape regex special characters
//       type: metaType,
//     }).lean<IMeta[]>();
//
//     if (duplicateCandidates.length < 2) {
//       console.log(`No significant duplicates found for name "${metaNameToMerge}" (type: "${metaType}") to merge. Candidates found: ${duplicateCandidates.length}`);
//       return;
//     }
//
//     console.log(`Found ${duplicateCandidates.length} potential duplicate candidates for "${metaNameToMerge}" (type: "${metaType}").`);
//
//     const metasWithCounts: IMetaWithCount[] = [];
//     for (const candidate of duplicateCandidates) {
//       if (!candidate._id){
//         continue
//       }
//       const count = await postSchema.countDocuments({
//         [candidate.type as string]: candidate._id,
//         status: 'published',
//       });
//       metasWithCounts.push({ ...candidate, _id: candidate._id, postCount: count });
//     }
//
//     metasWithCounts.sort((a, b) => {
//       if (b.postCount !== a.postCount) {
//         return b.postCount - a.postCount;
//       }
//       const aIsNormalized = a.name.toLowerCase() === normalizedInputName;
//       const bIsNormalized = b.name.toLowerCase() === normalizedInputName;
//
//       if (aIsNormalized && !bIsNormalized) return -1;
//       if (!aIsNormalized && bIsNormalized) return 1;
//
//       // Fallback to older document (smaller _id) if names are equally "normalized" or not, or counts are same
//       return a._id.toString().localeCompare(b._id.toString());
//     });
//
//     const primaryMeta = metasWithCounts[0];
//     const metasToMerge = metasWithCounts.slice(1);
//
//     if (metasToMerge.length === 0) {
//       console.log(`All candidates resolved to a single primary meta: "${primaryMeta.name}" (ID: ${primaryMeta._id}). No further merging action required for this set.`);
//       return;
//     }
//
//     console.log(`Primary meta selected: "${primaryMeta.name}" (ID: ${primaryMeta._id}, Published Posts: ${primaryMeta.postCount})`);
//
//     for (const metaToMerge of metasToMerge) {
//       if (primaryMeta._id.toString() === metaToMerge._id.toString()) {
//         continue;
//       }
//
//       console.log(`Merging "${metaToMerge.name}" (ID: ${metaToMerge._id}, Posts: ${metaToMerge.postCount}) into "${primaryMeta.name}" (ID: ${primaryMeta._id})`);
//
//       const updateQueryKey = metaType as string;
//
//       const postsToUpdateQuery = { [updateQueryKey]: metaToMerge._id };
//
//       const updateAddResult = await postSchema.updateMany(
//         postsToUpdateQuery,
//         { $addToSet: { [updateQueryKey]: primaryMeta._id } },
//       );
//       console.log(`  Step 1: Added primary meta ID to posts. Matched: ${updateAddResult.matchedCount}, Modified: ${updateAddResult.modifiedCount}`);
//
//       const updatePullResult = await postSchema.updateMany(
//         { [updateQueryKey]: metaToMerge._id }, // Target posts that still contain the meta to merge
//         { $pull: { [updateQueryKey]: metaToMerge._id } },
//       );
//       console.log(`  Step 2: Removed merged meta ID from posts. Matched: ${updatePullResult.matchedCount}, Modified: ${updatePullResult.modifiedCount}`);
//
//       await metaSchema.findByIdAndDelete(metaToMerge._id);
//       console.log(`  Step 3: Deleted meta document: "${metaToMerge.name}" (ID: ${metaToMerge._id})`);
//     }
//
//     console.log(`Successfully merged duplicates of "${metaNameToMerge}" (type: "${metaType}") into "${primaryMeta.name}" (ID: ${primaryMeta._id}).`);
//
//   } catch (error) {
//     console.error(`Error during meta merge process for "${metaNameToMerge}" (type: "${metaType}"):`, error instanceof Error ? error.message : error);
//   }
//
// };
//
// const setSingleMetaImageAndCount = async (meta: IMeta) => {
//   try {
//
//     const metaCount = await postSchema.countDocuments({
//       $and: [{ [meta.type]: { $in: meta?._id } }, { status: 'published' }],
//     });
//
//     if (metaCount > 0) {
//       const totalSumData = await postSchema.aggregate([
//         {
//           $match: {
//             $and: [
//               { status: 'published' },
//               { [meta?.type]: { $exists: true } },
//               {
//                 [meta?.type]: { $in: [new mongoose.Types.ObjectId(meta._id)] },
//               },
//             ],
//           },
//         },
//         { $project: { likes: 1, views: 1, [meta?.type]: 1 } },
//         {
//           $group: {
//             _id: null,
//             likes: { $sum: { $add: ['$likes'] } },
//             views: { $sum: { $add: ['$views'] } },
//           },
//         },
//       ]);
//
//
//       let updateData = {
//         count: metaCount,
//         name: meta.name.toLowerCase(),
//         status: 'published',
//         likes: totalSumData?.[0]?.likes || 0,
//         views: totalSumData?.[0]?.views || 0,
//         imageUrl: meta?.imageUrl || '',
//       };
//
//       if (!meta?.imageUrlLock && meta.type !== 'tags') {
//         const skipDocuments =
//           metaCount <= 1 ? 0 : randomNumberGenerator(1, metaCount) - 1;
//         const randomPost = await postSchema
//           .findOne({
//             $and: [
//               { [meta?.type]: meta?._id },
//               { status: 'published' },
//               { mainThumbnail: { $exists: true } },
//             ],
//           })
//           .sort({ updatedAt: -1 })
//           .skip(skipDocuments);
//         if (randomPost?.mainThumbnail) {
//           //@ts-ignore
//           updateData.imageUrl = randomPost.mainThumbnail;
//         }
//       }
//
//       await metaSchema.findByIdAndUpdate(
//         meta?._id,
//         { $set: { ...updateData } },
//         { timestamps: false },
//       )
//
//         .finally(() => {
//
//           console.log(
//             `${meta?.type} ${meta?.name} has ${metaCount} and image set to ${updateData?.imageUrl || '/asset/images/default/no-image-available.png'}`,
//           );
//         });
//
//
//     } else {
//       await metaSchema
//         .findByIdAndUpdate(
//           meta?._id,
//           { $set: { status: 'draft' } },
//           { timestamps: false },
//         );
//       console.log(meta.name, ` status changed from ${meta.status} to draft`);
//       return;
//     }
//
//
//   } catch (error) {
//     console.log(`error on ${meta.name} with ${meta._id} setSingleMetaImageAndCount=> `);
//
//     // @ts-expect-error: it's fine
//     if (error?.stack?.includes('E11000 duplicate key error collection')) {
//       // console.log(`duplicate key error collection`,)
//       await mergeDuplicateMeta(meta.name, meta.type);
//     }
//
//   }
// };
//
// const fixASingleMetaImageAndCountById = async (_id:string)=>{
//   try {
//     await metaSchema.syncIndexes();
//     await connectToDatabase('fixASingleMetaImageAndCountById');
//     const meta = await metaSchema.findById(_id)
//     if (!meta){
//       return errorResponse({
//         message: 'Meta was not found',
//       });
//     }
//
//     await setSingleMetaImageAndCount(meta)
//
//     return successResponse({
//       message: 'Done',
//     });
//   }catch (error){
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// }
//
// export const setAllMetaImagesAndCount = async (metaType?: 'categories' | 'tags' | 'actors') => {
//   try {
//     await connectToDatabase('setAllMetaImagesAndCount');
//     await metaSchema.syncIndexes();
//     const type = metaType ? { type: metaType } : {};
//     const metas = await metaSchema.find(type);
//     for await (let meta of metas) {
//       await setSingleMetaImageAndCount(meta);
//     }
//   } catch (error) {
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };