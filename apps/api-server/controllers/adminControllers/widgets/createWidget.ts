import {WidgetSchema} from 'shared-schemas';

const createWidget = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new WidgetSchema({data})
    dataToSave?.save((err,newWidgetData)=>{
        if (err){
            res.end({newWidgetData})
        }
        res.json({newWidgetData})
    })

}
export default createWidget;