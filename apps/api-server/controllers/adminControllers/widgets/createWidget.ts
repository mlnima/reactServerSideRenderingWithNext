import widgetSchema from "@schemas/widgetSchema";

const createWidget = (req, res) =>{
    const data = req.body.data;
    let dataToSave = new widgetSchema({data})
    dataToSave?.save((err,newWidgetData)=>{
        if (err){
            res.end({newWidgetData})
        }
        res.json({newWidgetData})
    })

}
export default createWidget;