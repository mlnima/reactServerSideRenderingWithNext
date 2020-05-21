const mongoose = require('mongoose');
const userSchema = require('./server/models/userSchema')
require('dotenv').config()
const bcrypt = require('bcryptjs');

const mongoDBConnectionUrl = process.env.DB_LOCAL ?
    `mongodb://localhost:${ process.env.DB_PORT }/${ process.env.DB_NAME }` :
    `mongodb://${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

let adminData = {
    username: 'Admin',
    password: 'Admin',
    role: 'administrator'
}

bcrypt.hash(adminData.password, 10, function (err, hash) {
    if (err) {
        console.log(err)
        process.exit()
    } else if (hash) {
        adminData = { ...adminData, password: hash }
        const adminDataToSave = new userSchema(adminData)
        adminDataToSave.save()
        console.log('admin account created , username: Admin , password: Admin')
        setTimeout(() => process.exit(), 5000)
    }
});






