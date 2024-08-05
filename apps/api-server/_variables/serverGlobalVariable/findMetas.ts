import metaSchema from '@schemas/metaSchema';
import { metaFieldsRequestForCard } from '@repo/data-structures';
import {multiQueryUniquer} from "@util/queryUtil";
import GlobalStore from "@store/GlobalStore";

interface FindMetasQueryTypes {
    [key: string]: any;
}

export const findMetas = async (query: FindMetasQueryTypes) => {
    try {
        const contentPerPage = GlobalStore.getContentPerPage();
        const locale = query.locale;
        const statusQuery = { status: 'published' };
        const type = { type: query?.metaType };
        const notStartWithNumberRegex = /^(?![0-9].*$).*/g;
        const notStartWithAlphabetRegex = /^(?![A-Za-z].*$).*/g;
        const startWithQuery =
            query.startWith === 'other'
                ? { name: { $regex: notStartWithAlphabetRegex } }
                : !query.startWith
                  ? { name: { $regex: notStartWithNumberRegex } }
                  : { name: { $regex: '^' + query.startWith } };
        const countQuery = { count: { $gt: 0 } };
        const limit = contentPerPage
        const page = query?.page || 1;
        const skip = page ? limit * (page - 1) : 0;
      //  const selectQuery = `name type ${query?.metaType !== 'tags' ? 'imageUrl' : ''} translations.${locale}.name`;
      //   const selectQuery =query?.metaType === 'tags'  ?
      //       [metaFieldsRequestForCard,`translations.${locale}.name`] :
      //       [...metaFieldsRequestForCard,'imageUrl','translations.${locale}.name']  `name type ${query?.metaType !== 'tags' ? 'imageUrl' : ''} translations.${locale}.name`;

        const sortQuery = !query.sort
            ? {
                  rank: 1,
                  count: -1,
              }
            : { [query.sort]: -1 };

        const findQuery = {
            $and: [type, startWithQuery, statusQuery, countQuery],
        };

        const totalCount = await metaSchema.countDocuments(findQuery).exec();

        const metas = await metaSchema
            .find(findQuery, {}, { sort: sortQuery })
            .limit(limit || (query?.startWith ? 0 : 1000))
            .skip(skip)
            .select(metaFieldsRequestForCard(multiQueryUniquer(query?.metaType),locale))
            .exec();

        return {
            metas,
            totalCount,
        };
    } catch (error) {
        console.log(error);
        return {
            metas: [],
            totalCount: 0,
        };
    }
};
