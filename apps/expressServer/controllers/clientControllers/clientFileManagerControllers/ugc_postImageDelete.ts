import fs from 'fs'
import postSchema from "../../../models/postSchema";

const ugc_postImageDelete = async (req, res) => {
    const postId = req.body.postId
    const image = req.body.image
    try {
        await fs.unlinkSync(`.${image}`)
    } catch (err) {
        // console.error(err)
    }

    await postSchema.findByIdAndUpdate(postId, {$pull: {images:{imagePath:image}}},{new:true}).exec().then(async updated => {
        console.log(updated.images)
        res.json({message: 'Deleted', images:updated.images})
    }).catch(err=>{
        console.log(err)
        res.json({message: 'Something Went Wrong'})
    })

}

export default ugc_postImageDelete;