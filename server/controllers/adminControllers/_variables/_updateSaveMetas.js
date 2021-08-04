const metaSchema = require('../../../models/metaSchema');
const postSchema = require('../../../models/postSchema');

module.exports = async (metas) => {
    let finalData = []
    try{
        for await (let meta of metas) {
            const metaData = {
                name: meta.name,
                type: meta.type,
                status:'published',
            }
            await metaSchema.findOneAndUpdate({name: meta.name}, {$set:{...metaData}},{new:true, upsert: true}).exec().then(async meta=>{
                const count = await postSchema.countDocuments({$and:[{[meta.type]: meta._id},{status:'published'}]}).exec()
                await metaSchema.findOneAndUpdate({name: meta.name}, {$set:{count}}).exec()
                finalData = [...finalData, meta._id]
            })
        }
        return finalData
    }catch (e) {
        console.log('error on saving meta')
    }
}
