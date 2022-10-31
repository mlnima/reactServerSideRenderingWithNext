import {metaSchema} from 'models';

const adminUpdateMetaByApi =async (req, res) => {
    try {
        const metaData = req.body.metaData;
        const findQuery = {$and:[{name: metaData.name},{type: metaData.type}]}
        const existingMeta =  await  metaSchema.findOne(findQuery).exec()

        if (existingMeta){
            metaSchema.findByIdAndUpdate(existingMeta._id, {$set:{...metaData}}, {new: true})
                .exec()
                .then(updatedMeta => {
                res.json({updated: updatedMeta,message: existingMeta?.name + ' updated'})
            }).catch(err => {
                res.status(500).json({message:'Error While Trying To Save New Meta From API',err})
            })
        }
        else {
            const newMetaDataToSave = new metaSchema({
                ...metaData,
                count:0,
                status:'draft'
            })
            await newMetaDataToSave.save((err, savedDocument) => {
                if (err) {
                    res.status(500).json({message: 'Error While Trying To Save New Meta From API', err})
                }
                res.json({updated: savedDocument, message: savedDocument.name + ' created'})
            })
        }
    }catch (err){

    }

}

export default adminUpdateMetaByApi;