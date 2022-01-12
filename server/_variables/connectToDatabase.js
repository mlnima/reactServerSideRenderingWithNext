const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('dotenv').config()

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

module.exports = mongoose.connect(mongoDBConnectionUrl,connectionOptions).catch(err => console.log('error connection to Database', err));