import postSchema from '../../../../../packages/models/src/postSchema';

const adminExportPosts = (req, res) => {

    const postType = req.body.data?.postType ? {postType: req.body.data.postType} : {}
    const metaId = req.body.data.metaId ? {$or: [{categories: req.body.data.metaId}, {tags: req.body.data.metaId}, {actors: req.body.data.metaId}]} : {}
    const author = req.body.data.author ? {author: req.body.data.author} : {}
    const limit = req.body.data.limit ? {limit: parseInt(req.body.data.limit)} : {}

    const options = {
        ...limit
    }


    postSchema.find({$and: [postType, metaId, author]}, {}, options).populate([
        {path: 'categories'},
        {path: 'tags'},
        {path: 'actors'},
    ]).exec()
        .then(finalData => {

            res.json({exportedData: finalData})

            // const json = JSON.stringify(finalData);
            // const filename = 'posts.json';
            // const mimetype = 'application/json';
            // res.setHeader('Content-Type', mimetype);
            // res.setHeader('Content-disposition','attachment; filename='+filename);
            // res.json( json );
        }).catch(err => {

        res.status(500)
    })
};

export default adminExportPosts;

