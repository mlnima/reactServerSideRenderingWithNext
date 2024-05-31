import {PageSchema} from 'shared-schemas';

const adminUpdatePage = (req, res) =>{
    const updateData = req.body.pageData
    PageSchema.findByIdAndUpdate(updateData._id,updateData, {new: true}).exec().then(updated=>{
        res.json({updated})
    })
}

export default adminUpdatePage;