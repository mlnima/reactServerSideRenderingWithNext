//adminGetPosts
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const _adminQueryGeneratorForGettingPosts = require('../_variables/_adminQueryGeneratorForGettingPosts')

module.exports = async (req, res) => {
    try {
        const findingPostsOptions = _adminQueryGeneratorForGettingPosts(req.query)

        const populateMeta = [
            {path: 'actors', select: {'name': 1, 'type': 1}},
            {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
            {path: 'tags', select: {'name': 1, 'type': 1}}
        ]

        const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec()

        const posts = await postSchema.find(
            findingPostsOptions.findPostsQueries,
            findingPostsOptions.selectedFields,
            {
                skip: (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
            }).sort(findingPostsOptions.sortQuery).populate(populateMeta).exec()

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await metaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}

        res.json({posts, totalCount, meta})

    } catch (err) {
        console.log(err.stack)
        return res.status(404).json({
            message: 'Server Error'
        })
    }
};