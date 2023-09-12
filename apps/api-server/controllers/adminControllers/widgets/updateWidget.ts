import {widgetSchema} from 'models';
import updatePostsWidget from "./_updateWidgetVariables/updatePostsWidget";
import updateMetasWidget from "./_updateWidgetVariables/updateMetasWidget";
import updatePostsListEntireByCategoriesWidget from "./_updateWidgetVariables/updatePostsListEntireByCategoriesWidget";

export const updateWidget = async (req, res) => {
    const widgetData = req.body?.widgetData?.data
    const widgetId = req.body?.widgetData?._id

    try {
        if (widgetData.type === 'posts' || widgetData.type === 'postsList' || widgetData.type === 'postsSlider' || widgetData.type === 'postsSwiper') {
            await updatePostsWidget(widgetData,widgetId,res)
        } else if (widgetData.type === 'meta' || widgetData.type === 'metaWithImage') {
            await updateMetasWidget(widgetData,widgetId,res)
        } else if (widgetData.type === 'postsListEntireByCategories') {
            await updatePostsListEntireByCategoriesWidget(widgetData,widgetId,res)
        } else {
            widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: widgetData}, {new: true}).exec().then(updatedWidget => {
                res.json({updatedWidget})
            }).catch(err => {
                console.log(err)
            })
        }
    } catch (error) {
        console.log(error)
    }


}
