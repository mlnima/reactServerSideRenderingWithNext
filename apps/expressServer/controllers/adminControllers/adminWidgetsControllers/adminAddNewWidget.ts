import {widgetSchema} from 'models';

const adminAddNewWidget = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new widgetSchema({data})
    dataToSave?.save((err,newWidgetData)=>{
        if (err){
            res.end({newWidgetData})
        }
        res.json({newWidgetData})
    })

}
export default adminAddNewWidget;