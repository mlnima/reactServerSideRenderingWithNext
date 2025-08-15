// @ts-nocheck
import { IMeta } from '@repo/typescript-types';
import metaSchema from '../schemas/metaSchema';

export const createMeta = async (meta: IMeta) => {
  try {
    const dataToSave = new metaSchema(meta);
    const savedMeta = await dataToSave.save();
    console.log(`New Meta Created`, savedMeta?.name);
    return savedMeta;
  } catch (error) {
    console.error(`Can't create New Meta `, error);
    return null;
  }
};

interface IUpdateMeta {
  _id?: string;
  metasData: IMeta;
}

export const updateCreateMetaByNameNType = async ({ metasData }: IUpdateMeta): Promise<IMeta | null> => {
  try {
    const findQuery = {
      $and: [
        // { name: metasData.name },
        { name: { $regex: `^${metasData.name}$`, $options: 'i' } },
        { type: metasData.type },
      ],
    };
    const meta = await metaSchema
      .findOneAndUpdate(
        findQuery,
        { $set: { name: metasData.name, type: metasData.type } },
        {
          new: true,
          upsert: true,
        },
      )
      .exec();
    return meta._id;
  } catch (error) {
    console.error(`Error: updateCreateMetaByNameNType`, error);
    return null;
  }
};

export const updateCreateMultipleMetaByNameNType = async (metas: IMeta[]) => {
  try {
    if (!Array.isArray(metas) || metas.length < 1) {
      return [];
    }
    let finalData = [];

    for await (const metasData of metas) {
      if (metasData.name && metasData.type) {
        const metaId = await updateCreateMetaByNameNType({ metasData });
        if (metaId) {
          finalData.push(metaId);
        }
      }
    }

    return finalData;
  } catch (error) {
    console.log(`Error: updateCreateMultipleMetaByNameNType => `, error);
    return [];
  }
};
