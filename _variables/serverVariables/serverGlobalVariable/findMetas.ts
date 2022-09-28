import metaSchema from "../../../expressServer/models/metaSchema";

export const findMetas = async (query)=>{
    try {
        const statusQuery = {status: 'published'};
        const type = {type: query.metaType}
        const notStartWithNumberRegex = /^(?![0-9].*$).*/g
        const startWithQuery = !query.startWith  ? {name: {$regex: notStartWithNumberRegex}} :  {name: {$regex: '^' + query.startWith}}
        const countQuery =  {count: {$gt: 0}}
        const sortQuery = !query.sort ? {
            'rank': 1,
            'count': -1
        } : {[query.sort]: -1}

        return await metaSchema.find(
            {$and: [type, startWithQuery, statusQuery, countQuery]},
            {},
            {sort: sortQuery})
            .limit(query?.limit ?  query?.limit : query?.startWith ? 0 : 1000)
            .select('name type')
            .exec()
    }catch (error){
        console.log(error)
        return []
    }
}