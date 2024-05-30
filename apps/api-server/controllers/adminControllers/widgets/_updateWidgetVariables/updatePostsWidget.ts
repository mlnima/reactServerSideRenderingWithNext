import _clientQueryGeneratorForGettingPosts
    from "../../../../_variables/clientVariables/_clientQueryGeneratorForGettingPosts";
import {PostSchema, WidgetSchema} from "shared-schemas";
import {Response} from "express";

const updatePostsWidget = async (widgetData: any,widgetId:string, res: Response)=>{

        try {

            if (!widgetId) {
                res.status(400).json({ message: 'Missing widget ID' });
                return;
            }

            const findingPostsOptions = _clientQueryGeneratorForGettingPosts(widgetData, widgetData?.uniqueData?.selectedMetaForPosts || widgetData?.selectedMetaForPosts)
            // console.log('widgetData=> ',widgetData)
            let totalCount = await PostSchema.countDocuments(findingPostsOptions.findPostsQueries).exec()
            let posts = await PostSchema.find(findingPostsOptions.findPostsQueries, ['_id'],
                {
                    skip: widgetData.sortBy === 'random' ?
                        Math.floor(Math.random() * totalCount) :
                        (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                    limit: findingPostsOptions.size,
                    sort: findingPostsOptions.sortQuery,
                }).exec()


            const updateData =  {
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    posts: posts.map((post) => post?._id),
                    totalCount
                }
            }

            const updatedWidget = await WidgetSchema.findByIdAndUpdate(widgetId, {data: updateData}, {new: true}).exec()
            res.status(200).json({ updatedWidget });
        } catch (error) {
            console.error(error);
            res.status(503).json({ message: 'Something went wrong. Please try again later.' });
        }
}

export default updatePostsWidget;