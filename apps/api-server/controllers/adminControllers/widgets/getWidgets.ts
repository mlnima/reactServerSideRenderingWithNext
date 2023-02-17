import {widgetSchema} from 'models';

const getWidgets = async (req, res) => {
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

export default getWidgets;