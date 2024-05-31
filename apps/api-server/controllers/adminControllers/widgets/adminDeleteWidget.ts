import {WidgetSchema} from 'shared-schemas';

const adminDeleteWidget = (req, res) => {
    if (req.body._id){
        const _id = req.body._id;
        WidgetSchema.findByIdAndDelete({_id}).exec().then(() => {
            res.json({deleted: true})
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }
}

export default adminDeleteWidget;