// @ts-nocheck
import { Request } from 'express';
import GlobalStore from '@store/GlobalStore';
import { multiQueryUniquer } from './queryUtil';


export const excludePostsBySourceQueryGenerator = () => {
    if (!process.env.EXCLUDE_POSTS_SOURCE) {
        return [];
    }
    try {
        let queriesArr = [];
        const excludesUrls = process.env.EXCLUDE_POSTS_SOURCE.split(' ');
        for (const excludeUrl of excludesUrls) {
            queriesArr = [
                ...queriesArr,
                {
                    videoEmbedCode: {
                        $not: new RegExp(`.*${excludeUrl}.*`, 'g'),
                    },
                },
            ];
        }

        return queriesArr;
    } catch (error) {
        console.log(`Error excludePostsBySourceQueryGenerator=> `, error);
        return [];
    }
};

export const reqQueryToMongooseOptions = (req: Request) => {
    const initialSettings  = GlobalStore.getInitialSettings();
    const limit = req.query.size
        ? { limit: parseInt(multiQueryUniquer(req.query.size)) }
        : { limit: initialSettings?.layoutSettings?.numberOfCardsPerPage || 20 };
    const skip = req.query.page
        ? { skip: limit.limit * parseInt(multiQueryUniquer(req.query.page)) - limit.limit }
        : {};
    const sort = req.query.sort
        ? { sort: multiQueryUniquer(req.query.sort) }
        : { sort: '-updatedAt' };

    return {
        ...limit,
        ...skip,
        ...sort,
    };
};

const searchQueryGeneratorForPosts = (keyword: string, isAdmin: boolean, lang?: string) => {
    if (isAdmin) {
        const locales = GlobalStore.getLocales();
        const allLocalesQuery = locales.reduce((final: { [key: string]: any }[], current: string) => {
            final = [...final, { [`translations.${current}.title`]: new RegExp(keyword, 'i') }];
            return final;
        }, []);

        return  [{
            $or: [
            ...allLocalesQuery,
            {title: new RegExp(keyword, 'i')},
            {description: new RegExp(keyword, 'i')},
            ]
        }]

    } else {
       return !lang || lang === 'default' ?
            [{
                $or: [
                    {title: new RegExp(keyword, 'i')},
                    {description: new RegExp(keyword, 'i')}
                ]
            }] :
            [{
                $or: [
                    {title: new RegExp(keyword, 'i')},
                    {description: new RegExp(keyword, 'i')},
                    {[`translations.${lang}.title`]: new RegExp(keyword, 'i')},
                    {[`translations.${lang}.description`]: new RegExp(keyword, 'i')},
                ]
            }]
    }
};

export const requestToMongooseQueryForPosts = (req: Request) => {
    try {
        console.log(`req.query=> `, req.userData.isAdmin);

        const searchQuery = req.query.keyword ? searchQueryGeneratorForPosts(
                  decodeURIComponent(multiQueryUniquer(req.query.keyword)),
                  req.userData.isAdmin,
                  multiQueryUniquer(req.query.lang)

              )
            : {};

        const metaQuery = metaId ? [{$or: [{categories: {$in: metaId}}, {tags: {$in: metaId}}, {actors: {$in: metaId}}]}] : [];

        const postType = req.query?.postType ? multiQueryUniquer(req.query?.postType) : {};
        const author = req.query?.author ? multiQueryUniquer(req.query?.author) : {};
    } catch (error) {}
};


//req.query.