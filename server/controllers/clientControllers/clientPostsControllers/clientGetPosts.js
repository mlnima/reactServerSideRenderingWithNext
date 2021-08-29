//clientGetPosts
const postSchema = require('../../../models/postSchema');
const _queryGeneratorForGettingPosts = require('../_variables/_queryGeneratorForGettingPosts')

module.exports = async (req, res) => {

    try {
        // console.log(req.query)
        const findingPostsOptions = _queryGeneratorForGettingPosts(req.query)
        const populateMeta = [
            {path: 'actors', select: {'name': 1, 'type': 1}},
            {path: 'categories', select: {'name': 1, 'type': 1}},
            {path: 'tags', select: {'name': 1, 'type': 1}}
        ]
        const findPostsQueries =  {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
        let totalCount = await postSchema.countDocuments(findPostsQueries).exec()
        let posts = await postSchema.find( findPostsQueries,findingPostsOptions.selectedFields,
            {
                skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            }).populate(populateMeta).exec()
        res.json({posts,totalCount})
        res.end()
    }catch (err){
        console.log(err)
        return res.status(500).json({
            message: 'Server Error'
        })
    }

};