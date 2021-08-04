const widgetSchema = require('../../../models/settings/widgetSchema');
const {updatePostWidget} = require('../../adminControllers/adminWidgetsControllers/adminUpdateWidget')

module.exports = async (req,res)=>{
    await widgetSchema.findById(req.body._id).exec().then(widget=>{
        updatePostWidget(widget).then(updatedWidgets=>{
            widgetSchema.findByIdAndUpdate(req.body._id, {'data.posts':[...updatedWidgets.posts]}, {new: true}).exec().then(afterUpdate => {
                res.json({updatedWidgets:afterUpdate})
                res.end()
            }).catch(err => {
                console.log(err)
                res.status(503).json({message:'something went wrong please try again later'})
                res.end()
            })
        })
     })
}
