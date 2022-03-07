//clientGetPosts
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const _queryGeneratorForGettingPosts = require('../_variables/_queryGeneratorForGettingPosts')

module.exports = async (req, res) => {
    try {

        const findingPostsOptions = _queryGeneratorForGettingPosts(req.query)
        const populateMeta = [
            {path: 'actors', select: {'name': 1, 'type': 1}},
            {path: 'categories', select: {'name': 1, 'type': 1,'imageUrl':1}},
            {path: 'tags', select: {'name': 1, 'type': 1}}
        ]
        const findPostsQueries =  {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery,findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
        const totalCount = await postSchema.countDocuments(findPostsQueries).exec()
        const posts = await postSchema.find( findPostsQueries,findingPostsOptions.selectedFields,
            {
                skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            }).populate(populateMeta).exec()
        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ? await metaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}
        res.json({posts,totalCount,meta})
    }catch (err){
        console.log(err.stack)
        return res.status(404).json({
            message: 'Server Error'
        })
    }
};