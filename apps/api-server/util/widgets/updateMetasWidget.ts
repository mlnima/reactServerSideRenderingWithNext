
import {Response} from "express";
import widgetSchema from "@schemas/widgetSchema";
import metaSchema from "@schemas/metaSchema";

const updateMetasWidget = async (widgetData: any, widgetId: string, res: Response) => {

    if (!widgetId) {
        res.status(400).json({message: 'Missing widget ID'});
        return;
    }
    console.log(`widgetData=> `,widgetData?.uniqueData)

    try {
        const statusQuery = {status: 'published'};
        const type = {type: widgetData?.metaType || widgetData?.uniqueData?.metaType};
        const countQuery = {count: {$gt: 0}};
        const limit = widgetData?.uniqueData?.count || global?.initialSettings?.layoutSettings?.numberOfCardsPerPage || 20;
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
                grouping:!!widgetData?.uniqueData?.grouping,
                metaType: widgetData?.uniqueData?.metaType|| widgetData?.metaType || 'tags',
                count: widgetData?.uniqueData?.count || 20,
                totalCount
            }
        };

        delete updateData.metaType

        const updatedWidget = await widgetSchema.findByIdAndUpdate(widgetId, {data: updateData}, {new: true}).exec();

        res.status(200).json({updatedWidget});
    } catch (err) {
        console.error(err);
        res.status(503).json({message: 'Something went wrong. Please try again later.'});
    }
};

export default updateMetasWidget;
