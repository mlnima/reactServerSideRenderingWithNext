const mongoose = require('mongoose');
require('dotenv').config()
const settingSchema = require('../server/models/settings/settingSchema')
const widgetSchema = require('../server/models/settings/widgetSchema')
const postSchema = require('../server/models/postSchema')
const userSchema = require('../server/models/userSchema')
const bcrypt = require('bcryptjs');

const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));


const designData = {
    type: 'design',
    data: {
        customStyle: ' body{\n' +
            '    background-color: black;\n' +
            '    color: white;\n' +
            '}',
        topBarStyle:'background-color:#333;',
        headerStyle:'background-color:black;',
        navigationStyle:'background-color:#333;',
        footerStyle:'background-color:#333;',
    }
}

const siteDesignToSave = new settingSchema(designData)
siteDesignToSave.save().catch(() => {
    console.log('Error on site Identity set')
})
