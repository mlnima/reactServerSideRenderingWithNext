import {MetaSchema} from 'shared-schemas';

const MetaSuggestion = async (req, res) => {

    try {
        const type = {type: req.query?.metaType}
        const statusQuery = {status: 'published'}
        const size = 10;
        const startWithQuery = req.query?.startWith === 'any' ? {} :
            {name: {$regex: '^' + req.query?.startWith, $options: 'i'}}
        await MetaSchema.find(
            {$and: [type, startWithQuery, statusQuery]},
            'name type',
            {sort: {'updatedAt': -1}}
        )
            .limit(size)
            .exec()
            .then(metas => {
                res.json({metas})
            }).catch(err => {
                res.json({metas: []})
            })

    } catch (err) {
        console.log(err)
        res.end()
    }

}

export default MetaSuggestion;