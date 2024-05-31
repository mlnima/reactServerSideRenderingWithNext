import {MetaSchema} from 'shared-schemas';

const adminUpdateMeta = async (req, res) => {
    try {
        const metaData = req.body.data;

        if (!metaData) {
            return res.status(400).json({message: 'No meta data provided'});
        }

        if (metaData._id) {
            await MetaSchema.syncIndexes();
            try {
                const updatedMeta = await MetaSchema.findByIdAndUpdate(
                    metaData._id,
                    {...metaData},
                    {new: true}
                ).exec();

                return res.json({updated: updatedMeta, message: 'updated'});
            } catch (err) {
                console.error('Error While Trying To Update Meta:', err);
                return res.status(500).json({message: 'Error While Trying To Update Meta', error: err});
            }
        } else {
            try {

                const metaToSave = new MetaSchema(metaData);
                const savedMeta = await metaToSave.save();
                return res.json({updated: savedMeta, message: 'updated'});
            } catch (err) {
                console.error('Error While Trying To Save Meta:', err);
                return res.status(500).json({message: 'Error While Trying To Save Meta', error: err});
            }
        }
    } catch (error) {
        console.error('General Error:', error);
        return res.status(500).json({message: 'An unexpected error occurred', error});
    }
    // try {
    //     const metaData = req.body.data;
    //
    //     if (!metaData) {
    //         return res.status(400).json({ message: 'No meta data provided' });
    //     }
    //
    //     try {
    //         await metaSchema.syncIndexes()
    //         const updatedMeta = await metaSchema.findByIdAndUpdate(
    //             metaData._id,
    //             { ...metaData },
    //             {
    //                 new: true,
    //                 upsert: true
    //             }
    //         ).exec();
    //
    //         return res.json({ updated: updatedMeta, message: 'updated' });
    //     } catch (err) {
    //         console.error('Error While Trying To Update Meta:', err);
    //         return res.status(500).json({ message: 'Error While Trying To Update Meta', error: err });
    //     }
    //
    // } catch (error) {
    //     console.error('General Error:', error);
    //     return res.status(500).json({ message: 'An unexpected error occurred', error });
    // }
};

export default adminUpdateMeta;


// try {
//     const metaData = req.body.data;
//
//     if (!metaData) {
//         return res.status(400).json({ message: 'No meta data provided' });
//     }
//
//     if (metaData._id) {
//         await metaSchema.syncIndexes();
//         try {
//             const updatedMeta = await metaSchema.findByIdAndUpdate(
//                 metaData._id,
//                 { ...metaData },
//                 { new: true }
//             ).exec();
//
//             return res.json({ updated: updatedMeta, message: 'updated' });
//         } catch (err) {
//             console.error('Error While Trying To Update Meta:', err);
//             return res.status(500).json({ message: 'Error While Trying To Update Meta', error: err });
//         }
//     } else {
//         try {
//
//             const metaToSave = new metaSchema(metaData);
//             const savedMeta = await metaToSave.save();
//             return res.json({ updated: savedMeta, message: 'updated' });
//         } catch (err) {
//             console.error('Error While Trying To Save Meta:', err);
//             return res.status(500).json({ message: 'Error While Trying To Save Meta', error: err });
//         }
//     }
// } catch (error) {
//     console.error('General Error:', error);
//     return res.status(500).json({ message: 'An unexpected error occurred', error });
// }


// import {metaSchema} from 'shared-schemas';
//
// const adminUpdateMeta = async (req, res) => {
//     try {
//         const metaData = req.body.data
//
//         if (metaData?._id) {
//             await metaSchema.findByIdAndUpdate(
//                 req.body.data._id,
//                 {...req.body.data},
//                 {new: true}
//             ).exec().then(updatedMeta => {
//                 res.json({updated: updatedMeta,message:'updated'})
//             }).catch(err => {
//                 console.log(err)
//                 res.status(500).json({message:'Error While Trying To Update Meta',err})
//             })
//         }else{
//             const metaToSave = new metaSchema(metaData)
//             const savedMeta = await metaToSave.save()
//             res.json({updated: savedMeta,message:'updated'})
//         }
//
//
//     }catch (error){
//         res.end()
//     }
//
// }
//
// export default adminUpdateMeta;