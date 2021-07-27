const mongoose = require('mongoose');
require('dotenv').config()
const postSchema = require('../server/models/postSchema')

const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));


postSchema.countDocuments({}).exec().then(count => {

    const size = 100
    let page = 0
    const totalPage = Math.ceil(count / size)

    const actionInterval = setInterval(() => {
        if (page <= totalPage) {
            page += 1
            postSchema.find({}).select('_id , createdAt , lastUpdate').skip(size * (page - 1)).limit(size).then(posts => {
                posts.forEach(post=>{
                    //console.log({createdAt:post._id.getTimestamp()})
                    if (!post.createdAt){
                        postSchema.findByIdAndUpdate(post._id,{createdAt:post._id.getTimestamp()},{
                            new:true,
                            timestamps:{
                                createdAt:false,
                                updatedAt:false
                            }
                        }).then(post=>{
                            console.log(post.createdAt)
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })
                console.log('page', page ,'from',totalPage)
            })
        } else {
            clearInterval(actionInterval);
        }
    }, 2000)

    actionInterval
})



