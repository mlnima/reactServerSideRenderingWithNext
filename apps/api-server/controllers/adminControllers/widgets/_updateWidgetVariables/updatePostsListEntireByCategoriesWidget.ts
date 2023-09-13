import {Response} from "express";
import {metaSchema, postSchema, widgetSchema} from "models";

const updatePostsListEntireByCategoriesWidget = async (widgetData: any, widgetId: string, res: Response) => {
    try {


        const categories = await metaSchema.find({
            $and: [
                {type: 'categories'},
                {status: 'published'}
            ]
        })
            .sort({'count': -1})
            .limit(widgetData?.uniqueData?.categoryCount || {})
            .select('name description status')
            .lean()
            .exec();

        const categoriesCount = await metaSchema.countDocuments({
            $and: [
                {type: 'categories'},
                {status: 'published'}
            ]
        }).exec()

        const fetchPostsForCategory = async (category: any) => {
            const postsOfCurrentCategory = await postSchema.find({
                categories: category._id
            })
                .select('title icon redirectLink')
                .limit(widgetData?.uniqueData?.count || {})
                .lean()
                .exec();

            const postsCount = await postSchema.countDocuments({
                categories: category._id
            }).exec();

            return {
                ...category,
                postsCount,
                posts: postsOfCurrentCategory
            };
        };

        const final = await Promise.all(categories.map(fetchPostsForCategory));

        console.log('final=> ',final)
        const widgetDateUpdate = {
            ...widgetData,
            uniqueData: {
                ...widgetData.uniqueData,
                categoriesData: final,
                categoriesCount
            }
        };

        await widgetSchema.findByIdAndUpdate(widgetId, {data: widgetDateUpdate}, {new: true}).exec();

        res.status(200).send({message: "Updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(503).json({message: 'Something went wrong. Please try again later.'});
    }
};

export default updatePostsListEntireByCategoriesWidget;


// import {Response} from "express";
// import {metaSchema, postSchema, widgetSchema} from "models";
//
// const updatePostsListEntireByCategoriesWidget = async (widgetData: any, widgetId: string, res: Response) => {
//     try {
//         let final = []
//         const categories = await metaSchema.find({$and: [{type: 'categories'}, {status: 'published'}]})
//             .select('name description status')
//             .exec()
//
//         for await (const category of categories) {
//             const postsOfCurrentCategory = await postSchema.find({$inc: {categories: category._id}})
//                 .select('_id title icon redirectLink')
//                 .exec()
//
//             final = [
//                 ...final,
//                 {
//                     ...category.toObject(),
//                     posts: postsOfCurrentCategory
//                 }]
//         }
//
//         console.log(final[0])
//
//
//         const widgetDateUpdate = {
//             ...widgetData,
//             uniqueData: {
//                 ...widgetData.uniqueData,
//                 categoriesDataWithPosts: final
//             }
//         }
//
//         await widgetSchema.findByIdAndUpdate(widgetId, {data: widgetDateUpdate}, {new: true}).exec()
//
//
//         res.status(200)
//
//     } catch (error) {
//         console.error(error);
//         res.status(503).json({message: 'Something went wrong. Please try again later.'});
//     }
// }
//
// export default updatePostsListEntireByCategoriesWidget;


// res.status(200).json({ updatedWidget });