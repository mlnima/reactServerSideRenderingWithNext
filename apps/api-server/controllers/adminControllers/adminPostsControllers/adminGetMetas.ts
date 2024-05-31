import {MetaSchema} from 'shared-schemas';

const adminGetMetas = async (req, res) => {
    try {

        const type = {type: req.query?.metaType}

        const size = !req.query.size ? (global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20) : parseInt(req.query.size)

        const statusQuery = req.query.status === 'all' ? {status: {$ne: 'trash'}} : !req.query.status ? {} : {status: req.query.status};
        const page = (req.query.page === 'undefined' || !req.query.page) ? 1 : parseInt(req.query.page);

        const startWithQuery = req.query?.startWith === 'any' || !req.query?.startWith ? {} : {
            name: {
                $regex: '^' + req.query?.startWith,
                $options: 'i'
            }
        }
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

        // let sortQuery = !req.query.sort ? {} : req.query.sort ? req.query.sort : {[req.query.sort]: -1}
        let sortQuery = req.query.sort ? {[req.query.sort]: -1} : {updatedAt: -1}

        const metaCount = await MetaSchema.countDocuments({$and: [type, searchQuery, startWithQuery, statusQuery, countQuery]}).exec()

        await MetaSchema.find({$and: [type, searchQuery, startWithQuery, statusQuery, countQuery]}, {}, {sort: req.query.sort === 'createdAt' || !req.query.sort ? {} : {[req.query.sort]: -1}})
            .limit(size)
            .skip(size * (page - 1))
            //@ts-ignore
            .sort(sortQuery)
            .exec()
            .then(async metas => {
                res.json({metas, totalCount: metaCount})
            }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
    }

}

export default adminGetMetas;