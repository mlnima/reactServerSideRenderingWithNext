import metaSchema from "@schemas/metaSchema";


const getMeta = async (req, res) => {
    try {
                await  metaSchema.findById(req.query.id).exec().then(meta => {
                    if (meta){
                        res.json({meta})
                    }else {
                        res.status(404).json({message:'Not Found'})
                    }

                }).catch(err => {
                    res.status(400).json({message:'Bad Request'})
                })

    }catch (err){

        res.status(500).json({message:'Server Error'})
    }
}

export default getMeta;

// await  metaSchema.findById(req.query.id).exec().then(meta => {
//     if (meta){
//         res.json({meta})
//     }else {
//         res.status(404).json({message:'Not Found'})
//     }
//
// }).catch(err => {
//     res.status(400).json({message:'Bad Request'})
// })