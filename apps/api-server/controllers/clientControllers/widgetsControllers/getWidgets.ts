
import {databaseSelectFieldsForPostCards} from "@repo/data-structures";
import {Widget} from "typescript-types";
import {postFieldRequestForCards} from "@repo/data-structures";
import {Request,Response} from "express";
import widgetSchema from "@schemas/widgetSchema";

const getWidgets = async (req:Request, res:Response) => {

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

export default getWidgets

