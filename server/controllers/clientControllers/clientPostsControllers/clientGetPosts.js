//clientGetPosts
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const searchKeywordSchema = require('../../../models/searchKeywordSchema');
const _clientQueryGeneratorForGettingPosts = require('../_variables/_clientQueryGeneratorForGettingPosts')
const mongoIdValidator = require('../../../util/mongoIdValidator')
const settingSchema = require("../../../models/settings/settingSchema");

const saveSearchedKeyword = async (keyword, count) => {
    if (keyword) {
        await searchKeywordSchema.findOneAndUpdate(
            {name: keyword},
            {name: keyword, count},
            {upsert: true}).exec()
    }
}

const getMetaForGettingPostsRequest = async (meta)=>{
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

module.exports = async (req, res) => {
    try {
        const identitySetting = await settingSchema.findOne({type:'identity'}).exec()

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}

        const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
            ...req.query,
            size: req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size),
            page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
        },meta?._id)

        // console.log(JSON.stringify(findingPostsOptions, null, '\t'))
        const populateMeta = [
            {path: 'actors', select: {'name': 1, 'type': 1}},
            {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
            {path: 'tags', select: {'name': 1, 'type': 1}}
        ]

        const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();
        const posts = await postSchema.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
            {
                skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            })
            .populate(populateMeta)
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



// const meta = req.query?.metaId || req.query?.selectedMetaForPosts ? await metaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}


//const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
// const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}

//skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),