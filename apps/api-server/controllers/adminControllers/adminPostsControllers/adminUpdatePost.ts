import {PostSchema} from 'shared-schemas';
import updateSaveMetas from '../../../_variables/adminVariables/_updateSaveMetas';

const adminUpdatePost =  async (req, res) => {
    const postUpdatedData = req.body.postData

    try {
        const finalPostUpdatedData = {
            ...postUpdatedData,
            lastModify: Date.now(),
            tags: postUpdatedData.tags ? await updateSaveMetas(postUpdatedData.tags) : [],
            categories: postUpdatedData.categories ? await updateSaveMetas(postUpdatedData.categories) : [],
            actors: postUpdatedData.actors ? await updateSaveMetas(postUpdatedData.actors) : []
        }

        await PostSchema.findByIdAndUpdate(postUpdatedData._id, {...finalPostUpdatedData}, {new: true}).exec().then(updated => {
            res.json({message:'Post Has Been Successfully Updated'})
        }).catch(err => {
            console.log(err)
            res.status(400).json({message:'Error On Updating The document',err})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'I Tried But Something Went Wrong',err})
    }
};

export default adminUpdatePost;