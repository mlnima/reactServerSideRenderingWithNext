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

// .then(async exportData => {
//     try {
//         let finalData = []
//         for await (let post of exportData) {
//             finalData = [...finalData, {
//                 ...post.toObject(),
//                 categories: post.categories ? await metaSchema.find({'_id': {$in: [...post.categories]}}).select('name type') : [],
//                 tags: post.tags ? await metaSchema.find({'_id': {$in: [...post.tags]}}).select('name type') : [],
//                 actors: post.actors ? await metaSchema.find({'_id': {$in: [...post.actors]}}).select('name type') : []
//             }]
//         }
//         return finalData
//     } catch (e) {
//         console.log(e)
//     }
//
// })