import { metaSchema, postSchema } from '@repo/db';

const _updateSaveMetas = async (metas: any) => {
  const metasData = metas ?? [];
  let finalData = [];

  try {
    for await (let meta of metasData) {
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
        const count = await postSchema.countDocuments({ $and: [{ [updatedMeta.type]: updatedMeta._id }, { status: 'published' }] }).exec();
        await metaSchema.findOneAndUpdate({ name: updatedMeta.name }, { $set: { count } }).exec();
        finalData = [...finalData, updatedMeta._id];
      }
    }
    return finalData;
  } catch (err) {
    console.log('error on saving meta');
  }
};

export default _updateSaveMetas;


// await MetaSchema.findOneAndUpdate(findQuery, {$set:{...metaData}},{new:true, upsert: true}).exec().then(async meta=>{
//     const count = await PostSchema.countDocuments({$and:[{[meta.type]: meta._id},{status:'published'}]}).exec()
//     await MetaSchema.findOneAndUpdate({name: meta.name}, {$set:{count}}).exec()
//     finalData = [...finalData, meta._id]
// })