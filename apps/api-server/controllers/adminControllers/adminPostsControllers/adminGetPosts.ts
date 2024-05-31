import {MetaSchema,PostSchema} from 'shared-schemas';
import _adminQueryGeneratorForGettingPosts from '../../../_variables/adminVariables/_adminQueryGeneratorForGettingPosts';

const adminGetPosts= async (req, res) => {
    try {


        const findingPostsOptions = _adminQueryGeneratorForGettingPosts(
            {
                ...req.query,
                //@ts-ignore
                size: !req.query.size? (global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20) : parseInt(req.query.size),
                page: !req.query.page ? 1 : parseInt(req.query.page)
            }
        )

        const populateMeta = [
            {path: 'author',select:['username','profileImage','role']},
            {path: 'actors', select: {'name': 1, 'type': 1}},
            {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
            {path: 'tags', select: {'name': 1, 'type': 1}}
        ]

        const totalCount = await PostSchema.countDocuments(findingPostsOptions.findPostsQueries).exec()

        const posts = await PostSchema.find(
            findingPostsOptions.findPostsQueries,
            findingPostsOptions.selectedFields,
            {
                skip: (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
            }).sort(findingPostsOptions.sortQuery).populate(populateMeta).exec()

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await MetaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}

        res.json({posts, totalCount, meta})

    } catch (err) {
        console.log(err.stack)
        return res.status(404).json({
            message: 'Server Error'
        })
    }
};

export default adminGetPosts;