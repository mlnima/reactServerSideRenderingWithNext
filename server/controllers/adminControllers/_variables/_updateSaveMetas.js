const metaSchema = require('../../../models/metaSchema');

module.exports = async (metas) => {
    let finalData = []
    try{
        for await (let meta of metas) {
            const metaData = {
                name: meta.name,
                type: meta.type,
                status:'published'
            }
            await  metaSchema.findOneAndUpdate({name: meta.name}, {$set:{...metaData,$inc: {count: 1}}},{new:true, upsert: true}).exec().then(meta=>{
                finalData = [...finalData, meta._id]
            })
        }
        return finalData
    }catch (e) {
        console.log('error on saving meta')
    }
}