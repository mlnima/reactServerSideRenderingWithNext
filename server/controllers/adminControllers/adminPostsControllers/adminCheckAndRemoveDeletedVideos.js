const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const axios = require('axios')

module.exports = async (req,res)=>{
    try {
        res.end()
        await postSchema.find({$and:[{type:'video'},{status:'published'}]}).exec().then(async posts=>{
            try {
                for await (const post of posts){
                    if (post?.videoEmbedCode){
                           await axios.get(post.videoEmbedCode).then(()=>{
                               console.log(`http://localhost:3000/post/video/${post._id} is ok`)
                           }).catch(async err=>{
                                if (err?.response?.status >= 400 && err?.response?.status < 499 || err.code === 'ENOTFOUND'){
                                await postSchema.findByIdAndUpdate(post._id,{$set:{status:'trash'}},{new:true}).exec().then(trashedpost=>{
                                    console.log(`http://localhost:3000/post/video/${post._id} trashed`)
                                    })
                                }else {
                                    console.log(err.stack)
                                }
                            })
                    }
                }
            }catch (err){
                console.log(err)
            }

        })
    }catch (err){
        console.log(err)
    }
}