import {postSchema} from 'models';
import {settingSchema} from 'models';
import {metaSchema} from 'models';
import {searchKeywordSchema} from 'models'
import _clientQueryGeneratorForGettingPosts from '../../../_variables/clientVariables/_clientQueryGeneratorForGettingPosts'
import {mongoIdValidator} from 'custom-server-util';
//import postFieldRequestForCards from "../../../../data-structures/postFieldRequestForCards";

const saveSearchedKeyword = async (keyword :string, count:number) => {
    if (keyword) {
        await searchKeywordSchema.findOneAndUpdate(
            {name: keyword},
            {name: keyword, count},
            {upsert: true}).exec()
    }
}

const getMetaForGettingPostsRequest = async (meta:string)=>{
    try {
        if (mongoIdValidator(meta)){
            return await metaSchema.findById(meta).exec()
        }else {
            return await metaSchema.findOne({name:{$regex:decodeURIComponent(meta),$options:'i'}})
        }
    }catch (err){
        return {}
    }
}

const getPosts =  async (req, res) => {
    try {

        const identitySetting = await settingSchema.findOne({type:'identity'}).exec()

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}

        const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
            ...req.query,
            //@ts-ignore
            size: req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size),
            page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
            //@ts-ignore
        },meta?._id)

        const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();
        const posts = await postSchema.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
            {
                skip: req.body.sort === 'random' ?
                    Math.floor(Math.random() * totalCount) :
                    (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            })
            // .populate(populateMeta)
            .exec()

        if (req.query?.keyword) {
            await saveSearchedKeyword(req.query?.keyword, totalCount)
        }

        res.json({posts, totalCount, meta})
    } catch (err) {
        console.log(err.stack)
        return res.status(404).json({
            message: 'Server Error'
        })
    }
};

export default getPosts
