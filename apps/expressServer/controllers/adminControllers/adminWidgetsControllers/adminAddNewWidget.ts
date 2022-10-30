import WidgetSchema from '../../../models/widgetSchema';

const adminAddNewWidget = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new WidgetSchema({data})
    dataToSave?.save((err,newWidgetData)=>{
        if (err){
            res.end({newWidgetData})
        }
        res.json({newWidgetData})
    })

}
export default adminAddNewWidget;