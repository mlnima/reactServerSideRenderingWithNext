import mongoose, {ConnectOptions} from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://0.0.0.0:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const options = {
    useUnifiedTopology: true
}

const connectToDatabase = async (name?: string) => {
    try {
        return await mongoose.connect(mongoDBConnectionUrl, options as ConnectOptions)
            .then(() => {
                console.log(`${name || ''}: connected to Database`)
            })
            .catch(error => {
                console.log('error connection to Database', error)
            });
    } catch (err) {
        console.log('error connection to Database', err)
    }
    return null
}

export default connectToDatabase


