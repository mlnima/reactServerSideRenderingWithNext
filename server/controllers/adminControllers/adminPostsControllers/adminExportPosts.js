//adminExportPosts
const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    postSchema.find({}).populate([
        {path: 'categories'},
        {path: 'tags'},
        {path: 'actors'},
    ]).exec()
        .then(finalData => {
        res.json({exportedData: finalData})
    }).catch(err => {
            console.log(err)
            res.status(500)

        })
};

