'use server';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
import { randomNumberGenerator, isEmptyObject } from '@repo/utils';

const resetMetaImage = async (_id: string) => {
  let connection;
  try {
    connection = await connectToDatabase('resetMetaImage');
    const session = await connection.startSession();

    try {
      let metaDocument = await metaSchema.findById(_id).session(session).lean();

      if (metaDocument && !metaDocument.imageUrlLock) {
        const metaCount = await postSchema
          .countDocuments({
            $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
          })
          .session(session);

        if (metaCount > 0) {
          const randomSkip = randomNumberGenerator(1, metaCount);

          let findPostWithSameMeta = await postSchema
            .findOne({
              $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
            })
            .skip(randomSkip)
            .session(session)
            .lean();

          if (findPostWithSameMeta) {
            await metaSchema.findByIdAndUpdate(_id, { imageUrl: findPostWithSameMeta.mainThumbnail }).session(session);
          }
          findPostWithSameMeta = null;
        }
      }
      metaDocument = null;
      return null;
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`resetMetaImage => `, error);
    return;
  }
};

export default resetMetaImage;


// 'use server';
// import { connectToDatabase, metaSchema,postSchema } from '@repo/db';
// import { randomNumberGenerator,isEmptyObject } from '@repo/utils';
//
//
// const resetMetaImage = async (_id: string) => {
//   try {
//     await connectToDatabase('resetMetaImage');
//     const metaDocument = await metaSchema.findById(_id);
//     const metaCount = await postSchema
//       .countDocuments({
//         $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
//       })
//     const randomSkip = randomNumberGenerator(1, metaCount);
//
//     if (!isEmptyObject(metaDocument) && !metaDocument?.imageUrlLock) {
//       const findPostWithSameMeta = await postSchema
//         .findOne({
//           $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
//         })
//         .skip(randomSkip)
//       if (findPostWithSameMeta) {
//         await metaSchema.findByIdAndUpdate(_id, { imageUrl: findPostWithSameMeta.mainThumbnail })
//         return null
//       } else {
//         return null
//       }
//     } else {
//       return null
//     }
//   } catch (error) {
//     return
//   }
// };
//
// export default resetMetaImage;