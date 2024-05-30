import {postSchema, searchKeywordSchema} from 'models';
import {metaSchema} from 'models';
import {postFieldRequestForCards} from "data-structure";

const locals = process.env.NEXT_PUBLIC_LOCALES.split(' ');

interface ISaveSearchedKeyword {
    keyword: string,
    postsCount?: number,
    metasCount?: number
}

const saveSearchedKeyword = async ({keyword, postsCount}: ISaveSearchedKeyword) => {
    if (!keyword) return
    try {
        await searchKeywordSchema.findOneAndUpdate(
            {name: keyword},
            {
                $set: {
                    name: keyword,
                    count: postsCount,
                },
                $inc: {searchHits: 1},
            },
            {upsert: true}).exec()
    } catch (error) {
        console.log('error=> ', error)
    }
}


const getSearch = async (req, res) => {
    if (!req.query.keyword) {
        res.status(400).json({message: 'Bad Request'})
        return
    }
    try {

        const locale = req.query.locale

        const decodedKeyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : '';
        const keyword = decodedKeyword.toLowerCase();

        const size = req.query.size ? req.query.size > 100 ? 100 : 20 : 20;
        const page = req.query.page ? req.query.page : 20;

        let postsTranslationsSearchQuery = [];
        let metasTranslationsSearchQuery = [];

        for await (const locale of locals) {
            metasTranslationsSearchQuery.push({[`translations.${locale}.name`]: new RegExp(keyword, 'i')})
        }
        for await (const locale of locals) {
            postsTranslationsSearchQuery.push({[`translations.${locale}.title`]: new RegExp(keyword, 'i')})
            postsTranslationsSearchQuery.push({[`translations.${locale}.description`]: new RegExp(keyword, 'i')})
        }

        const postSearchQuery = {
            $and: [
                {
                    $or: [
                        {title: new RegExp(keyword, 'i')},
                        {description: new RegExp(keyword, 'i')},
                        ...postsTranslationsSearchQuery
                    ]
                },
                {status: 'published'}
            ]
        }


        const metasSearchQuery = {
            $and: [
                {$or: [{name: new RegExp(keyword, 'i')}, ...metasTranslationsSearchQuery]},
                {status: 'published'}
            ]
        }


        const posts = await postSchema.find(
            postSearchQuery,
            postFieldRequestForCards,
            {
                limit: size,
                skip: (size * page) - size,
            }
        )
        .select([...postFieldRequestForCards, `translations.${locale}.title`])
        .exec();
        const totalCount = await postSchema.countDocuments(postSearchQuery).exec();
        const metas = await metaSchema.find(metasSearchQuery).limit(size).exec();

        if (totalCount > 0) {
            await saveSearchedKeyword({
                keyword,
                postsCount: totalCount,
            })
        }

        res.json({
            posts,
            totalCount,
            metas
        })

    } catch (err) {

        res.status(500).json({message: 'Server Error'})
    }
}
export default getSearch;


