import {Request, Response} from "express";
import widgetSchema from "@schemas/widgetSchema";
import { postFieldRequestForCards} from "@repo/data-structures/dist/src";
import {Widget} from "typescript-types";
import updateMetasWidget from "@util/widgets/updateMetasWidget";
import updatePostsListEntireByCategoriesWidget
    from "@util/widgets/updatePostsListEntireByCategoriesWidget";
import postSchema from "@schemas/postSchema";
import {clientAllowedSortOptions} from "@repo/data-structures";
import GlobalStore from "@store/GlobalStore";

class WidgetController{

    static async updatePostsWidget(widgetData,widgetId,res){
        try {
            const cardAmountPerPage = GlobalStore.getCardAmountPerPage()
            const metaId = widgetData?.uniqueData?.selectedMetaForPosts || widgetData?.selectedMetaForPosts;
            const postType = widgetData?.uniqueData?.postType || widgetData?.postType;
            const sort = widgetData?.uniqueData?.sort || widgetData?.sort;
            const metaQuery = metaId ? [{$or: [{categories: {$in: metaId}}, {tags: {$in: metaId}}, {actors: {$in: metaId}}]}] : [];
            const postTypeQuery = postType ? [{postType}] : []
            const limit = widgetData?.uniqueData?.count ||  widgetData?.count || cardAmountPerPage ;
            const sortQuery = !sort || sort === 'updatedAt'  ? {updatedAt: -1} : clientAllowedSortOptions.includes(sort) ? {[sort]: -1} : {}

            const findQuery  = { $and:[
                    {status: 'published'},
                    ...metaQuery,
                    ...postTypeQuery
                ]}

            let totalCount = await postSchema.countDocuments(findQuery).exec()
            let posts = await postSchema.find(
                findQuery,
                ['_id'],
                {
                    skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : 0,
                    limit,
                    sort: sortQuery,
                }
            ).exec()


            const updateData =  {
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    posts: posts.map((post) => post?._id),
                    totalCount
                }
            }

            const updatedWidget = await widgetSchema.findByIdAndUpdate(widgetId, {data: updateData}, {new: true}).exec()
            res.status(200).json({ updatedWidget });
        } catch (error) {
            console.error(error);
            res.status(503).json({ message: 'Something went wrong. Please try again later.' });
        }
    }

    //---------------------Client----------------------
    static async getWidgets(req: Request, res: Response){

        try {
            const locale = req.query.locale
            const locales = process.env.NEXT_PUBLIC_LOCALES.split(' ')
            const excludeOtherLanguagesQuery = locale ? {select: locales.map(languageCode => languageCode !== locale ? `-data.translations.${languageCode}` : '').join(' ')} : {}
            const requestedWidgets = Array.isArray(req.query.widget) ? req.query.widget : [req.query.widget]
            const widgetsDataQuery = requestedWidgets.map(position => position === 'all' ? {} : {'data.position': position})
            const widgets = await widgetSchema.find(
                {$or: [...widgetsDataQuery]},
                {},
                excludeOtherLanguagesQuery).populate([
                {
                    model:'meta',
                    path: 'data.uniqueData.metaData',
                },
                {
                    model:'post',
                    path: 'data.uniqueData.posts',
                    select: [...postFieldRequestForCards,`translations.${locale}.title`]
                }
            ]).exec()


            const widgetsGroupedByPosition = widgets.reduce((widgetInPositions:any,widget:Widget)=>{
                widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
                return widgetInPositions
            },{})

            res.json({widgets:widgetsGroupedByPosition})

        } catch (err) {
            console.log(err)
            res.status(400).send('Bad Request')
        }

    }

    //---------------------Dashboard--------------------

    static async dashboardCreateWidget(req: Request, res: Response){
        const data = req.body.data;
        let dataToSave = new widgetSchema({data})
        dataToSave?.save((err,newWidgetData)=>{
            if (err){
                res.end({newWidgetData})
            }
            res.json({newWidgetData})
        })

    }

    static async dashboardUpdateWidget(req: Request, res: Response){
        const widgetData = req.body?.widgetData?.data
        const widgetId = req.body?.widgetData?._id

        if (!widgetId || !widgetData) {
            res.status(400).json({ message: 'Missing widget ID' });
            return;
        }

        try {
            if (widgetData.type === 'posts' || widgetData.type === 'postsList' || widgetData.type === 'postsSlider' || widgetData.type === 'postsSwiper') {
                await WidgetController.updatePostsWidget(widgetData,widgetId,res)
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

    static async dashboardDeleteWidget(req: Request, res: Response){
        if (req.query._id){
            const _id = req.body._id;
            widgetSchema.findByIdAndDelete({_id}).exec().then(() => {
                res.json({deleted: true})
            }).catch(err=>{
                console.log(err)
                res.end()
            })
        }
    }

    static async dashboardGetWidgets(req: Request, res: Response){
        try {
            const widgets = await widgetSchema.find({}).exec()
            Promise.all(widgets).then(widgetsWithData => {
                res.json({widgets: widgetsWithData})
            }).catch(err => {
                console.log(err)
                res.end()
            })
        } catch (err) {
            console.log(err)
            res.end()
        }
    }

}

export default WidgetController;

// static async getPopulatedWidgets(req: Request, res: Response){
//     try {
//         const widgets = await widgetSchema.find({}).populate([
//             {
//                 model: 'meta',
//                 path: 'data.uniqueData.metaData'
//             },
//             {
//                 model: 'post',
//                 path: 'data.uniqueData.posts',
//                 populate: [
//                     {
//                         path: 'actors',
//                         select: {'name': 1, 'type': 1},
//                         options: {}
//                     },
//                     {
//                         path: 'categories',
//                         select: {'name': 1, 'type': 1, 'imageUrl': 1},
//                         options: {}
//                     },
//                     {
//                         path: 'tags',
//                         select: {'name': 1, 'type': 1},
//                         options: {}
//                     }
//                 ],
//                 select: databaseSelectFieldsForPostCards
//             },
//         ]).sort({updatedAt: -1}).exec()
//
//
//         const widgetsGroupedByPosition = widgets.reduce((widgetInPositions:any,widget:Widget)=>{
//             widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
//             return widgetInPositions
//         },{})
//
//
//         res.json({widgets:widgetsGroupedByPosition})
//
//         // Promise.all(widgets).then(widgetsWithData => {
//         //     res.json({widgets: widgetsWithData})
//         // }).catch(err => {
//         //     console.log(err)
//         //     res.end()
//         // })
//     } catch (err) {
//         console.log(err)
//         res.end()
//     }
// }

