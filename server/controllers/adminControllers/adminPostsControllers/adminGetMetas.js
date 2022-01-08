//adminGetMetas

const metaSchema = require('../../../models/metaSchema');

module.exports = async (req, res) => {
    try {
        const type = {type: req.query.metaType}
        const size = parseInt(req.query.size) || parseInt(process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE)
        const statusQuery = req.query.status === 'all' ? {status: {$ne: 'trash'}} : !req.query.status ? {}  : {status: req.query.status};
        const page = parseInt(req.query.page);
        const startWithQuery = req.query?.startWith === 'any' ? {} : {name: {$regex: '^' + req.query?.startWith, $options: 'i'}}
        const countQuery = {}
        const searchQuery = req.query.keyword === '' || !req.query.keyword ? {} :
            !req.query.lang || req.query.lang === 'default' ? {$or: [{name: new RegExp(req.query.keyword, 'i')}, {description: new RegExp(req.query.keyword, 'i')}]} :
                {
                    $or: [
                        {name: new RegExp(req.query.keyword, 'i')},
                        {description: new RegExp(req.query.keyword, 'i')},
                        {[`translations.${req.query.lang}.name`]: new RegExp(req.query.keyword, 'i')},
                        {[`translations.${req.query.lang}.description`]: new RegExp(req.query.keyword, 'i')},]
                }

        let sortQuery = !req.query.sort ? {count: -1} : req.query.sort && typeof req.query.sort === 'string' ? req.query.sort : {[req.query.sort]: -1}
        const metaCount = await metaSchema.countDocuments({$and: [type, searchQuery, startWithQuery, statusQuery,countQuery]}).exec()

        metaSchema.find({$and: [type, searchQuery, startWithQuery, statusQuery,countQuery]},{},{sort:req.query.sort === 'createdAt' || !req.query.sort ? {} : {[req.query.sort]: -1}})
            .limit(size)
            .skip(size * (page - 1))
            .sort(sortQuery)
            .exec()
            .then(async metas => {
            res.json({metas,totalCount:metaCount})
        }).catch(err => {
            console.log(err)
            res.end()
        })
    }catch (err){
        console.log(err)
    }

}