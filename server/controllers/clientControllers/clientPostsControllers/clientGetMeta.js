const metaSchema = require('../../../models/metaSchema');


module.exports = async (req, res) => {
    const type = {type: req.body.metaType}
    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size)
    const statusQuery = req.body.status === 'all' ? {status: {$ne: 'trash'}} : !req.body.status ? 'published' : {status: req.body.status};
    const page = parseInt(req.body.page);
    const startWithQuery = req.body?.startWith === 'any' ? {} : {name: {$regex: '^' + req.body?.startWith, $options: 'i'}}
    const searchQuery = req.body.keyword === '' || !req.body.keyword ? {} :
        !req.body.lang || req.body.lang === 'default' ? {$or: [{name: new RegExp(req.body.keyword, 'i')}, {description: new RegExp(req.body.keyword, 'i')}]} :
            {
                $or: [
                    {name: new RegExp(req.body.keyword, 'i')},
                    {description: new RegExp(req.body.keyword, 'i')},
                    {[`translations.${req.body.lang}.name`]: new RegExp(req.body.keyword, 'i')},
                    {[`translations.${req.body.lang}.description`]: new RegExp(req.body.keyword, 'i')},]
            }

    let sortQuery = !req.body.sort ? {count: -1} : req.body.sort && typeof req.body.sort === 'string' ? req.body.sort : {[req.body.sort]: -1}
    //const metaCount = await metaSchema.countDocuments({$and: [type, searchQuery, startWithQuery, statusQuery]}).exec()

    metaSchema.find({$and: [type, searchQuery, startWithQuery, statusQuery]}).limit(size).skip(size * (page - 1)).sort(sortQuery).exec().then(async metas => {

        //
        // const mapMetaToGetImage = metas.map(async meta => {
        //     try {
        //         const countPostsHasCurrentMeta = meta.count && meta.count !== 1 ? meta.count : await postSchema.countDocuments({$and: [{[type.type]: meta._id}, {status: 'published'}]}).exec();
        //         const skipForNoImageUrl = Math.floor(Math.random() * countPostsHasCurrentMeta)
        //         const noImageUrl = meta.imageUrl ? '' : await postSchema.find({$and: [{[type.type]: meta._id}, {status: 'published'}]}).skip(skipForNoImageUrl).limit(1).sort('-lasModify').exec().then(lastPost => {
        //             if (lastPost[0]) {
        //                 return lastPost[0].mainThumbnail
        //             } else {
        //                 return undefined
        //             }
        //         }).catch(err => {

        //             res.end()
        //         })
        //
        //         return {
        //             ...meta.toObject(),
        //             count: countPostsHasCurrentMeta,
        //             noImageUrl
        //         }
        //     } catch (e) {
        //     }
        // })
        //
        // res.json({metas: await Promise.all(mapMetaToGetImage), totalCount: metaCount})
        // res.end()


        res.json({metas})
        res.end()


    }).catch(err => {
        console.log(err)
        res.end()
    })

}