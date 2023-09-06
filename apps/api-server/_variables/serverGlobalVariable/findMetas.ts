import {metaSchema,settingSchema} from 'models';
import {IdentitySettings, InitialSettings} from "typescript-types";

interface FindMetasQueryTypes{
    metaType:string,
    page?:number,
    limit?:number,
    startWith?:number|string,
    sort?:string,
}

export const findMetas = async (query:FindMetasQueryTypes)=>{
    try {



        const statusQuery = {status: 'published'};
        const type = {type: query?.metaType}
        const notStartWithNumberRegex = /^(?![0-9].*$).*/g
        const startWithQuery = !query.startWith  ? {name: {$regex: notStartWithNumberRegex}} :  {name: {$regex: '^' + query.startWith}}
        const countQuery =  {count: {$gt: 0}}
        const limit = global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20
        const page = query?.page || 1
        const skip = page ? limit * (page - 1) : 0

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