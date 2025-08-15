'use server';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
import { randomNumberGenerator } from '@repo/utils/dist/src';

const resetMetaImage = async (_id: string) => {
  try {
    await connectToDatabase('resetMetaImage');

    let metaDocument = await metaSchema.findById(_id).lean().exec();

    if (metaDocument && !metaDocument.imageUrlLock) {
      const metaCount = await postSchema
        .countDocuments({
          $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
        })
        .exec();

      if (metaCount > 0) {
        const randomSkip = randomNumberGenerator(1, metaCount);

        let findPostWithSameMeta = await postSchema
          .findOne({
            $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
          })
          .skip(randomSkip)
          .lean()
          .exec();

        if (findPostWithSameMeta) {
          await metaSchema.findByIdAndUpdate(_id, { imageUrl: findPostWithSameMeta.mainThumbnail }).exec();
        }
        findPostWithSameMeta = null;
      }
    }
    metaDocument = null;
    return null;
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