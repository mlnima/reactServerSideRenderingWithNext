'use server';
import { connectToDatabase, metaSchema,postSchema } from '@repo/db';
import { randomNumberGenerator } from '@repo/utils';
import { isEmptyObject } from '@repo/utils';

const resetMetaImage = async (_id: string) => {
  try {
    await connectToDatabase('resetMetaImage');
    const metaDocument = await metaSchema.findById(_id);
    const metaCount = await postSchema
      .countDocuments({
        $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
      })
    const randomSkip = randomNumberGenerator(1, metaCount);

    if (!isEmptyObject(metaDocument) && !metaDocument?.imageUrlLock) {
      const findPostWithSameMeta = await postSchema
        .findOne({
          $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
        })
        .skip(randomSkip)
      if (findPostWithSameMeta) {
        await metaSchema.findByIdAndUpdate(_id, { imageUrl: findPostWithSameMeta.mainThumbnail })
        return null
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    return
  }
};

export default resetMetaImage;