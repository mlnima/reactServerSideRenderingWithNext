import { connectToDatabase, metaSchema } from '@repo/db';
import postSchema from '@lib/actions/database/schemas/postSchema';
import { randomNumberGenerator } from '@repo/utils/dist/src/maths';
import { isEmptyObject } from '@repo/utils/dist/src/objects';

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