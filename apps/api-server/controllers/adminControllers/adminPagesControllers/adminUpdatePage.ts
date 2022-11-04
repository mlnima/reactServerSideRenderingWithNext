import {pageSchema} from 'models';

const adminUpdatePage = (req, res) =>{
    const updateData = req.body.pageData
    pageSchema.findByIdAndUpdate(updateData._id,updateData, {new: true}).exec().then(updated=>{
        res.json({updated})
    })
}

export default adminUpdatePage;