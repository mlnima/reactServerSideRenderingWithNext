import {metaSchema,settingSchema} from 'models';
import {IdentitySettings} from "typescript-types";

interface FindMetasQueryTypes{
    metaType:string,
    page?:number,
    limit?:number,
    startWith?:number|string,
    sort?:string,
}

export const findMetas = async (query:FindMetasQueryTypes)=>{
    try {
        // @ts-ignore
        const identitySetting:{data:IdentitySettings} = query?.page ? await settingSchema.findOne({type: 'identity'}).exec() : {}
        const statusQuery = {status: 'published'};
        const type = {type: query?.metaType}
        const notStartWithNumberRegex = /^(?![0-9].*$).*/g
        const startWithQuery = !query.startWith  ? {name: {$regex: notStartWithNumberRegex}} :  {name: {$regex: '^' + query.startWith}}
        const countQuery =  {count: {$gt: 0}}
        const limit = query?.page ? identitySetting?.data?.postsCountPerPage : query?.limit ? query?.limit: 0
        const page = query?.page || 1
        const skip = query?.page ? limit * (page - 1) : 0

        const sortQuery = !query.sort ? {
            'rank': 1,
            'count': -1
        } : {[query.sort]: -1}

        const findQuery = {$and: [type, startWithQuery, statusQuery, countQuery]}

        const totalCount = await metaSchema.countDocuments(findQuery).exec()
        const metas = await metaSchema.find(
            findQuery,
            {},
            {sort: sortQuery})
            .limit(limit || (query?.startWith ? 0 : 1000))
            .skip(skip)
            .select( query?.metaType ==='tags' ? 'name type' : 'name type imageUrl')
            .exec()

        return{
            metas,
            totalCount
        }

    }catch (error){
        console.log(error)
        return{
            metas:[],
            totalCount:0
        }
    }
}