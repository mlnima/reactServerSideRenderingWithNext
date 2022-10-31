import widgetSchema from '../../../../../packages/models/src/widgetSchema';

const adminPanelGetWidgets = async (req, res) => {
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

export default adminPanelGetWidgets;