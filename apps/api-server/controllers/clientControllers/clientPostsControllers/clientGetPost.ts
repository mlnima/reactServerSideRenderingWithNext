import {postSchema} from 'models';
import {mongoIdValidator} from 'custom-server-util';
import {arraySortRandom} from 'custom-util';

const defaultFieldForPosts = [
    'title',
    'mainThumbnail',
    'quality',
    'likes',
    'disLikes',
    'views',
    'duration',
    'postType',
    'price',
    'translations',
    'videoTrailerUrl',
    'rating',
    'redirectLink',
    'updateAt',
    'createdAt',
]

const populateMeta = [
    {path: 'actors', select: {'name': 1, 'type': 1}},
    {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
    {path: 'tags', select: {'name': 1, 'type': 1}}
]


const getRelatedPosts = async (relatedByType, relatedIds, currentPostId, postType) => {

    const sortOrder = arraySortRandom(['likes', 'views', 'updateAt', 'createdAt']).reduce((final, current) => {
        final[current] = 1
        return final
    }, {})

    const findRelatedPostsQuery = {
        $and: [
            {[relatedByType]: {$in: relatedIds}},
            {status: 'published'},
            {_id: {$ne: currentPostId}},
            {postType: postType}
        ]
    }
    try {
        const relatedPosts = await postSchema.find(
            findRelatedPostsQuery,
            defaultFieldForPosts,
            {sort: sortOrder}
        ).populate(populateMeta).limit(4).sort('-updatedAt').exec()
        return {[`${relatedByType}RelatedPosts`]: relatedPosts}
    } catch (e) {
        return {[`${relatedByType}RelatedPosts`]: []}
    }
}


const clientGetPost = async (req, res) => {

    try {
        const hasId = req.query?._id && mongoIdValidator(req.query?._id)
        const decodeTitle = req.query?.title && decodeURIComponent(req.query?.title)

        // const findQuery = hasId ? {_id:req.query._id} :
        //                   decodeTitle ? {title:decodeTitle} : null
        const findQuery = hasId ? {_id: req.query._id} :
            decodeTitle ? {$or: [{title: decodeTitle}, {permaLink: decodeTitle.replaceAll(' ', '-')}]} : null
        //{$or:[{title:decodeTitle},{permaLink:decodeTitle.replaceAll(' ','-')}]}
        // const validateId = mongoIdValidator(req.query._id);
        if (findQuery) {
            const post = await postSchema.findOne(findQuery, '-comments').populate([
                {path: 'author', select: ['username', 'profileImage', 'role']},
                {path: 'categories', select: {'name': 1, 'type': 1}},
                {path: 'tags', select: {'name': 1, 'type': 1}},
                {path: 'actors', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
            ]).exec()
            if (post) {
                res.json({
                    post,
                    relatedPosts: {
                        ...await getRelatedPosts(
                            'actors',
                            //(post?.actors || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.actors || []))?.slice(0, 5)?.map(meta => meta._id),
                            post._id,
                            post.postType
                        ),
                        ...await getRelatedPosts(
                            'categories',
                            // (post?.categories || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.categories || []))?.slice(0, 5)?.map(meta => meta._id),
                            post._id,
                            post.postType
                        ),
                        ...await getRelatedPosts(
                            'tags',
                            // (post?.tags || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.tags || [])).reverse()?.slice(0, 5)?.map(meta => meta._id),
                            post._id,
                            post.postType
                        )
                    },
                    error: false
                });
            } else {
                // console.error('we didnt found')
                res.status(404).json({message: 'not found'})
            }

        } else {
            res.status(404).json({message: 'not found'})
        }

    } catch (err) {
        //  console.error(err,'get post error')
        res.status(500).json({message: 'Something went wrong please try again later'})
    }
};

export default clientGetPost


//(post?.actors || []).filter((meta, index, arr) => index > (post?.actors || []).length - 6)
// ...await getRelatedPosts('actors',(post?.actors || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('categories',(post?.categories || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('tags',(post?.tags || [])?.slice(0,5)?.map(meta=>meta._id)),