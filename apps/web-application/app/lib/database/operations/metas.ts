'use server';
import { connectToDatabase, isValidObjectId, metaSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { getSettings } from '@lib/database/operations/settings';
import { metaFieldsRequestForCard } from '@repo/data-structures';
import { Meta } from '@repo/typescript-types';
import { ObjectId } from 'mongodb';
import { postSchema } from '@repo/db';
import { randomNumberGenerator,isEmptyObject } from '@repo/utils';


interface IGetMetas {
  locale: string;
  startWith?: string;
  metaType: string;
  page?: number;
  count?: number;
}

interface IOGetMetas {
  metas: [] | null,
  totalCount: number | null,
}

export const _updateSaveMetas = async (metas:any) => {
  const metasData = metas ?? []
  let finalData : string [] = []

  try{
    for await (let meta of metasData) {
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

        // await MetaSchema.findOneAndUpdate(findQuery, {$set:{...metaData}},{new:true, upsert: true}).exec().then(async meta=>{
        //     const count = await PostSchema.countDocuments({$and:[{[meta.type]: meta._id},{status:'published'}]}).exec()
        //     await MetaSchema.findOneAndUpdate({name: meta.name}, {$set:{count}}).exec()
        //     finalData = [...finalData, meta._id]
        // })
      }
    }
    return finalData
  }catch (err) {
    console.log('error on saving meta')
  }
}

export const getMetas = async (
  {
    locale,
    startWith,
    metaType,
    page = 1,
    count
  }: IGetMetas): Promise<IOGetMetas> => {
  'use cache';
  try {
    await connectToDatabase('getMetas');
    const { initialSettings } = await getSettings(['initialSettings']);
    const numberOfCardsPerPage = initialSettings?.contentSettings?.numberOfCardsPerPage || 20;

    const notStartWithNumberRegex = /^(?![0-9].*$).*/g;
    const notStartWithAlphabetRegex = /^(?![A-Za-z].*$).*/g;
    const startWithQuery =
      startWith === 'other'
        ? { name: { $regex: notStartWithAlphabetRegex } }
        : !startWith
          ? { name: { $regex: notStartWithNumberRegex } }
          : { name: { $regex: '^' + startWith } };
    const countQuery = { count: { $gt: 0 } };
    let limit = count || numberOfCardsPerPage;
    if (metaType === 'tags' && limit > 1000) {
      limit = 1000;
    }
    if ((metaType === 'categories' || metaType === 'categories') && limit > 80) {
      limit = 80;
    }
    const type = { type: metaType };
    const statusQuery = { status: 'published' };

    const findQuery = {
      $and: [type, startWithQuery, statusQuery, countQuery],
    };
    const sortQuery = {
      rank: 1,
      updatedAt: -1,
      count: -1,
      createdAt: -1,
    };

    const totalCount = await metaSchema.countDocuments(findQuery).exec();

    let metas = await metaSchema
      .find(
        findQuery,
        null,
        {
          sort: sortQuery,
          limit,
          skip: limit * (page - 1),
        })
      .select([...metaFieldsRequestForCard(metaType, locale), `translations.${locale}.name`])
      .lean();

    metas = metas.map((meta) => {
      // @ts-expect-error: its fine
      meta._id = meta._id.toString();
      return meta;
    });

    cacheTag(
      'cacheItem',
      `CGetMetas-${locale}${metaType ? `-${metaType}` : ''}${
        page ? `-${page}` : ''
      }${startWith ? `-${startWith}` : ''}`,
    );

    return {
      // @ts-expect-error: fix later
      metas,
      totalCount,
    };

  } catch (error) {
    console.error(`getPostViews => `, error);
    return {
      metas: null,
      totalCount: null,
    };
  }
};

export const getMeta = async(_id:string)=>{
  try {
    await connectToDatabase('getMeta');
    const isId = isValidObjectId(_id);
    if (!isId){
      return null
    }
    let meta : Meta | null = await metaSchema.findById(_id)

    if (!meta || meta.status !== 'published'){
      return null
    }

    meta._id = meta._id.toString()

    return meta

  }catch (error){
    return null
  }
}

interface IGetMetaSuggestion {
  metaType: string,
  status?: string,
  startWith: string
}

export const getMetaSuggestion = async (
  {
    metaType,
    status = 'published',
    startWith,
  }: IGetMetaSuggestion) => {
  'use cache';
  try {
    await connectToDatabase('getMetaSuggestion');
    const startWithQuery =
      startWith === 'any'
        ? {}
        : {
          name: {
            $regex: '^' + startWith,
            $options: 'i',
          },
        };

    let metas = await metaSchema
      .find({ $and: [{ type: metaType }, startWithQuery, { status }] }, 'name type', {
        sort: { updatedAt: -1 },
      })
      .limit(10);
    if (!metas) {
      return [];
    }

    const suggestions = metas.map((meta: { _id: ObjectId, name: string }) => {
      return {
        value: meta._id.toString(),
        label: meta.name,
      };
    });

    cacheTag(
      'cacheItem',
      `CGetMetaSuggestion-${metaType ? `-${metaType}` : ''}${startWith ? `-${startWith}` : ''}`,
    );
    return suggestions;
  } catch (error) {
    return [];
  }
};

export const resetMetaImage = async (_id: string) => {
  try {
    await connectToDatabase('resetMetaImage');
    const metaDocument = await metaSchema.findById(metaId);
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
        await metaSchema.findByIdAndUpdate(metaId, { imageUrl: findPostWithSameMeta.mainThumbnail })
        return null
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
};