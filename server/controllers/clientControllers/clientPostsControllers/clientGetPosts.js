//clientGetPosts
const postSchema = require('../../../models/postSchema');

module.exports = async (req, res) => {
    const size = req.body.size ? req.body.size > 500 ? 500 : req.body.size : 30;
    const page = req.body?.page ?? 1;
    const postTypeQuery = !req.body.postType ? {} : {postType: req.body.postType};
    const statusQuery = req.body.status === 'all' ? {status: {$ne: 'trash'}} : {status: req.body.status};
    const authorQuery = req.body.author === 'all' ? {} : {author: req.body.author};
    //const requestedFields = (req.body.fields || []).reduce((a, b) => ` ${a} , ` + ` ${b} , `)
    const metaQuery = !req.body.metaId ? {} : {
        $or: [
            {categories: req.body.metaId},
            {tags: req.body.metaId},
            {actors: req.body.metaId}
        ]
    };
    const searchQuery = req.body.keyword === '' || !req.body.keyword ? {} :
        !req.body.lang || req.body.lang === 'default' ? {$or: [{title: new RegExp(req.body.keyword, 'i')}, {description: new RegExp(req.body.keyword, 'i')}]} :
            {
                $or: [
                    {title: new RegExp(req.body.keyword, 'i')},
                    {description: new RegExp(req.body.keyword, 'i')},
                    {[`translations.${req.body.lang}.title`]: new RegExp(req.body.keyword, 'i')},
                    {[`translations.${req.body.lang}.description`]: new RegExp(req.body.keyword, 'i')},]
            }

    let selectedFields = req.body.fields[0] === 'all' || !req.body.fields ? {} : (req.body.fields || []);
    let postsCount = await postSchema.countDocuments({$and: [postTypeQuery, statusQuery, authorQuery, searchQuery, metaQuery]}).exec()
    let sortQuery = req.body.sort === 'latest' || req.body.sort === 'random' ? {lastModify: -1} : {[req.body.sort]: -1}

    const populateMeta = [
        {path:'actors',select:{'name':1,'type':1},options:{limit: 3}},
        {path:'categories',select:{'name':1,'type':1},options:{limit: 3}},
        {path:'tags',select:{'name':1,'type':1},options:{limit: 3}}
    ]

    let posts = req.body.sort === 'random' ?
        await postSchema.find({$and: [postTypeQuery, statusQuery, authorQuery, searchQuery, metaQuery]}).populate(populateMeta).select(selectedFields).skip(Math.floor(Math.random() * postsCount)).limit(size).sort(sortQuery).exec()
        : await postSchema.find({$and: [postTypeQuery, statusQuery, authorQuery, searchQuery, metaQuery]}).populate(populateMeta).select(selectedFields).skip(size * (page - 1)).limit(size).sort(sortQuery).exec();
    Promise.all([posts, postsCount]).then(async data => {
        try {
            res.json({posts: data[0], error: false, totalCount: data[1]})
            res.end()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        })
    })
};