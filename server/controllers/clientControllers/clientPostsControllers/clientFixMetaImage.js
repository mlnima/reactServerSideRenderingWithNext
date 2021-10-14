const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');



module.exports = async (req, res) => {
    try {
        const metaId = req.body._id
        const metaDocument = await metaSchema.findById(metaId).exec()


        if (metaDocument && !metaDocument?.imageUrl){
            const findPostWithSameMeta = await postSchema.findOne({[metaDocument.type]:[metaDocument._id]}).exec()
            if (findPostWithSameMeta){
                await metaSchema.findByIdAndUpdate(metaId,{imageUrl:findPostWithSameMeta.mainThumbnail},{new : true}).exec().then(updatedMeta=>{
                    res.json({newImageUrl:updatedMeta.imageUrl})
                    res.end()
                }).catch(err=>{
                    console.log(err)
                    res.end()
                })
            }else {
                // await metaSchema.findByIdAndUpdate(metaId,{status:'pending'}).exec().then(()=>{
                //     res.json({message:'meta went pending',error:true})
                //     res.end()
                // }).catch(err=>{
                //     res.end()
                // })
                res.end()
            }
        }else {
            res.json({newImageUrl:metaDocument?.imageUrl})
            res.end()
        }
    }catch (err){
        console.log(err)
        res.end()
    }

}