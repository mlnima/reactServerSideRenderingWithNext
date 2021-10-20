const postSchema = require('../../../models/postSchema');
const updateSaveMetas = require('../_variables/_updateSaveMetas')

module.exports =  async (req, res) => {
    const postUpdatedData = req.body.postData

    try {
        const finalPostUpdatedData = {
            ...postUpdatedData,
            lastModify: Date.now(),
            tags: postUpdatedData.tags ? await updateSaveMetas(postUpdatedData.tags) : [],
            categories: postUpdatedData.categories ? await updateSaveMetas(postUpdatedData.categories) : [],
            actors: postUpdatedData.actors ? await updateSaveMetas(postUpdatedData.actors) : []
        }

        await postSchema.findByIdAndUpdate(postUpdatedData._id, {...finalPostUpdatedData}, {new: true}).exec().then(updated => {
            res.json({message:'Post Has Been Successfully Updated'})
            res.end()
        }).catch(err => {
            console.log(err)
            res.sendStatus(400).json({message:'Error On Updating The document',err})
        })
        res.end()
    } catch (err) {
        console.log(err)
        res.sendStatus(500).json({message:'I Tried But Something Went Wrong',err})
    }
};