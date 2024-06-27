import {Request, Response} from "express";
import widgetSchema from "@schemas/widgetSchema";
import {databaseSelectFieldsForPostCards, postFieldRequestForCards} from "@repo/data-structures";
import {Widget} from "typescript-types";
import updatePostsWidget from "@util/widgets/updatePostsWidget";
import updateMetasWidget from "@util/widgets/updateMetasWidget";
import updatePostsListEntireByCategoriesWidget
    from "@util/widgets/updatePostsListEntireByCategoriesWidget";

class WidgetController{
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

    static async dashboardDeleteWidget(req: Request, res: Response){
        if (req.body._id){
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
    static async getPopulatedWidgets(req: Request, res: Response){
        try {
            const widgets = await widgetSchema.find({}).populate([
                {
                    model: 'meta',
                    path: 'data.uniqueData.metaData'
                },
                {
                    model: 'post',
                    path: 'data.uniqueData.posts',
                    populate: [
                        {
                            path: 'actors',
                            select: {'name': 1, 'type': 1},
                            options: {}
                        },
                        {
                            path: 'categories',
                            select: {'name': 1, 'type': 1, 'imageUrl': 1},
                            options: {}
                        },
                        {
                            path: 'tags',
                            select: {'name': 1, 'type': 1},
                            options: {}
                        }
                    ],
                    select: databaseSelectFieldsForPostCards
                },
            ]).sort({updatedAt: -1}).exec()


            const widgetsGroupedByPosition = widgets.reduce((widgetInPositions:any,widget:Widget)=>{
                widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
                return widgetInPositions
            },{})


            res.json({widgets:widgetsGroupedByPosition})

            // Promise.all(widgets).then(widgetsWithData => {
            //     res.json({widgets: widgetsWithData})
            // }).catch(err => {
            //     console.log(err)
            //     res.end()
            // })
        } catch (err) {
            console.log(err)
            res.end()
        }
    }


}

export default WidgetController;