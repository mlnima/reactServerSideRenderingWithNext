// const mongoose = require("mongoose");
// require('dotenv').config()
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;


const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const options = {
    useUnifiedTopology: true
}

const connectToDatabase = async () => {
    try {
        //@ts-ignore
        await mongoose.connect(mongoDBConnectionUrl, options)
                .then(() => console.log('connected to Database'))
                .catch(err => console.log('error connection to Database', err));

    } catch (err) {
        console.log('error connection to Database', err)
    }
}

export default connectToDatabase()


// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// require('dotenv').config()
//
// const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
//     `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
//     `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//
//
// const connectToDatabase = async ()=>{
//     try {
//         await  mongoose.connect(mongoDBConnectionUrl)
//             .then(()=>console.log('connected to Database'))
//             .catch(err => console.log('error connection to Database', err));
//
//     }catch(err) {
//         console.log('error connection to Database', err)
//     }
// }
//
//
// module.exports =  connectToDatabase()


// module.exports =  mongoose.connect(mongoDBConnectionUrl)
//                 .then(()=>console.log('connected to Database'))
//                 .catch(err => console.log('error connection to Database', err));

