import {PostSchema,MetaSchema,SearchKeywordSchema} from 'shared-schemas';
import _clientQueryGeneratorForGettingPosts from '../../../_variables/clientVariables/_clientQueryGeneratorForGettingPosts'
import {mongoIdValidator} from 'custom-server-util';
import {postFieldRequestForCards} from "data-structure";
//import {postFieldRequestForCards} from "structures";

const saveSearchedKeyword = async (keyword :string, count:number) => {
    if (keyword) {
        await SearchKeywordSchema.findOneAndUpdate(
            {name: keyword},
            {name: keyword, count},
            {upsert: true}).exec()
    }
}

const getMetaForGettingPostsRequest = async (meta:string)=>{
    try {
        if (mongoIdValidator(meta)){
            return await MetaSchema.findById(meta).exec()
        }else {
            return await MetaSchema.findOne({name:{$regex:decodeURIComponent(meta),$options:'i'}})
        }
    }catch (err){
        return {}
    }
}

export const getPosts =  async (req, res) => {
    try {

        const locale = req.query.locale

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}

        const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
            ...req.query,
            //@ts-ignore
            size: req.query.size === 'undefined' ? (global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20): parseInt(req.query.size),
            page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
            //@ts-ignore
        },meta?._id)

        const totalCount = await PostSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();

        const posts = await PostSchema.find(
            findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
            {
                skip: (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            }).select([...postFieldRequestForCards, `translations.${locale}.title`])
            // .populate(populateMeta)
            .exec()
        if (req.query?.keyword && totalCount > 0) {
            await saveSearchedKeyword(req.query?.keyword, totalCount)
        }

        res.json({posts, totalCount, meta})
    } catch (err) {
        console.log(err.stack)
        return res.status(503).json({
            message: 'Server Error'
        })
    }
};

export default getPosts

export const getUserPagePosts = async (req, res) => {
    try {
        const authorId = req.query.authorId;
        const skip = req.query.skip || 0

        const posts = await PostSchema.find(
            {$and:[{author:authorId},{status:req.query.status || 'published'}]},
            [...postFieldRequestForCards,'status'],
            {
                skip: skip,
                limit: (global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20),
            }
            ).exec()

        res.json({posts})

    }catch (error){
        console.log(error.stack)
        res.status(503).json({
            message: 'Server Error'
        })
    }
}
