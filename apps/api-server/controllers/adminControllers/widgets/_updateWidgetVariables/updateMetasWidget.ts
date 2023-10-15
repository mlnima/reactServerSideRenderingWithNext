import {metaSchema, widgetSchema} from "models";
import {Response} from "express";

const updateMetasWidget = async (widgetData: any, widgetId: string, res: Response) => {

    if (!widgetId) {
        res.status(400).json({message: 'Missing widget ID'});
        return;
    }

    try {
        const statusQuery = {status: 'published'};
        const type = {type: widgetData?.metaType || widgetData?.uniqueData?.metaType};
        const countQuery = {count: {$gt: 0}};
        const limit = widgetData?.uniqueData?.count || global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20;
        const sortQuery = widgetData?.sort || widgetData?.uniqueData?.sort ? {'updatedAt': -1} : {
            'rank': 1,
            'count': -1
        };
        const findQuery = {$and: [type, statusQuery, countQuery]};

        const totalCount = await metaSchema.countDocuments(findQuery).exec();
        const metas = await metaSchema.find(findQuery, {}, {sort: sortQuery})
            .limit(limit)
            .select('_id')
            .exec();

        const updateData = {
            ...widgetData,
            uniqueData: {
                metaData: metas?.map((meta) => meta._id),
                totalCount
            }
        };

        const updatedWidget = await widgetSchema.findByIdAndUpdate(widgetId, {data: updateData}, {new: true}).exec();

        res.status(200).json({updatedWidget});
    } catch (err) {
        console.error(err);
        res.status(503).json({message: 'Something went wrong. Please try again later.'});
    }
};

export default updateMetasWidget;


// import {metaSchema, widgetSchema} from "models";
// import {Meta} from "typescript-types";
// import {Response} from "express";
//
// const updateMetasWidget = async (widgetData: any,res:Response)=>{
//
//     try {
//         if (!widgetData?._id) return
//
//         const statusQuery = {status: 'published'};
//         const type = {type: widgetData?.metaType || widgetData?.uniqueData?.metaType}
//         const countQuery =  {count: {$gt: 0}}
//         const limit = widgetData?.count ||
//             widgetData?.uniqueData?.count  ||
//             global?.initialSettings?.postCardsSettings?.numberOfCardsPerPage
//             || 20
//
//         const widgetDataSort = widgetData?.sort || widgetData?.uniqueData?.sort
//         const sortQuery = !widgetDataSort ? {'rank': 1, 'count': -1} : {'updatedAt': -1}
//         const findQuery = {$and: [type, statusQuery, countQuery]}
//         const totalCount = await metaSchema.countDocuments(findQuery).exec()
//
//         const metas = await metaSchema.find(
//             findQuery,
//             {},
//             {sort: sortQuery})
//             .limit(limit)
//             .select( '_id')
//             .exec()
//
//         const updateData = {
//             ...widgetData,
//             uniqueData: {
//                 //@ts-ignore
//                 metaData: metas?.map((meta: Meta) => meta._id),
//                 totalCount
//             }
//         }
//
//       await widgetSchema.findByIdAndUpdate(widgetData._id, {data: updateData}, {new: true}).exec().then(updatedWidget => {
//           res.json({updatedWidget})
//       }).catch(err => {
//           console.log(err)
//           res.status(503).json({message: 'something went wrong please try again later'})
//       })
//
//     } catch (err) {
//         console.log(err)
//         return null
//     }
// }
//
// export default updateMetasWidget;