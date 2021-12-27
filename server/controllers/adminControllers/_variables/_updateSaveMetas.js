const metaSchema = require('../../../models/metaSchema');
const postSchema = require('../../../models/postSchema');

module.exports = async (metas) => {
    const metasData = metas ?? []
    let finalData = []

    try{
        for await (let meta of metasData) {
            if (meta.name && meta.type ){
                const metaData = {
                    name: meta.name,
                    type: meta.type,
                    status:'published',
                }
                const findQuery = {$and:[{name: meta.name},{type: meta.type}]}
                await metaSchema.findOneAndUpdate(findQuery, {$set:{...metaData}},{new:true, upsert: true}).exec().then(async meta=>{
                    const count = await postSchema.countDocuments({$and:[{[meta.type]: meta._id},{status:'published'}]}).exec()
                    await metaSchema.findOneAndUpdate({name: meta.name}, {$set:{count}}).exec()
                    finalData = [...finalData, meta._id]
                })
            }
        }
        return finalData
    }catch (err) {
        console.log(err.stack)
        console.log('error on saving meta')
    }
}


//findOneAndUpdate({users:{ "$eq" : [senderId,receiverId].sort()}}