import {MetaSchema, PostSchema} from 'shared-schemas';
import {isEmptyObject, randomNumberGenerator} from "custom-util";

const resetMetaImage = async (req, res) => {
    try {
        const metaId = req.body._id
        const metaDocument = await MetaSchema.findById(metaId).exec()
        const metaCount = await PostSchema.countDocuments({$and:[{[metaDocument.type]:metaDocument._id},{status:'published'}]}).exec()
        const randomSkip = randomNumberGenerator(1,metaCount)

        if (!isEmptyObject(metaDocument) && !metaDocument?.imageUrlLock){
            const findPostWithSameMeta = await PostSchema.findOne({$and:[{[metaDocument.type]:metaDocument._id},{status:'published'}]}).skip(randomSkip).exec()
            if (findPostWithSameMeta){
                await MetaSchema.findByIdAndUpdate(metaId,{imageUrl:findPostWithSameMeta.mainThumbnail},{new : true}).exec().then(updatedMeta=>{
                    res.json({newImageUrl:updatedMeta.imageUrl})
                }).catch(err=>{
                    console.log(err)
                    res.end()
                })
            }else {
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

export default resetMetaImage