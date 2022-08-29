import mongoose from 'mongoose'
mongoose.Promise = global.Promise;


const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const options = {
    useUnifiedTopology: true
}

export const connectToDatabase = async (name?:string) => {
    try {
        //@ts-ignore
        await mongoose.connect(mongoDBConnectionUrl, options)
                .then(() => console.log(`${name ||''}: connected to Database`))
                .catch(err => console.log('error connection to Database', err));

    } catch (err) {
        console.log('error connection to Database', err)
    }
}

export default connectToDatabase


