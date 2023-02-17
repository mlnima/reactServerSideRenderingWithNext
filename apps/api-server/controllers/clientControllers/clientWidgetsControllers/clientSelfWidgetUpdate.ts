import {widgetSchema} from 'models';
// const metaSchema = require('../../../models/metaSchema');
// const postSchema = require('../../../models/metaSchema');
// const {updatePostWidgetData} = require('../../adminControllers/adminWidgetsControllers/adminUpdateWidget');
import {updatePostWidgetData} from '../../adminControllers/widgets/updateWidget';

const clientSelfWidgetUpdate = async (req, res) => {

    await widgetSchema.findById(req.body._id).exec().then(widget => {
        updatePostWidgetData(widget).then(updatedWidgets => {
            widgetSchema.findByIdAndUpdate(req.body._id, {'data.uniqueData.posts': [...updatedWidgets.posts]}, {new: true}).exec().then(afterUpdate => {
                res.json({updatedWidgets: afterUpdate})

            }).catch(err => {
                console.log(err)
                res.status(503).json({message: 'something went wrong please try again later'})
            })
        })
    })
    res.end()
}

export default clientSelfWidgetUpdate;