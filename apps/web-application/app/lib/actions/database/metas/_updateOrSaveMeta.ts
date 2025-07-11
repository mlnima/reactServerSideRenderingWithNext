'use server';
import { metaSchema, postSchema, connectToDatabase } from '@repo/db';
import { Types } from 'mongoose';
import { IMeta } from '@repo/typescript-types';

const _updateSaveMetas = async (metas: IMeta[]): Promise<Types.ObjectId[]> => {
  if (!Array.isArray(metas) || metas.length < 1) {
    return [];
  }

  try {
    await connectToDatabase('_updateSaveMetas');

    let finalData: Types.ObjectId[] = [];

    finalData = [];
    for (const meta of metas) {
      if (meta.name && meta.type) {
        const metaData = {
          name: meta.name,
          type: meta.type,
          status: 'published',
        };
        const findQuery = { $and: [{ name: meta.name }, { type: meta.type }] };

        const updatedMeta = await metaSchema
          .findOneAndUpdate(
            findQuery,
            { $set: { ...metaData } },
            {
              new: true,
              upsert: true,
            },
          )
          .exec();

        const count = await postSchema
          .countDocuments({
            $and: [{ [updatedMeta.type]: updatedMeta._id }, { status: 'published' }],
          })
          .exec();

        await metaSchema.findByIdAndUpdate(updatedMeta._id, { $set: { count } }).exec();

        finalData.push(updatedMeta._id);
      }
    }

    return finalData;
  } catch (error) {
    console.log('Error on saving meta (transaction rolled back):', error);

    return [];
  }
};

export default _updateSaveMetas;
