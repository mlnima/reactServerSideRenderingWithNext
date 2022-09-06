import metaSchema from '../../../models/metaSchema';

const adminUpdateMeta = (req, res) => {
    metaSchema.findByIdAndUpdate(req.body.data._id, {...req.body.data}, {new: true}).exec().then(updatedMeta => {
        res.json({updated: updatedMeta,message:'updated'})
    }).catch(err => {
        console.log(err)
        res.status(500).json({message:'Error While Trying To Update Meta',err})
    })
}

export default adminUpdateMeta;