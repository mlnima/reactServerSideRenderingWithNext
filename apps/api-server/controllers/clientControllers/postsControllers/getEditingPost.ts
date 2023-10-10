import {postSchema} from 'models';
import {mongoIdValidator} from 'custom-server-util';


const buildFindQuery = (req) => {
    const hasId = req.query?._id && mongoIdValidator(req.query?._id);
    const decodeTitle = req.query?.title && decodeURIComponent(req.query?.title);

    return hasId ? {_id: req.query._id} :
        //@ts-ignore
        decodeTitle ? {$or: [{title: decodeTitle}, {permaLink: decodeTitle?.replaceAll(' ', '-')}]} : null;
};

const getEditingPost = async (req, res) => {
    try {
        const findQuery = buildFindQuery(req);

        if (findQuery) {
            const post = await postSchema.findOne(findQuery, '-comments').populate([
                {
                    path: 'author',
                    select: ['username', 'profileImage', 'role'],
                    populate: {path: 'profileImage', model: 'file'}
                },
                {path: 'categories', select: {'name': 1, 'type': 1}},
                {path: 'images', select: {'filePath': 1}, model: 'file'},
                {path: 'tags', select: {'name': 1, 'type': 1}},
                {path: 'actors', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
                {path: 'uniqueData.attenders', select: {'username': 1, 'profileImage': 1, 'role': 1}},
            ]).exec();

            if (post) {
                res.json({
                    post
                });
            } else {
                res.status(404).json({message: 'not found'});
            }
        } else {
            res.status(404).json({message: 'not found'});
        }
    } catch (err) {
        console.error(err, 'get post error');
        res.status(500).json({message: 'Something went wrong please try again later'});
    }
};

export default getEditingPost
