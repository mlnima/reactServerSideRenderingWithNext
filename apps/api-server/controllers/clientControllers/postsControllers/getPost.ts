import {postSchema} from 'models';
import {mongoIdValidator} from 'custom-server-util';
import {arraySortRandom} from 'custom-util';
import {Meta} from 'typescript-types'

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

//GPT4 CODE
const buildFindQuery = (req) => {
    const hasId = req.query?._id && mongoIdValidator(req.query?._id);
    const decodeTitle = req.query?.title && decodeURIComponent(req.query?.title);

    return hasId ? { _id: req.query._id } :
        //@ts-ignore
        decodeTitle ? { $or: [{ title: decodeTitle }, { permaLink: decodeTitle?.replaceAll(' ', '-') }] } : null;
};

const buildRelatedPosts = async (post) => {
    const relatedActors = await getRelatedPosts(
        'actors',
        arraySortRandom((post?.actors || []))?.slice(0, 5)?.map((meta:Meta) => meta._id),
        post._id,
        post.postType
    );

    const relatedCategories = await getRelatedPosts(
        'categories',
        arraySortRandom((post?.categories || []))?.slice(0, 5)?.map((meta:Meta) => meta._id),
        post._id,
        post.postType
    );

    const relatedTags = await getRelatedPosts(
        'tags',
        arraySortRandom((post?.tags || [])).reverse()?.slice(0, 5)?.map((meta:Meta) => meta._id),
        post._id,
        post.postType
    );

    return {
        ...relatedActors,
        ...relatedCategories,
        ...relatedTags,
    };
};

const getPost = async (req, res) => {
    try {
        const findQuery = buildFindQuery(req);

        if (findQuery) {
            const post = await postSchema.findOne(findQuery, '-comments').populate([
                {
                    path: 'author',
                    select: ['username', 'profileImage', 'role'],
                    populate: {path: 'profileImage', model: 'file'}
                },
                { path: 'categories', select: { 'name': 1, 'type': 1 } },
                { path: 'images', select: { 'filePath': 1 }, model: 'file' },
                { path: 'tags', select: { 'name': 1, 'type': 1 } },
                { path: 'actors', select: { 'name': 1, 'type': 1, 'imageUrl': 1 } },
                { path: 'uniqueData.attenders', select: { 'username': 1, 'profileImage': 1, 'role': 1 } },
            ]).exec();

            if (post) {
                const relatedPosts = await buildRelatedPosts(post);
                res.json({
                    post,
                    relatedPosts,
                    error: false
                });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        console.error(err, 'get post error');
        res.status(500).json({ message: 'Something went wrong please try again later' });
    }
};

export default getPost


