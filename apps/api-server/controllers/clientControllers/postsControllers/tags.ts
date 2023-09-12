import {metaSchema} from "models";

const tags = async (req, res) => {
    try {
        const statusQuery = {status: 'published'};
        const startWithQuery = {name: {$regex: '^' + req.query.startWith}}
        const countQuery =  {count: {$gt: 0}}
        const type = {type: 'tags'}

        const sortQuery = ! req.query.sort ? {
            'rank': 1,
            'count': -1
        } : {[ req.query.sort]: -1}

        const findQuery = {$and: [type, startWithQuery, statusQuery, countQuery]}

        const metas = await metaSchema.find(
            findQuery,
            {},
            {sort: sortQuery})
            .select( 'name type')
            .exec()

        res.json({metas})
    } catch (err) {
        console.log(err)
        res.end()
    }
}

export default tags