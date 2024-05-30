import {widgetSchema} from 'models';
import {databaseSelectFieldsForPostCards} from "data-structure";

const adminGetWidgets = async (req, res) => {
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

export default adminGetWidgets;