import settingSchema from '../../../models/settings/settingSchema';
import metaSchema from '../../../models/metaSchema';

const clientGetMetas = async (req, res) => {
    try {

        const identitySetting = await settingSchema.findOne({type: 'identity'}).exec()
        const metaType = req.query.metaType

        const size = metaType ==='tags'? 1000: metaType ==='tags'&&req.query?.startWith? -1 : req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size)
        const statusQuery = req.query.status === 'all' ? {status: {$ne: 'trash'}} : !req.query.status ? {status: 'published'} : {status: req.query.status};

        const page = req.query.page === 'undefined' ? 1 : parseInt(req.query.page);
        const type = {type: metaType}

        const startWithQuery = req.query?.startWith === 'any' ? {} :
            req.query?.startWith === 'digits' ? {
                name: {
                    $regex: /^\d/ ,
                }
            } :{
            name: {
                $regex: '^' + req.query?.startWith,
            }
        }
        console.log(startWithQuery)
        const countQuery = {count: {$gt: 0}}
        //const sortQuery =  req.query.sort === 'createdAt' || !req.query.sort ? {} : {[req.query.sort]: -1}
        const searchQuery = req.query.keyword === '' || !req.query.keyword ? {} :
            !req.query.lang || req.query.lang === 'default' ? {$or: [{name: new RegExp(req.query.keyword, 'i')}, {description: new RegExp(req.query.keyword, 'i')}]} :
                {
                    $or: [
                        {name: new RegExp(req.query.keyword, 'i')},
                        {description: new RegExp(req.query.keyword, 'i')},
                        {[`translations.${req.query.lang}.name`]: new RegExp(req.query.keyword, 'i')},
                        {[`translations.${req.query.lang}.description`]: new RegExp(req.query.keyword, 'i')},]
                }

        // let sortQuery = !req.query.sort ? {count: -1} : req.query.sort && typeof req.query.sort === 'string' ? req.query.sort : {[req.query.sort]: -1}
        const metaCount = await metaSchema.countDocuments({$and: [type, searchQuery, startWithQuery, statusQuery, countQuery]}).exec()
        // const sortQuery = req.query.sort === 'createdAt' || !req.query.sort ? {'updatedAt':-1} : {[req.query.sort]: -1}
        const sortQuery = !req.query.sort ? {
            'rank': 1,
            'likes': -1,
            'views': -1,
            'count': -1,
            'updatedAt': -1,
            'createdAt': -1
        } : {[req.query.sort]: -1}

// console.log('sortQuery:',sortQuery)
// console.log(req.query.sort)
        metaSchema.find({$and: [type, searchQuery, startWithQuery, statusQuery, countQuery]}, {}, {sort: sortQuery})
            .limit(size)
            .skip(size * (page - 1))
            // .sort(sortQuery)
            .exec()
            .then(async metas => {
                res.json({metas, totalCount: metaCount})
            }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
        res.end()
    }

}

export default clientGetMetas