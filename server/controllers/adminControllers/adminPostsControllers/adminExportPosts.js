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
        res.end()
    }).catch(err => {
            console.log(err)
            res.sendStatus(500)
            res.end()
        })
};

