import postSchema from '../../../models/postSchema';
import metaSchema from '../../../models/metaSchema';

const clientFixMetaImage = async (req, res) => {
    try {
        const metaId = req.body._id
        const metaDocument = await metaSchema.findById(metaId).exec()


        if (metaDocument && !metaDocument?.imageUrl){
            const findPostWithSameMeta = await postSchema.findOne({[metaDocument.type]:[metaDocument._id]}).exec()
            if (findPostWithSameMeta){
                await metaSchema.findByIdAndUpdate(metaId,{imageUrl:findPostWithSameMeta.mainThumbnail},{new : true}).exec().then(updatedMeta=>{
                    res.json({newImageUrl:updatedMeta.imageUrl})

                }).catch(err=>{
                    console.log(err)
                    res.end()
                })
            }else {
                // await metaSchema.findByIdAndUpdate(metaId,{status:'pending'}).exec().then(()=>{
                //     res.json({message:'meta went pending',error:true})
                // }).catch(err=>{
                //     res.end()
                // })
                res.end()
            }
        }else {
            res.json({newImageUrl:metaDocument?.imageUrl})
        }
    }catch (err){
        console.log(err)
        res.end()
    }

}

export default clientFixMetaImage